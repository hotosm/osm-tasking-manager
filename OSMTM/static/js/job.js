var map = new OpenLayers.Map('map', {
    theme: null,
    controls: [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.ZoomPanel(),
        new OpenLayers.Control.Attribution()
    ]
});
var osm = new OpenLayers.Layer.OSM('OSM', null, {
    transitionEffect: 'resize'
});
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

var colors = ["grey", "lime"];
var context = {
    getColor: function(feature) {
        var checkin = feature.attributes.checkin || 0;
        return colors[checkin];
    },
    getStrokeColor: function(feature) {
        if (feature.attributes.username) {
            return "orange";
        }
        if (feature.fid == current_task) {
            return "blue";
        }
        return "black";
    },
    getStrokeWidth: function(feature) {
        return (feature.fid == current_task || feature.attributes.username) ?
            2 : 0.3;
    },
    getStrokeOpacity: function(feature) {
        if (typeof feature.attributes.highlight != 'undefined') {
            return feature.attributes.highlight ? 0.8 : 0.1;
        }
        return (feature.fid == current_task || feature.attributes.username) ?
            1 : 0.5;
    },
    getZIndex: function(feature) {
        if (feature.attributes.username) {
            return 2;
        }
        if (feature.fid == current_task) {
            return 3;
        }
        return 1;
    },
    getFillOpacity: function(feature) {
        if (typeof feature.attributes.highlight != 'undefined') {
            return feature.attributes.highlight ? 0.6 : 0.1;
        }
        return 0.4;
    }
};
var template = {
    fillColor: "${getColor}",
    fillOpacity: "${getFillOpacity}",
    strokeColor: "${getStrokeColor}",
    strokeWidth: "${getStrokeWidth}",
    strokeOpacity: "${getStrokeOpacity}",
    graphicZIndex: "${getZIndex}",
    cursor: "pointer"
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
                var total = tilesLayer.features.length,
                    done = 0,
                    cur = 0;
                $.each(response.features, function(id, val) {
                    var feature = tilesLayer.getFeatureByFid(id);
                    feature.attributes = val;
                    if (val.checkin == 1 || val.checkin == 2) {
                        done++;
                    }
                    if (val.username) {
                        cur++;
                    }
                });
                // FIXME, hack
                tilesLayer.drawn = false;
                tilesLayer.redraw();
                $('#map_legend ul').html(function() {
                    return '<li><div class=""></div>Total (' + total + ')</li>' +
                           '<li><div class="checkin1"></div>Done (' + done + ')</li>' +
                           '<li><div class="checkout"></div>Curr. worked on (' + cur + ')</li>';
                });
            }
        }
    });
    protocol.read();
}

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

protocol = new OpenLayers.Protocol.HTTP({
    url: tiles_url,
    format: new OpenLayers.Format.GeoJSON(),
    callback: function(response) {
        if (response.success()) {
            tilesLayer.addFeatures(response.features);
            showTilesStatus();
            // Client-side routes
            Sammy(function() {
                this.get('#task/:x/:y/:zoom', function() {
                    loadTask(this.params.x, this.params.y, this.params.zoom);
                });
                this.get('#task/:x/:y/:zoom/:action', function() {
                    loadTask(this.params.x, this.params.y, this.params.zoom, 'next');
                });
            }).run();
        }
    }
});
protocol.read();

var featureControl = new OpenLayers.Control.SelectFeature(tilesLayer, {
    onSelect: function(feature) {
        var id = feature.fid.split('-');
        hideTooltips();
        location.hash = ["task", id[0], id[1], id[2]].join('/');
    }
});
map.addControls([featureControl]);
featureControl.activate();
featureControl.handlers.feature.stopDown = false;

var current_task;
function loadEmptyTask() {
    current_task = null;
    tilesLayer.redraw();
    $('#task').fadeOut(function() {
        $('#task').load([job_url, "task"].join('/'), function() {
            $(this).css('display', '');
        });
    });
}
function loadTask(x, y, zoom, direction) {
    hideTooltips();
    // it may already be done
    location.hash = ["task", x, y, zoom].join('/');
    $('#task_tab').tab('show');
    if (direction) {
        $('#task_actions').slide(direction)
            .one('slid', function() {
                $('#task').load([job_url, "task", x, y, zoom].join('/'));
            });
    } else {
        $('#task').fadeOut(function() {
            $('#task').load([job_url, "task", x, y, zoom].join('/'), function() {
                $(this).css('display', '');
            });
        });
    }
    var id = [x, y, zoom].join('-');
    current_task = id;
    var feature = tilesLayer.getFeatureByFid(id);
    tilesLayer.redraw();
    var z = map.getZoomForExtent(feature.geometry.getBounds()),
        centroid = feature.geometry.getCentroid(),
        lonlat = new OpenLayers.LonLat(centroid.x, centroid.y);
    map.zoomTo(zoom - 1);
    map.panTo(lonlat);
}

$('a[href="#chart"]').on('shown', function (e) {
    $.getJSON(job_stats_url, function(data) {
        var done_values = data,
            date, done,
            data_done = [],
            i, len;
        for (i=0, len=done_values.length; i < len; i++) {
            date = new Date(done_values[i][0]);
            done = done_values[i][1];
            data_done.push([date.getTime(), done]);
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
            }],
            colors: ['#FF4D4D', '#4DA64D']
        });
    });
});

$('a[href="#users"]').on('shown', function (e) {
    $.getJSON(job_contributors_url, function(data) {
        var el = $('#contributors').empty();
        for (var i = 0; i < data.length; i++) {
            el.append($('<li>', {
                html: $('<a>', {
                    "class": "user",
                    href: "http://www.openstreetmap.org/user/" + data[i],
                    target: "_blank",
                    html: data[i]
                })
            }));
        }
    });
});

var userTilesReq;
$('a.user').live('mouseenter', function(e) {
    userTilesReq && userTilesReq.abort();
    var username = $(e.target).text();
    userTilesReq = $.getJSON(job_url + '/user/' + username, function(data) {
        var i;
        for (i = 0; i < tilesLayer.features.length; i++) {
            tilesLayer.features[i].attributes.highlight = false;
        }
        for (i = 0; i < data.length; i++) {
            var id = data[i].join('-');
            var feature = tilesLayer.getFeatureByFid(id);
            if (feature) {
                feature.attributes.highlight = true;
            }
        }
        tilesLayer.redraw();
    });
});
$('a.user').live('mouseleave', function(e) {
    userTilesReq && userTilesReq.abort();
    for (var i = 0; i < tilesLayer.features.length; i++) {
        delete tilesLayer.features[i].attributes.highlight;
    }
    tilesLayer.redraw();
});

$('form').live('submit', function(e) {
    var form = this;
    function load() {
        hideTooltips();
        var formData = $(form).serializeObject();
        var submitName = $("button[type=submit][clicked=true]").attr("name");
        action_url = $("button[type=submit][clicked=true]").attr("action_url");
        if (action_url != undefined) {
            form.action = action_url;
        }
        formData[submitName] = true;
        $.get(form.action, formData, function(response) {
            var tile = response.tile;
            loadEmptyTask();
            showTilesStatus();
        });
    }
    if ($(form).has($('#commentModal')).length > 0) {
        $('#commentModal').modal('show');
        $('#task_comment').focus();
        $('#commentModalCloseBtn').on('click', function() {
            if ($('#task_comment')[0].value !== '') {
                $('#commentModal').modal('hide');
                load();
            }
        });
    } else {
        load();
    }
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

function startLoading() {
    $('#task .loading').show();
}
function stopLoading() {
    $('#task .loading').hide();
}

function takeOrUnlock(e) {
    hideTooltips();
    var direction = e.data && e.data.direction;
    startLoading();
    $.getJSON(this.href, function(data) {
        stopLoading();
        showTilesStatus();
        if (data.tile) {
            var tile = data.tile;
            loadTask(tile.x, tile.y, tile.z, direction);
            return;
        }
        if (data.error_msg) {
            $('#task_error_msg').html(data.error_msg).show()
                .delay(3000)
                .fadeOut();
            return;
        }
        if (data.split_id) {
            splitTask(data.split_id, data.new_tiles);
        }
        loadEmptyTask();
    });
    return false;
}
$('#take_random').live('click', {}, takeOrUnlock);
$('#lock').live('click', {direction: 'next'}, takeOrUnlock);
$('#unlock').live('click', {direction: 'prev'}, takeOrUnlock);
$('#validate').live('click', {direction: 'next'}, takeOrUnlock);
$('#split').live('click', {direction: 'prev'}, takeOrUnlock);
$('#clear').live('click', loadEmptyTask);

function splitTask(id, newTiles) {
    var feature = tilesLayer.getFeatureByFid(id);
    tilesLayer.removeFeatures([feature]);

    var format = new OpenLayers.Format.GeoJSON();
    tilesLayer.addFeatures(format.read(newTiles));
}

function hideTooltips() {
    $('[rel=tooltip]').tooltip('hide');
}

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

$.fn.slide = function(type) {
    // we hide tooltips since they may interact with transitions
    hideTooltips();
    var $container = $(this);
    var $active = $('<div class="item active">');
    $active.html($container.html());
    $container.html('').append($active);
    var direction = type == 'next' ? 'left' : 'right';
    var $next = $('<div>');
    if ($.support.transition) {
        $next.addClass(type);
        $next.offsetWidth; // force reflow
        $container.append($next);
        setTimeout(function() {
            $active.addClass(direction);
            $active.one($.support.transition.end, function (e) {
                $next.removeClass([type, direction].join(' ')).addClass('active');
                $active.remove();
                setTimeout(
                    function () {
                        $next.addClass('item');
                        $container.trigger('slid');
                    },
                    0
                );
            });
        }, 200); // time to hide tooltips
    } else {
        $container.trigger('slid');
    }
    return this;
};
