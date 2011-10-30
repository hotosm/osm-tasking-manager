var map = new OpenLayers.Map('map', {
    controls: []
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

var format = new OpenLayers.Format.WKT();
layer.addFeatures(format.read(geometry));

var colors = ["#aaa", "red", "green"];
var context = {
    getColor: function(feature) {
        var checkin = feature.attributes.checkin || 0;
        return colors[checkin];
    },
    getStrokeColor: function(feature) {
        return (feature.attributes.checkout !== null) ?
            "orange" : "black";
    },
    getStrokeWidth: function(feature) {
        return (feature.attributes.checkout !== null) ?
            2 : 0.3;
    },
    getStrokeOpacity: function(feature) {
        return (feature.attributes.checkout !== null) ?
            1 : 0.5;
    },
    getZIndex: function(feature) {
        return (feature.attributes.checkout !== null) ?
            2 : 1;
    }
};
var template = {
    fillColor: "${getColor}",
    fillOpacity: 0.5,
    strokeColor: "${getStrokeColor}",
    strokeWidth: "${getStrokeWidth}",
    strokeOpacity: "${getStrokeOpacity}",
    graphicZIndex: "${getZIndex}" 
};
var style = new OpenLayers.Style(template, {context: context});
var tilesLayer = new OpenLayers.Layer.Vector("Tiles Layers", {
    styleMap: new OpenLayers.StyleMap(style),
    rendererOptions: {
        zIndexing: true
    }
});
format = new OpenLayers.Format.GeoJSON();
var features = format.read(tiles);
tilesLayer.addFeatures(features);
map.zoomToExtent(tilesLayer.getDataExtent());
map.addLayer(tilesLayer);
