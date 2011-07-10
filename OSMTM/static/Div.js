
/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Tile.js
 */

/**
 * Class: OpenLayers.Tile.Div
 * Instances of OpenLayers.Tile.Div are used to manage the div tiles.
 *
 * Inherits from:
 *  - <OpenLayers.Tile>
 */
OpenLayers.Tile.Div = OpenLayers.Class(OpenLayers.Tile, {
    
    /** 
     * Property: div
     * {DOMElement} The div element.
     */
    div: null,

    /**
     * APIProperty: location
     * {Array} The x and y of the tile
     */
    location: null,

    /**
     * APIProperty: attribute
     * {Object} The additionnal attributes
     */
    attributes: null,

    /**
     * APIProperty: tags
     * {Array} The list of tags that this tile is validated for
     */
    tags: null,

    EVENT_TYPES: [
        'select',
        'unselect'
    ],
    
    /**
     * Constructor: OpenLayers.Tile.Image
     * Constructor for a new <OpenLayers.Tile.Image> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * size - {<OpenLayers.Size>}
     * options - {Object}
     */   
    initialize: function(layer, position, bounds, url, size, options) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);
        
        this.div = document.createElement('div'); 
        this.div.style.overflow = 'hidden'; 
        this.div.style.position = 'absolute'; 
        this.div.className = 'olTile';

        var back = document.createElement('div');
        back.className = 'back';
        this.div.appendChild(back);

        this.location = options.location;

        this.tags = [];
        this.attributes = {};

        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
    },

    /** 
     * APIMethod: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        if (this.div != null)  {
            this.removeDiv();
        }
        this.div = null;
        
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<OpenLayers.Tile.Div>} The tile to be cloned
     *
     * Returns:
     * {<OpenLayers.Tile.Div>} An exact clone of this <OpenLayers.Tile.Div>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile.Div(this.layer, this.position, 
                                            this.bounds, 
                                            this.size);        
        } 
        
        //pick up properties from superclass
        obj = OpenLayers.Tile.prototype.clone.apply(this, [obj]);
        
        //dont want to directly copy the div
        obj.div = null;
        
        return obj;
    },
    
    /**
     * Method: draw
     * Check that a tile should be drawn, and draw it.
     * 
     * Returns:
     * {Boolean} Always returns true.
     */
    draw: function() {
        if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
            this.bounds = this.getBoundsFromBaseLayer(this.position);
        }
        var drawTile = OpenLayers.Tile.prototype.draw.apply(this, arguments);
        
        if (!drawTile) {
            return false;
        }
        
        return this.renderTile();
    },
    
    /**
     * Method: renderTile
     * Internal function to actually initialize the image tile,
     *     position it correctly, and set its url.
     */
    renderTile: function() {
        this.initDiv();

        return true;
    },

    /** 
     * Method: clear
     *  Clear the tile of any bounds/position-related data so that it can 
     *   be reused in a new location.
     */
    clear: function() {
        if(this.div) {
            this.hide();
        }
    },

    /**
     * Method: initDiv
     */
    initDiv: function() {
        this.layer.div.appendChild(this.div); 
        var size = this.layer.getImageSize(this.bounds); 
        size = new OpenLayers.Size(size.w - 2, size.h - 2);
        OpenLayers.Util.modifyDOMElement(this.div, 
                                      null, this.position, size);   
        var events = new OpenLayers.Events(this, this.div);
        events.on({
            'mouseover': this.onMouseOver,
            'mouseout': this.onMouseOut,
            'click': this.onClick
        });
    },

    /**
     * Method: removeDiv
     */
    removeDiv: function() {
        this.layer.div.removeChild(this.div);
        this.div = null;
    },

    /**
     * APIMethod: markAsInvalid
     */
    markAsInvalid: function() {
        OpenLayers.Element.removeClass(this.div, 'valid');
    },

    /**
     * APIMethod: markAsValid
     */
    markAsValid: function() {
        OpenLayers.Element.addClass(this.div, 'valid');
    },

    /**
     * APIMethod: setAttributes
     * Set the tags and attributes properties and changes the className of the div
     */
    setAttributes: function(attributes) {
        this.tags = attributes.tags;
        this.attributes = attributes;
        if (this.tags.length) {
            OpenLayers.Element.addClass(this.div, 'hasTags');
        }
    },

    /**
     * APIMethod: addTag
     *
     * Parameters:
     * tag {String]
     */
    addTag: function(tag) {
        this.tags.push(tag);
        OpenLayers.Element.addClass(this.div, 'hasTags');
    },

    /**
     * APIMethod: removeTag
     *
     * Parameters:
     * tag {String]
     */
    removeTag: function(tag) {
        OpenLayers.Util.removeItem(this.tags, tag);
        if (this.tags.length === 0) {
            OpenLayers.Element.removeClass(this.div, 'hasTags');
        }
    },

    /**
     * Method: onMouseOver
     */
    onMouseOver: function(event) {
        OpenLayers.Element.addClass(this.div, 'hover');
    },

    /**
     * Method: onMouseOut
     */
    onMouseOut: function(event) {
        OpenLayers.Element.removeClass(this.div, 'hover');
    },

    /**
     * Method: onClick
     */
    onClick: function(event) {
        if (!event.ctrlKey) {
            this.layer.unselectAll();
            this.select();
        } else {
            this.toggleSelect();
        }
    },

    /**
     * APIMethod: select
     */
    select: function(silent) {
        if (!silent) {
            this.events.triggerEvent("select");
        }
        OpenLayers.Element.addClass(this.div, 'selected');
    },

    /**
     * APIMethod: unselect
     */
    unselect: function(silent) {
        if (!silent) {
            this.events.triggerEvent("unselect");
        }
        OpenLayers.Element.removeClass(this.div, 'selected');
    },

    /**
     * APIMethod: toggleSelect
     */
    toggleSelect: function() {
        if (this.div.className.indexOf("selected") != -1) {
            this.events.triggerEvent("unselect");
            OpenLayers.Element.removeClass(this.div, 'selected');
        } else {
            this.events.triggerEvent("select");
            OpenLayers.Element.addClass(this.div, 'selected');
        }
    },
    
    CLASS_NAME: "OpenLayers.Tile.Div"
  }
);
