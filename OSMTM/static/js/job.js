var map = new L.Map('map', {
});

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osm = new L.TileLayer(osmUrl, {maxZoom: 18});

map.addLayer(osm);

var tilesLayer = new L.GeoJSON();
tilesLayer.on("featureparse", function (e) {
    var color = "#999";
    switch (e.properties.checkin) {
        case 1:
            color = '#FF0000';
            break;
        case 2:
            color = '#00FF00';
            break;
    }
    e.layer.setStyle({
        fillColor: color,
        weight: 0.5,
        color: "#999",
        opacity: 1,
        fillOpacity: 0.4
    });
});

map.addLayer(tilesLayer);

$.getJSON(tiles_url, function(data) {
    tilesLayer.addGeoJSON(data);
    map.fitBounds(tilesLayer.getBounds());
});

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
        showTilesStatus();
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
                showTilesStatus();
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
