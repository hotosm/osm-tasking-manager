$(document).ready(function() {
    $('.delete')
        .click(function() {
            if (!confirm("Are you sure you want to delete this job?")) {
                return false;
            }
        });

    $(window).resize(function () {
        var h = $(window).height(),
            offsetTop = $('.navbar').height(),
            offsetBottom = $('footer').height();

        // Calculate the top offset
        $('#mapcanvas').css('height', h - offsetTop - offsetTop);
        $('#jobslist').css('height', h - offsetTop - offsetTop);
    }).resize();

    ko.applyBindings(new JobViewModel(jobs));
});

function JobViewModel(initialJobs) {
    // Data
    var self = this;
    self.jobs = ko.observableArray(initialJobs);
    self.filter = ko.observable();
    self.searchValue = ko.observable();
    
    self.searchValue.subscribe(function(value) {
        this.search();
    }, this);
    self.filter.subscribe(function(value) {
        this.search();
    }, this);

    this.filterByFeatured = function() {
        var jobs = this.jobs();
        return ko.utils.arrayFirst(jobs, function(job) {
            return job.featured === true;
        });
    }.bind(this);

    this.showFeatured = function() {
        this.filter('featured');
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
                (filter == 'featured' && job.featured !== true);
        });
    }.bind(this);

    this.clearFilter = function() {
        this.filter(null);
    }.bind(this);
}
