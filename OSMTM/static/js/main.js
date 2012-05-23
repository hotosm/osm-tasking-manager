$().ready(function() {
    $('#flash').fadeIn().delay(2000).fadeOut(400);
    $("[rel=tooltip]").tooltip();
    $("a[rel=popover]")
        .popover({
            offset: 10,
            html: true
        })
        .click(function(e) {
            e.preventDefault();
        });
});
