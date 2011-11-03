$(document).ready(function() {
    var converter = new Showdown.converter();

    var description = $('#id_description'),
        formatted_description = $('#formatted_description'),
        preview_description = $('<div />').insertAfter(description);
    description.keyup(function() {
        var html = converter.makeHtml(description.val());
        preview_description.html(html);
    }).trigger('keyup');

    var workflow = $('#id_workflow'),
        formatted_workflow = $('#formatted_workflow'),
        preview_workflow = $('<div />').insertAfter(workflow);
    workflow.keyup(function() {
        var html = converter.makeHtml(workflow.val());
        preview_workflow.html(html);
    }).trigger('keyup');
    resetMap();
});
