var map = null,
    vectorLayer = null,
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

function updateSubmitBtnStatus() {
    var disabled = $('#id_title').val() === '' ||
        $('#geometry').val() === '';
    $('#id_submit')[0].disabled = disabled;
}

function resetMap () {
    $('#geometry').val('');
    updateSubmitBtnStatus();
    $('#map').show();
    map && map.destroy();
    map = new OpenLayers.Map('map', {
        controls: [],
        theme: null
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
    vectorLayer.removeFeatures(vectorLayer.features);
    var geometry = mercBounds.toGeometry();
    vectorLayer.addFeatures([new OpenLayers.Feature.Vector(geometry)]);
    $('#geometry').val(geometry);
    adaptZoomLevel(mercBounds);
    $('#bbox').val(bounds);
    updateSubmitBtnStatus();
}

function showBoundingBoxMap () {
    $('#relation_loading_msg').hide();
    vectorLayer = new OpenLayers.Layer.Vector("BBox");
    map.addLayer(vectorLayer);
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

// set the zoom level to the more appropriate value
function adaptZoomLevel(bounds) {
    var zoom = $('#id_zoom').val(),
        res = map.getResolutionForZoom(zoom),
        // the size of a tile in meters for the given zoom 
        tileSize = res * 256,
        // the number of tile in a row
        nbByRow = Math.abs(bounds.right - bounds.left) / tileSize,
        nbByCol = Math.abs(bounds.top - bounds.bottom) / tileSize;
    $('#zoom_level_info').show();
    $('#nb_tiles').html(Math.round(nbByRow * nbByCol));
}

$('input[name=relation_type]')
    .change(function() {
        resetMap();
        if ($(this).val() == "relation") {
            $('#id_relation').attr('disabled', false);
            $('#bbox').attr('disabled', true);
            $('#id_relation').val('');
        } else {
            $('#bbox').attr('disabled', false);
            $('#id_relation').attr('disabled', true);
            showBoundingBoxMap();
        }
    });

$('#id_title').focus();

$('#id_relation')
    .change(function() {
        $('#geometry').val('');
        if ($("input[name=relation_type]").val() == "relation") {
            $('#relation_loading_msg').show();
            var url = "http://www.openstreetmap.org/api/0.6/relation/" + this.value + '/full';
            vectorLayer = new OpenLayers.Layer.GML("Objects", url, {
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

            vectorLayer.events.register("loadend", vectorLayer, function() {
                $('#relation_loading_msg').hide();
                map.zoomToExtent(vectorLayer.getDataExtent());
                var format = new OpenLayers.Format.WKT();
                $('#geometry').val(format.write(vectorLayer.features[0]));
                adaptZoomLevel(vectorLayer.getDataExtent());
                updateSubmitBtnStatus();
            });

            map.addLayer(vectorLayer);
            vectorLayer.loadGML();
        } else if ($('#bbox').val() != '') {
            plotBoxFromInput();
        }
    });

$('#bbox')
    .change(plotBoxFromInput);


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
        adaptZoomLevel(vectorLayer.getDataExtent());
    });

$('#id_title')
    .change(function() {
        updateSubmitBtnStatus();
    });

$(document).ready(function() {

    var converter = new Showdown.converter(),
        to_convert = ['#id_short_description', '#id_description', '#id_workflow'];

    $(to_convert).each(function(i, sel){
        var textarea = $(sel),
            preview = $('<div />').appendTo(sel+'_preview');

        textarea.keyup(function() {
            var html = converter.makeHtml(textarea.val());
            preview.html(html);
        }).trigger('keyup');
    });

    resetMap();
});
