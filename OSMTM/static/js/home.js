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

    for (var i=0; i < jobs.length; i++) {
        var lonlat = new OpenLayers.Geometry.Point(jobs[i].lon, jobs[i].lat);
        lonlat.transform('EPSG:900913', 'EPSG:4326');
        var f = new OpenLayers.Feature.Vector(lonlat);
        // keep a reference on the feature for later usage
        jobs[i].feature = f;
        jobsLayer.addFeatures([f]);
    }

    ko.applyBindings(new JobViewModel(jobs));
});

var map = new OpenLayers.Map('mapcanvas', {
    theme: null,
    maxResolution: 'auto',
    controls: [
        new OpenLayers.Control.Attribution()
    ]
});
var baseLayer = new OpenLayers.Layer('baseLayer', {
    isBaseLayer: true
});
map.addLayer(baseLayer);
var bm = new OpenLayers.Layer.Image( "Blue Marble",
    "static/img/bm.jpeg",
    new OpenLayers.Bounds(-180, -90, 180, 90),
    new OpenLayers.Size(600, 300),
    {
        isBaseLayer: false,
        alwaysInRange: true
    }
);
map.addLayer(bm);
map.zoomToMaxExtent();

var jobsLayer = new OpenLayers.Layer.Vector('jobs', {
    styleMap: new OpenLayers.StyleMap({
        'default': {
            externalGraphic: 'static/img/map_pin.png',
            graphicWidth: 10,
            graphicHeight: 10,
            graphicYOffset: -10,
            graphicOpacity: 0.4,
            graphicZIndex: 10
        },
        'select': {
            externalGraphic: 'static/img/map_pin.png',
            graphicWidth: 16,
            graphicHeight: 16,
            graphicYOffset: -16,
            graphicOpacity: 1,
            graphicZIndex: 20
        }
    }),
    rendererOptions: {
        zIndexing: true
    }
});
map.addLayer(jobsLayer);

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
    self.jobs.subscribe(function() {
        for (var i=0; i < initialJobs.length; i++) {
            initialJobs[i].feature.renderIntent = 'default';
        }
        var jobs = self.jobs();
        for (var i=0; i < jobs.length; i++) {
            jobs[i].feature.renderIntent = 'select';
        }
        jobsLayer.redraw();
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
