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
    } else if (options.protocol === 'id') {
        var c = options.bounds.getCenterLonLat();
        return options.base + '#map=' + [options.zoom, c.lat, c.lon].join('/');
    }
};
var exportOpen = function() {
    var url,
        format = new OpenLayers.Format.GeoJSON(),
        f = format.read(current_tile)[0],
        bounds = f.geometry.getBounds();

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
        $.get(url);
        break;
    case "potlatch2":
        url = getLink({
            base: 'http://www.openstreetmap.org/edit?editor=potlatch2&',
            bounds: bounds,
            zoom: zoom,
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
    case "id":
        url = getLink({
            base: 'http://www.openstreetmap.org/edit?editor=id',
            bounds: bounds,
            zoom: zoom,
            protocol: 'id'
        });
        window.open(url + "&gpx=" + gpx_url);
        break;
    default:
        break;
    }
};
$('#export a').live('click', exportOpen);
