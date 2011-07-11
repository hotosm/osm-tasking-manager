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
map.zoomToExtent(layer.getDataExtent());

var tilesLayer = new OpenLayers.Layer.Vector("Tiles Layers", {
    renderers: ['Canvas']
});
format = new OpenLayers.Format.GeoJSON();
var features = format.read(tiles);
tilesLayer.addFeatures(features);
map.addLayer(tilesLayer);
