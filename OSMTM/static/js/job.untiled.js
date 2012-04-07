var vlayer = new OpenLayers.Layer.Vector('new');

vlayer.events.on({
    featureadded: function(obj) {
        drawControl.deactivate();
        OpenLayers.Request.POST({
            url: task_create_url,
            data: geojsonFormat.write([obj.feature]),
            success: function(request) {
                var format = new OpenLayers.Format.JSON();
                var json = format.read(request.responseText);
                
                vlayer.destroyFeatures();
                tilesLayer.refresh();
                take(json.id);
            },
            failure: function() {
                if (confirm("You probably drew an area which overlays another one. Do you want the server to clip it automagically? (not implemented yet)")) {
                    // readd the feature
                    vlayer.addFeatures([obj.feature]);
                } else {
                    vlayer.removeFeatures(obj.feature);
                }
            }
        });
    }
});
map.addLayer(vlayer);

var drawControl = new OpenLayers.Control.DrawFeature(
    vlayer,
    OpenLayers.Handler.Polygon
);
var snap = new OpenLayers.Control.Snapping({
    layer: vlayer,
    targets: [tilesLayer, layer],
    greedy: false
});
snap.activate();
map.addControls([
    drawControl,
    snap
]);
$('body').on('click', '#draw', function() {
    drawControl.activate();
});
