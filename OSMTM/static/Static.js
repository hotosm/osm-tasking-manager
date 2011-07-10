/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/Grid.js
 */

/** 
 * Class: OpenLayers.Layer.Static
 * This layer is composed of tiles which size varies depending on the zoom
 * level (ie. 256x256px at zoom level 15)
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 */
OpenLayers.Layer.Static = OpenLayers.Class(OpenLayers.Layer.Grid, {
    
    /**
     * APIProperty: sphericalMecator
     * Whether the tile extents should be set to the defaults for 
     *    spherical mercator. Useful for things like OpenStreetMap.
     *    Default is false, except for the OSM subclass.
     */
    sphericalMercator: true,

    /**
     * APIProperty: tiles
     * The tiles for the currently displayed area
     */
    tiles: null,

    /**
     * APIProperty: tag
     * The tag to display green tiles for
     */
    tag: 'highway',

    /**
     * APIProperty: tiles_url
     * The "tiles" service URL.
     */
    tilesURL: null,

    /**
     * Property: selectedTiles
     * The currently selected tiles
     */
    selectedTiles: [],

    /**
     * Property: EVENT_TYPES
     */
    EVENT_TYPES: [
        'selectionchange'
    ],
    
    /**
     * Constructor: OpenLayers.Layer.XYZ
     *
     * Parameters:
     * name - {String}
     * tilesURL - {String} The "tiles" service URL.
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, tilesURL, options) {
        this.tilesURL = tilesURL;
        options = OpenLayers.Util.extend({
            maxExtent: new OpenLayers.Bounds(
                -128 * 156543.0339,
                -128 * 156543.0339,
                128 * 156543.0339,
                128 * 156543.0339
            ),
            maxResolution: 156543.0339,
            numZoomLevels: 19,
            units: "m",
            projection: "EPSG:900913"
        }, options);
        var url = '';
        name = name || this.name;
        var newArguments = [name, url, {}, options];
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    clone: function (obj) {
        // no support for clone at the moment
    },    

    /**
     * Method: moveTo
     * This function is called whenever the map is moved. All the moving
     * of actual 'tiles' is done by the map, but moveTo's role is to accept
     * a bounds and make sure the data that that bounds requires is pre-loaded.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        // we want to update the layer only once dragging is finished
        if (!dragging) {
            this.clearGrid();
            var s = Math.pow(2, this.map.getZoom() - 7);
            this.tileSize = new OpenLayers.Size(s, s);
            OpenLayers.Layer.Grid.prototype.moveTo.apply(this, arguments);

            this.getRange();
            this.div.style.display = 'block';
        } else {
            this.div.style.display = 'none';
        }
    },

    /**
     * Method: addTile
     * addTile creates a tile, initializes it, and adds it to the layer div. 
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * position - {<OpenLayers.Pixel>}
     * 
     * Returns:
     * {<OpenLayers.Tile.Image>} The added OpenLayers.Tile.Image
     */
    addTile:function(bounds,position) {
        var location = this.getTileLocation(bounds);
        var tile = new OpenLayers.Tile.Div(this, position, bounds, null, this.tileSize, {
            location: location
        });
        tile.events.on({
            'select': function() {
                if (this.selectedTiles.indexOf(tile) == -1) {
                    this.selectedTiles.push(tile);
                }
                this.events.triggerEvent('selectionchange');
            },
            'unselect': function() {
                OpenLayers.Util.removeItem(this.selectedTiles, tile);
                this.events.triggerEvent('selectionchange');
            },
            scope: this
        });

        return tile;
    },
     
    /* APIMethod: setMap
     * When the layer is added to a map, then we can fetch our origin 
     *    (if we don't have one.) 
     * 
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) { 
            this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left,
                                                this.maxExtent.bottom);
        }                                       
    },

    /**
     * Method: getRange
     *
     * Returns:
     * {Object} with minx, miny, maxx, maxy representing the min and max index
     *     of the tiles.
     */
    getRange: function() {
        var res = this.map.getResolution();
        var bounds = this.map.getExtent();
        var minx = Math.round((bounds.left - this.maxExtent.left) 
            / (res * this.tileSize.w)) - 1;
        var maxx = Math.round((bounds.right - this.maxExtent.left)
            / (res * this.tileSize.w)) + 1;
        var miny = Math.round((this.maxExtent.top - bounds.top) 
            / (res * this.tileSize.h)) - 1;
        var maxy = Math.round((this.maxExtent.top - bounds.bottom)
            / (res * this.tileSize.h)) + 1;
        
        OpenLayers.Request.GET({
            url: this.tilesURL,
            params: {
                minx: minx,
                maxx: maxx,
                miny: miny,
                maxy: maxy
            },
            success: function(response) {
                var format = new OpenLayers.Format.JSON();
                var tiles = format.read(response.responseText);
                // TODO don't loose selection
                this.updateTiles(tiles);
                this.reselectTiles();
            },
            scope: this
        });
    },

    /**
     * Method: updateTiles
     */
    updateTiles: function(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i],
                x = tile.value.x,
                y = tile.value.y,
                cell,
                row,
                col,
                complete;
            for (row = 0; row < this.grid.length; row++) {
                for (col = 0; col < this.grid[row].length; col++) {
                    cell = this.grid[row][col];
                    if (x == cell.location[0] &&
                        y == cell.location[1]) {
                            //full = (this.tag == 'all' ||
                                //tile.value.tags.indexOf(this.tag) != -1) ?
                                    //true : false;
                        cell.setAttributes(tile.value);
                        if (tile.value.tags.indexOf(this.tag) != -1) {
                            cell.markAsValid();
                        }
                    }
                }
            }
        }
    },

    /**
     * Method: reselectTiles
     * Reselect the previously selected tiles
     * The tiles which are not in the extent anymore are not kept selected.
     */
    reselectTiles: function() {
        var newSelection = [];
        var sel;
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[row].length; col++) {
                var cell = this.grid[row][col];
                for (var i = 0; i < this.selectedTiles.length; i++) {
                    sel = this.selectedTiles[i];
                    if (sel.location[0] == cell.location[0] &&
                        sel.location[1] == cell.location[1]) {
                        newSelection.push(cell);
                        cell.select(true);
                    }
                }
            }
        }
        this.selectedTiles = newSelection;
        this.events.triggerEvent('selectionchange');
    },

    /**
     * APIMethod: refresh
     */
    refresh: function() {
        this.changeTag(this.tag);
    },

    /**
     * APIMethod: changeTag
     * If user want to display information about one specific tag on the map,
     * we don't need to call the server.
     * 
     * Parameters
     * tag {String} The new tag.
     */
    changeTag: function(tag) {
        this.tag = tag;
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[row].length; col++) {
                var cell = this.grid[row][col];
                cell.markAsInvalid();
                if (cell.tags.length > 0) {
                    if (cell.tags.indexOf(this.tag) != -1) {
                        cell.markAsValid();
                    }
                    //console.log("ixi", cell.tags.length, cell.location[0]);
                    //var full = (this.tag == 'all' ||
                        //cell.tags.indexOf(this.tag) != -1) ?
                            //true : false;
                    //cell.markAsValid(full);
                }
            }
        }
    },

    /**
     * APIMethod: unselectAll
     */
    unselectAll: function() {
        this.selectedTiles = [];
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[row].length; col++) {
                var cell = this.grid[row][col];
                cell.unselect(true);
            }
        }
    },

    /**
     * Method: getTileLocation
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {Array} The x and y position of the tile in the grid
     */
    getTileLocation: function (bounds) {
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) 
            / (res * this.tileSize.w));
        var y = Math.round((this.maxExtent.top - bounds.top) 
            / (res * this.tileSize.h));
        return [x, y];
    },

    /**
     * Method: updateTile
     *
     * Parameters
     * tiles {Array({OpenLayers.Tile.Div)} The tiles to change the tag for
     * tag {String} The tag to add or remove
     * remove {Boolean} true to remove the tag, false to remove it
     * callback {Function} the function called on success
     */
    updateTile: function(tiles, tag, remove, callback) {
        var nResponses = 0;
        var nRequests = tiles.length;

        function onSuccess(tile, response) {
            if (!remove) {
                tile.addTag(tag);
            } else {
                tile.removeTag(tag);
            }
            nResponses++;
            if (nResponses >= nRequests) {
                this.refresh();
                if (callback) {
                    callback.call();
                }
            }
        }

        var tile;
        for (var i = 0, len = tiles.length; i < len; i++) {
            tile = tiles[i];
            // don't re-add a tag or re-remove a tag
            if (!remove && tile.tags.indexOf(tag) != -1 ||
                remove && tile.tags.indexOf(tag) == -1) {
                nRequests--;
                continue;
            }
            var url = OpenLayers.String.format(
                '${tilesURL}/${x},${y}/tags/${tag}', {
                'tilesURL': this.tilesURL,
                'x': tile.location[0],
                'y': tile.location[1],
                'tag': tag
            });
            OpenLayers.Request.issue({
                method: remove ? 'DELETE' : 'PUT',
                url: url,
                success: OpenLayers.Function.bind(onSuccess, this, tile)
            });
        }
    },

    CLASS_NAME: "OpenLayers.Layer.Static"
});
