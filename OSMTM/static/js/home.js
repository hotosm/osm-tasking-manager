$(document).ready(function() {
    $('.delete')
        .click(function() {
            if (!confirm("Are you sure you want to delete this job?")) {
                return false;
            }
        });
    
    // See http://www.finalclap.com/tuto/float-fixed-scroll-jquery-css-rocket-83/
    var navBarHeight = $('.navbar').height() + 20;
    var fixedLimit = $('#jobslist').offset().top - navBarHeight;
    $('#mapcanvas').css('height', 250);
    // keep the width size given by bootstrap to get the same when fixed
    $('#mapcanvas').css('width', $('#mapcanvas').width());
    $(window).trigger('scroll');
    $(window).scroll(function () {
        windowScroll = $(window).scrollTop();
        if (windowScroll >= fixedLimit) {
            $('#mapcanvas').css('position', 'fixed');
            $('#mapcanvas').css('top', navBarHeight);

        } else {
            $('#mapcanvas').css('position', '');
        }
    });

    ko.applyBindings(new JobViewModel(jobs));
});

function JobViewModel(initialJobs) {
    // Data
    var self = this;
    self.jobs = ko.observableArray(initialJobs);
    self.filter = ko.observable('all');
    self.searchValue = ko.observable();
    
    function changeHash() {
        var search = this.searchValue() ?
            '/' + this.searchValue() : '';
        location.hash = this.filter() + search;
    }
    self.searchValue.subscribe(changeHash, this);
    self.filter.subscribe(changeHash, this);

    this.filterByFeatured = function() {
        var jobs = this.jobs();
        return ko.utils.arrayFirst(jobs, function(job) {
            return job.featured === true;
        });
    }.bind(this);

    this.showFeatured = function() {
        this.filter('featured');
    }.bind(this);
    this.showMine = function() {
        this.filter('mine');
    }.bind(this);

    this.search = function() {
        var jobs = [].concat(initialJobs);
        this.jobs(jobs);
        var self = this;
        var searchVal = this.searchValue() && this.searchValue().toLowerCase();
        var filter = this.filter();
        this.jobs.remove(function(job) {
            var text = [job.title, job.description, job.short_description, job.tags.join(',')].join('');
            return (searchVal && text.toLowerCase().indexOf(searchVal) == -1) ||
                (filter == 'featured' && job.featured !== true) ||
                (filter == 'mine' && job.is_mine !== true);
        });
    }.bind(this);

    this.clearFilter = function() {
        this.filter('all');
    }.bind(this);

    // Client-side routes    
    Sammy(function() {
        this.get('#:filter', function() {
            self.filter(this.params.filter);
            self.search();
        });
        this.get('#:filter/:search', function() {
            self.filter(this.params.filter);
            self.searchValue(this.params.search);
            self.search();
        });
    }).run();
}
