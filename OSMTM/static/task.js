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
var features = format.read(tiles);
tilesLayer.addFeatures(features);
map.zoomToExtent(tilesLayer.getDataExtent());
map.zoomOut()
map.addLayer(tilesLayer);
