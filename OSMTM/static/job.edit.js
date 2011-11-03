$(document).ready(function() {
    var converter = new Showdown.converter();

    var description = $('#id_description'),
        description_preview = $('#description_preview');
    description.keyup(function() {
        var html = converter.makeHtml(description.val());
        description_preview.html(html);
    }).trigger('keyup');

    var workflow = $('#id_workflow'),
        workflow_preview = $('#workflow_preview');
    workflow.keyup(function() {
        var html = converter.makeHtml(workflow.val());
        workflow_preview.html(html);
    }).trigger('keyup');
    resetMap();
});
