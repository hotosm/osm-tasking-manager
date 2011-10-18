var map = null,
    tiles = null;

function resetMap () {
    $('#id_submit')[0].disabled = true;
    $('#map').show();
    map && map.destroy();
    map = new OpenLayers.Map('map', {
        controls: []
    });
    var osm = new OpenLayers.Layer.OSM();
    map.addLayer(osm);
}

function plotBox (bounds) {
    var mercBounds = new OpenLayers.Bounds();
    mercBounds.extend(bounds);
    mercBounds.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    map.layers[1].clearMarkers()
    map.layers[1].addMarker(new OpenLayers.Marker.Box(mercBounds));
    $('#geometry')[0].value = bounds.toGeometry();
    $('#id_relation').val(bounds);
    $('#id_submit')[0].disabled = false;
}

function showBoundingBoxMap () {
    $('#relation_loading_msg').hide();
    resetMap();
    var boxes = new OpenLayers.Layer.Boxes("BBox");
    map.addLayer(boxes);
    var control = new OpenLayers.Control();
    OpenLayers.Util.extend(control, {
        draw: function () {
            this.box = new OpenLayers.Handler.Box(control,
                {"done": function(pxBounds) { 
                    var llBounds = new OpenLayers.Bounds();
                    var pt1 = map.getLonLatFromPixel(new OpenLayers.Pixel(pxBounds.left, pxBounds.bottom))
                        pt2 = map.getLonLatFromPixel(new OpenLayers.Pixel(pxBounds.right, pxBounds.top));
                    llBounds.extend(pt1);
                    llBounds.extend(pt2);
                    llBounds.transform(map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326"));
                    plotBox(llBounds);
                }},
                {keyMask: OpenLayers.Handler.MOD_SHIFT});
            this.box.activate();
        }
    });
    map.addControls([
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Navigation(),
        control
    ]);
    map.zoomToMaxExtent();
    if ($('#id_relation').val() != '') {
        plotBoxFromInput();
    }
}

function plotBoxFromInput() {
    var coords = $('#id_relation').val().split(","),
        bbox = [];
    for (var i = 0; i < 4; i++) {
        bbox[i] = parseFloat(coords[i]);
        if (coords[i] == "" || coords[i] == " " || isNaN(bbox[i])) {
            alert("Please enter bounding box coords as: south,west,north,east");
            return;
        }
    }
    var bounds = new OpenLayers.Bounds(bbox[0],bbox[1],bbox[2],bbox[3]);
    plotBox(bounds);
}

$('#id_relation_type')
    .change(function() {
        if ($("#id_relation_type").val() == "relation") {
            $('#map').hide();
        } else {
            showBoundingBoxMap();
        }
    });

$('#id_relation')
    .focus()
    .change(function() {
        if ($("#id_relation_type").val() == "relation") {
            resetMap();
            $('#relation_loading_msg').show();
            var url = "http://www.openstreetmap.org/api/0.6/relation/" + this.value + '/full';
            var layer = new OpenLayers.Layer.GML("Objects", url, {
                format: OpenLayers.Format.WKT,
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
                $('#relation_loading_msg').hide();
                map.zoomToExtent(layer.getDataExtent());
                var format = new OpenLayers.Format.WKT();
                $('#geometry')[0].value = format.write(layer.features[0]);
                $('#id_submit')[0].disabled = false;
            });

            map.addLayer(layer);
            layer.loadGML();
        } else if ($('#id_relation').val() != '') {
            plotBoxFromInput();
        }
    });

$('#id_zoom')
    .change(function() {
        //tiles.zoom = this.value; 
        //tiles.redraw();
    });


$(document).ready(function() {
    $.cleditor.defaultOptions.width = 230;
    $.cleditor.defaultOptions.height = 150;
    $.cleditor.defaultOptions.controls = "bold italic underline | color highlight | bullets numbering | link unlink";
    $("textarea").cleditor();
    if ($('#id_relation_type').val() == 'bbox') showBoundingBoxMap();
});
