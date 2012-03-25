var map = new OpenLayers.Map('map', {
    theme: null,
    projection: new OpenLayers.Projection('EPSG:900913'),
    maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34,
                                         20037508.34, 20037508.34),
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.ZoomPanel(),
        new OpenLayers.Control.Attribution()
    ]
});
var osm = new OpenLayers.Layer.OSM({
    buffer: 0
});
map.addLayer(osm);
var tilesUrl = window.location + '/tiles/${z}/${x}/${y}';
var tilesLayer = new OpenLayers.Layer.XYZ("Tiles", 
    tilesUrl + '.png',
    {
        isBaseLayer: false,
        buffer: 0
    });
map.addLayer(tilesLayer);
var utfgrid = new OpenLayers.Layer.UTFGrid({
    url: tilesUrl + '.json',
    utfgridResolution: 4
});
map.addLayer(utfgrid);

// prevent caching
function redrawLayers() {
    tilesLayer.url = tilesUrl + '.png?_cdsalt=' + Math.random();
    utfgrid.url = tilesUrl + '.json?_cdsalt=' + Math.random();
    tilesLayer.redraw(true);
    utfgrid.redraw(true);
}
var control = new OpenLayers.Control.UTFGrid({
    handlerMode: 'click',
    callback: function(infoLookup) {
        var info;
        for (var idx in infoLookup) {
            // idx can be used to retrieve layer from map.layers[idx]
            info = infoLookup[idx];
            if (info && info.data && !current_tile && !info.data.username) {
                var data = info.data;
                $('#task').load(
                    job_url + "/task/" + data.x + "/" + data.y + "/take",
                    function(responseText, textStatus, request) {
                        if (textStatus == 'error') {
                            alert(responseText);
                        } else {
                            $('#task_tab').tab('show');
                            redrawLayers(); 
                        }
                    }
                );
            }
        }
    }
});
map.addControl(control);
layer = new OpenLayers.Layer.Vector("Objects", {
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
        return ((feature.attributes.checkin < 2 ||
            !feature.attributes.checkin) &&
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

var protocol = new OpenLayers.Protocol.HTTP({
    url: job_geom,
    format: new OpenLayers.Format.GeoJSON(),
    callback: function(response) {
        if (response.success()) {
            layer.addFeatures(response.features);
            map.zoomToExtent(layer.getDataExtent());
        }
    }
});
protocol.read();

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
    $('#task').load(this.action, formData, function(responseText) {
        redrawLayers();
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

function takeOrUnlock(e) {
    $('#task').load(this.href, '',
        function(responseText, textStatus, request) {
            if (textStatus == 'error') {
                alert(responseText);
            } else {
                redrawLayers();
            }
        }
    );
    return false;
}
$('#unlock').live('click', takeOrUnlock);
$('#validate').live('click', takeOrUnlock);
$('#take_again').live('click', takeOrUnlock);

var task_time_left;
$(function(){
    var countdown = setInterval(function(){
        $("span#countdown").html(Math.floor(task_time_left/60));
        if (task_time_left === -10) {
            window.location = window.location;
        }
        task_time_left--;
    }, 1000);
});
