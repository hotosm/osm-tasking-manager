var map = null,
    boxLayer = null,
    imageryLayer = null,
    tiles = null;

function showImageryLayer () {
    if (imageryLayer == null) {
        imageryLayer = new OpenLayers.Layer.XYZ(
            "Imagery", $("#id_imagery").val(), {sphericalMercator: true});
        map.addLayer(imageryLayer);
        // map.setLayerIndex(imageryLayer, 1);
    }
    imageryLayer.setVisibility(true);
    return imageryLayer;
}

function resetMap () {
    $('#id_submit')[0].disabled = true;
    $('#map').show();
    map && map.destroy();
    map = new OpenLayers.Map('map', {
        controls: []
    });
    var osm = new OpenLayers.Layer.OSM();
    map.addLayer(osm);
    if ($('#id_imagery_toggle').val() == 'Hide') {
        // that means show the layer, then
        imageryLayer = null;
        showImageryLayer();
    }
    map.zoomToMaxExtent();
}

function plotBox (bounds) {
    var mercBounds = new OpenLayers.Bounds();
    mercBounds.extend(bounds);
    mercBounds.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    boxLayer.clearMarkers()
    boxLayer.addMarker(new OpenLayers.Marker.Box(mercBounds));
    $('#geometry')[0].value = mercBounds.toGeometry();
    $('#bbox').val(bounds);
    $('#id_submit')[0].disabled = false;
}

function showBoundingBoxMap () {
    $('#relation_loading_msg').hide();
    boxLayer = new OpenLayers.Layer.Boxes("BBox");
    map.addLayer(boxLayer);
    var control = new OpenLayers.Control();
    OpenLayers.Util.extend(control, {
        draw: function () {
            this.box = new OpenLayers.Handler.Box(control,
                {"done": function(pxBounds) { 
                    var bounds = new OpenLayers.Bounds();
                    var pt1 = map.getLonLatFromPixel(new OpenLayers.Pixel(pxBounds.left, pxBounds.bottom))
                        pt2 = map.getLonLatFromPixel(new OpenLayers.Pixel(pxBounds.right, pxBounds.top));
                    bounds.extend(pt1);
                    bounds.extend(pt2);
                    bounds.transform(map.getProjectionObject(),new OpenLayers.Projection("EPSG:4326"));
                    plotBox(bounds);
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
    if ($('#bbox').val() != '') {
        plotBoxFromInput();
    }
}

function plotBoxFromInput() {
    var coords = $('#bbox').val().split(","),
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

$('input[name=relation_type]')
    .change(function() {
        resetMap();
        if ($(this).val() == "relation") {
            $('#id_relation').attr('disabled', false);
            $('#bbox').attr('disabled', true);
        } else {
            $('#bbox').attr('disabled', false);
            $('#id_relation').attr('disabled', true);
            showBoundingBoxMap();
        }
    });

$('#id_relation')
    .focus()
    .change(function() {
        if ($("input[name=relation_type]").val() == "relation") {
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
        } else if ($('#bbox').val() != '') {
            plotBoxFromInput();
        }
    });

$('#id_imagery')
    .change(function() {
        if (imageryLayer) {
            map.removeLayer(imageryLayer);
            imageryLayer = null;
            $('#id_imagery_toggle').val('Show');
        }
    });

$('#id_imagery_toggle')
    .click(function() {
        var value = $('#id_imagery_toggle').val();
        if ($('#id_imagery') == '') return;
        if (value == 'Show') {
            showImageryLayer();
            value = 'Hide';
        } else {
            if (imageryLayer) imageryLayer.setVisibility(false);
            value = 'Show';
        }
        $('#id_imagery_toggle').val(value);
    });

$('#id_zoom')
    .change(function() {
        //tiles.zoom = this.value; 
        //tiles.redraw();
    });


$(document).ready(function() {
    $.cleditor.defaultOptions.width = 430;
    $.cleditor.defaultOptions.height = 150;
    $.cleditor.defaultOptions.controls = "bold italic underline | color highlight | bullets numbering | link unlink";
    $("textarea").cleditor();
    resetMap();
});
