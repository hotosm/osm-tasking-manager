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

    ko.applyBindings(new JobViewModel());
});

function JobViewModel() {
    // Data
    var self = this;
    self.jobs = jobs;
}
