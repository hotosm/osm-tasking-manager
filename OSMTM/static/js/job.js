var map = new OpenLayers.Map('map', {
    theme: null,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.ZoomPanel(),
        new OpenLayers.Control.Attribution()
    ]
});
var osm = new OpenLayers.Layer.OSM();
map.addLayer(osm);
var layer = new OpenLayers.Layer.Vector("Objects", {
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

map.addLayer(layer);

var colors = ["#aaa", "red", "green"];
var context = {
    getColor: function(feature) {
        var checkin = feature.attributes.checkin || 0;
        return colors[checkin];
    },
    getStrokeColor: function(feature) {
        return (feature.attributes.username) ?
            "orange" : "black";
    },
    getStrokeWidth: function(feature) {
        return (feature.attributes.username) ?
            2 : 0.3;
    },
    getStrokeOpacity: function(feature) {
        return (feature.attributes.username) ?
            1 : 0.5;
    },
    getZIndex: function(feature) {
        return (feature.attributes.username) ?
            2 : 1;
    },
    getCursor: function(feature) {
        return (feature.attributes.checkin < 2 &&
            !feature.attributes.username) ? "pointer" : "auto";
    }
};
var template = {
    fillColor: "${getColor}",
    fillOpacity: 0.5,
    strokeColor: "${getStrokeColor}",
    strokeWidth: "${getStrokeWidth}",
    strokeOpacity: "${getStrokeOpacity}",
    graphicZIndex: "${getZIndex}",
    cursor: "${getCursor}"
};
var style = new OpenLayers.Style(template, {context: context});
var tilesLayer = new OpenLayers.Layer.Vector("Tiles Layers", {
    styleMap: new OpenLayers.StyleMap(style),
    rendererOptions: {
        zIndexing: true
    }
});
map.addLayer(tilesLayer);

function showTilesStatus() {
    var protocol = new OpenLayers.Protocol.HTTP({
        url: tiles_status_url,
        format: new OpenLayers.Format.JSON(),
        callback: function(response) {
            if (response.success()) {
                $.each(tilesLayer.features, function(index, feature) {
                    feature.attributes = {};
                });
                $.each(response.features, function(id, val) {
                    var feature = tilesLayer.getFeatureByFid(id);
                    feature.attributes = val;
                    if (val.username == user) {
                        map.zoomToExtent(feature.geometry.getBounds());
                    }
                });
                // FIXME, hack
                tilesLayer.drawn = false;
                tilesLayer.redraw();
            }
        }
    });
    protocol.read();
}

var protocol = new OpenLayers.Protocol.HTTP({
    url: job_url,
    format: new OpenLayers.Format.GeoJSON(),
    callback: function(response) {
        if (response.success()) {
            layer.addFeatures(response.features);
            map.zoomToExtent(layer.getDataExtent());
        }
    }
});
protocol.read();

protocol = new OpenLayers.Protocol.HTTP({
    url: tiles_url,
    format: new OpenLayers.Format.GeoJSON(),
    callback: function(response) {
        if (response.success()) {
            tilesLayer.addFeatures(response.features);
            showTilesStatus();
        }
    }
});
protocol.read();

var featureControl = new OpenLayers.Control.SelectFeature(tilesLayer, {
    onSelect: function(feature) {
        var attr = feature.attributes;
        if (attr.checkin >=  2 || attr.username !== null) {
            return false;
        }
        window.location = job_url + "/task/" + attr.x + "/" + attr.y + "/take";
    }
});
map.addControls([featureControl]);
featureControl.activate();
featureControl.handlers.feature.stopDown = false;

var chart_drawn = false;
$('a[href="#chart"]').on('shown', function (e) {
    if (chart_drawn) {
        return false;
    }

    if ($('#chart_div').length < 1) {
        return;
    }
    var done_values = window.chart_done,
        validated_values = window.chart_validated,
        date, done, validated,
        data_done = [],
        data_validated = [],
        i, len;
    for (i=0, len=done_values.length; i < len; i++) {
        date = new Date(done_values[i][0]);
        done = done_values[i][1];
        data_done.push([date.getTime(), done]);
    }
    for (i=0, len=validated_values.length; i < len; i++) {
        date = new Date(validated_values[i][0]);
        validated = validated_values[i][1];
        data_validated.push([date.getTime(), validated]);
    }
    var chart = new Highcharts.Chart({
        title: null,
        chart: {
            renderTo: 'chart_div',
            type: 'spline'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            }
        },
        yAxis: {
            title: {
                text: 'Number of tasks'
            },
            min: 0
        },
        series: [{
            name: 'Done',
            data: data_done,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }, {
            name: 'Validated',
            data: data_validated,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }],
        colors: ['#FF4D4D', '#4DA64D']
    });
    // prevent multiple renderings
    chart_drawn = true;
});

$('form').live('submit', function(e) {
    var formData = $(this).serializeObject();
    var submitName = $("button[type=submit][clicked=true]").attr("name");
    formData[submitName] = true;
    $.ajax({
        url: this.action,
        type: 'POST',
        data: formData,
        success: function(responseText){
            $('#task').html(responseText);
            showTilesStatus();
        },
        failure: function() {
            alert("error");
        }
    });
    return false;
});
$("form button[type=submit]").live('click', function() {
    $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
    $(this).attr("clicked", "true");
});
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
