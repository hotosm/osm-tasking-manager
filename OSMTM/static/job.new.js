var map = null;
$('#id_relation')
    .blur(function() {
        $('#relation_map').show();
        map && map.destroy();
        map = new OpenLayers.Map('map', {
            controls: []
        });
        var osm = new OpenLayers.Layer.OSM();
        map.addLayer(osm);
        OpenLayers.ProxyHost = '/osmproxy?url=';
         
        var url = "http://www.openstreetmap.org/api/0.6/relation/" + this.value + '/full';
        var layer = new OpenLayers.Layer.GML("Objects", url, {
            format: OpenLayers.Format.OSM,
            style: {
                strokeColor: "blue",
                strokeWidth: 3,
                strokeOpacity: 0.5,
                fillOpacity: 0.2,
                fillColor: "lightblue",
                pointRadius: 6
            },
            projection: new OpenLayers.Projection("EPSG:4326"),
            displayInLayerSwitcher: false
        });

        layer.events.register("loadend", layer, function() {
            map.zoomToExtent(layer.getDataExtent());
            var format = new OpenLayers.Format.WKT();
            $('#geometry')[0].value = format.write(layer.features[0]);
        });

        map.addLayer(layer);

        layer.loadGML();
    });

