var map = new OpenLayers.Map('map', {
    controls: []
});
var osm = new OpenLayers.Layer.OSM();
map.addLayer(osm);
var tilesLayer = new OpenLayers.Layer.Vector("Tiles Layers", {
    projection: new OpenLayers.Projection("EPSG:4326"),
    displayInLayerSwitcher: false,
    renderers: ['Canvas']
});

format = new OpenLayers.Format.GeoJSON();
var tiles = format.read(tiles);
tilesLayer.addFeatures(tiles);
map.zoomToExtent(tilesLayer.getDataExtent());
map.zoomOut();
map.addLayer(tilesLayer);

var roundd = function(input, decimals) {
    var p = Math.pow(10, decimals);
    return Math.round(input*p)/p;
};
var getLink = function(options) {
    if (options.protocol === 'lbrt') {
        var bounds = options.bounds;
        return options.base + OpenLayers.Util.getParameterString({
            left: roundd(bounds.left,5),
            bottom: roundd(bounds.bottom,5),
            right: roundd(bounds.right,5),
            top: roundd(bounds.top,5)
        });
    } else if (options.protocol === 'llz') {
        var c = options.bounds.getCenterLonLat();
        return options.base + OpenLayers.Util.getParameterString({
            lon: roundd(c.lon,5),
            lat: roundd(c.lat,5),
            zoom: options.zoom || 15
        });
    }
};
var exportOpen = function() {  
    var url, bounds = tilesLayer.getDataExtent();

    bounds.transform(
        new OpenLayers.Projection("EPSG:900913"), 
        new OpenLayers.Projection("EPSG:4326")
    );
    
    switch (this.id) {
    case "josm":
        url = getLink({
            base: 'http://127.0.0.1:8111/load_and_zoom?',
            bounds: bounds,
            protocol: 'lbrt'
        });
        var w = window.open(url);
        window.setTimeout(function(){w.close();}, 500);
        break;
    case "potlatch":
        url = getLink({
            base: 'http://www.openstreetmap.org/edit?editor=potlatch&',
            bounds: bounds,
            zoom: jobZoom,
            protocol: 'llz'
        });
        window.open(url);
        break;
    case "potlatch2":
        url = getLink({
            base: 'http://www.openstreetmap.org/edit?editor=potlatch2&',
            bounds: bounds,
            zoom: jobZoom,
            protocol: 'llz'
        });
        window.open(url);
        break;
    case "wp":
        url = getLink({
            base: 'http://walking-papers.org/?',
            bounds: bounds,            
            protocol: 'llz'
        });
        window.open(url);
        break;
    default:
        break;
    }
};
$('#export a').click(exportOpen);

$(function(){
    var count = time_left;
    var countdown = setInterval(function(){
        $("span#countdown").html(Math.floor(count/60));
        if (count === 0) {
            window.location = window.location;
        }
        count--;
    }, 1000);
});
