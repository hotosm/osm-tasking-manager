$().ready(function() {
    $('#flash').fadeIn().delay(2000).fadeOut(400);
    $("a[rel=twipsy]").tooltip({
        live: true
    });
    $("a[rel=popover]")
        .popover({
            offset: 10,
            html: true
        })
        .click(function(e) {
            e.preventDefault();
        });
    $().dropdown();
});
