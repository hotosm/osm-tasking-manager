/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright 2005-2011 OpenLayers Contributors, released under the FreeBSD
  license. Please see http://svn.openlayers.org/trunk/openlayers/license.txt
  for the full text of the license.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used please see the
  OpenLayers SVN repository: <http://openlayers.org/>)

*/

/* Contains portions of Prototype.js:
 *
 * Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
 *--------------------------------------------------------------------------*/

/**  
*  
*  Contains portions of Rico <http://openrico.org/>
* 
*  Copyright 2005 Sabre Airline Solutions  
*  
*  Licensed under the Apache License, Version 2.0 (the "License"); you
*  may not use this file except in compliance with the License. You
*  may obtain a copy of the License at
*  
*         http://www.apache.org/licenses/LICENSE-2.0  
*  
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
*  implied. See the License for the specific language governing
*  permissions and limitations under the License. 
*
**/

/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Contains portions of Gears <http://code.google.com/apis/gears/>
 *
 * Copyright 2007, Google Inc.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *  3. Neither the name of Google Inc. nor the names of its contributors may be
 *     used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Sets up google.gears.*, which is *the only* supported way to access Gears.
 *
 * Circumvent this file at your own risk!
 *
 * In the future, Gears may automatically define google.gears.* without this
 * file. Gears may use these objects to transparently fix bugs and compatibility
 * issues. Applications that use the code below will continue to work seamlessly
 * when that happens.
 */

/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 * 
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 *//* ======================================================================
    OpenLayers/SingleFile.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

var OpenLayers = {
    /**
     * Constant: VERSION_NUMBER
     */
    VERSION_NUMBER: "Release 2.11",

    /**
     * Constant: singleFile
     * TODO: remove this in 3.0 when we stop supporting build profiles that
     * include OpenLayers.js
     */
    singleFile: true,

    /**
     * Method: _getScriptLocation
     * Return the path to this script. This is also implemented in
     * OpenLayers.js
     *
     * Returns:
     * {String} Path to this script
     */
    _getScriptLocation: (function() {
        var r = new RegExp("(^|(.*?\\/))(OpenLayers\.js)(\\?|$)"),
            s = document.getElementsByTagName('script'),
            src, m, l = "";
        for(var i=0, len=s.length; i<len; i++) {
            src = s[i].getAttribute('src');
            if(src) {
                var m = src.match(r);
                if(m) {
                    l = m[1];
                    break;
                }
            }
        }
        return (function() { return l; });
    })()
};
/* ======================================================================
    OpenLayers/BaseTypes/Class.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/SingleFile.js
 */

/**
 * Constructor: OpenLayers.Class
 * Base class used to construct all other classes. Includes support for 
 *     multiple inheritance. 
 *     
 * This constructor is new in OpenLayers 2.5.  At OpenLayers 3.0, the old 
 *     syntax for creating classes and dealing with inheritance 
 *     will be removed.
 * 
 * To create a new OpenLayers-style class, use the following syntax:
 * (code)
 *     var MyClass = OpenLayers.Class(prototype);
 * (end)
 *
 * To create a new OpenLayers-style class with multiple inheritance, use the
 *     following syntax:
 * (code)
 *     var MyClass = OpenLayers.Class(Class1, Class2, prototype);
 * (end)
 * 
 * Note that instanceof reflection will only reveal Class1 as superclass.
 *
 */
OpenLayers.Class = function() {
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len-1];

    var C = typeof F.initialize == "function" ?
        F.initialize :
        function(){ P.prototype.initialize.apply(this, arguments); };

    if (len > 1) {
        var newArgs = [C, P].concat(
                Array.prototype.slice.call(arguments).slice(1, len-1), F);
        OpenLayers.inherit.apply(null, newArgs);
    } else {
        C.prototype = F;
    }
    return C;
};

/**
 * Property: isPrototype
 * *Deprecated*.  This is no longer needed and will be removed at 3.0.
 */
OpenLayers.Class.isPrototype = function () {};

/**
 * APIFunction: OpenLayers.create
 * *Deprecated*.  Old method to create an OpenLayers style class.  Use the
 *     <OpenLayers.Class> constructor instead.
 *
 * Returns:
 * An OpenLayers class
 */
OpenLayers.Class.create = function() {
    return function() {
        if (arguments && arguments[0] != OpenLayers.Class.isPrototype) {
            this.initialize.apply(this, arguments);
        }
    };
};

/**
 * APIFunction: inherit
 * *Deprecated*.  Old method to inherit from one or more OpenLayers style
 *     classes.  Use the <OpenLayers.Class> constructor instead.
 *
 * Parameters:
 * class - One or more classes can be provided as arguments
 *
 * Returns:
 * An object prototype
 */
OpenLayers.Class.inherit = function (P) {
    var C = function() {
       P.call(this);
    };
    var newArgs = [C].concat(Array.prototype.slice.call(arguments));
    OpenLayers.inherit.apply(null, newArgs);
    return C.prototype;
};

/**
 * Function: OpenLayers.inherit
 *
 * Parameters:
 * C - {Object} the class that inherits
 * P - {Object} the superclass to inherit from
 *
 * In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 */
OpenLayers.inherit = function(C, P) {
   var F = function() {};
   F.prototype = P.prototype;
   C.prototype = new F;
   var i, l, o;
   for(i=2, l=arguments.length; i<l; i++) {
       o = arguments[i];
       if(typeof o === "function") {
           o = o.prototype;
       }
       OpenLayers.Util.extend(C.prototype, o);
   }
};

/**
 * APIFunction: extend
 * Copy all properties of a source object to a destination object.  Modifies
 *     the passed in destination object.  Any properties on the source object
 *     that are set to undefined will not be (re)set on the destination object.
 *
 * Parameters:
 * destination - {Object} The object that will be modified
 * source - {Object} The object with properties to be set on the destination
 *
 * Returns:
 * {Object} The destination object.
 */
OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event == "function"
                          && source instanceof window.Event;

        if (!sourceIsEvt
           && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
/* ======================================================================
    OpenLayers/Console.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 */

/**
 * Namespace: OpenLayers.Console
 * The OpenLayers.Console namespace is used for debugging and error logging.
 * If the Firebug Lite (../Firebug/firebug.js) is included before this script,
 * calls to OpenLayers.Console methods will get redirected to window.console.
 * This makes use of the Firebug extension where available and allows for
 * cross-browser debugging Firebug style.
 *
 * Note:
 * Note that behavior will differ with the Firebug extention and Firebug Lite.
 * Most notably, the Firebug Lite console does not currently allow for
 * hyperlinks to code or for clicking on object to explore their properties.
 * 
 */
OpenLayers.Console = {
    /**
     * Create empty functions for all console methods.  The real value of these
     * properties will be set if Firebug Lite (../Firebug/firebug.js script) is
     * included.  We explicitly require the Firebug Lite script to trigger
     * functionality of the OpenLayers.Console methods.
     */
    
    /**
     * APIFunction: log
     * Log an object in the console.  The Firebug Lite console logs string
     * representation of objects.  Given multiple arguments, they will
     * be cast to strings and logged with a space delimiter.  If the first
     * argument is a string with printf-like formatting, subsequent arguments
     * will be used in string substitution.  Any additional arguments (beyond
     * the number substituted in a format string) will be appended in a space-
     * delimited line.
     * 
     * Parameters:
     * object - {Object}
     */
    log: function() {},

    /**
     * APIFunction: debug
     * Writes a message to the console, including a hyperlink to the line
     * where it was called.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    debug: function() {},

    /**
     * APIFunction: info
     * Writes a message to the console with the visual "info" icon and color
     * coding and a hyperlink to the line where it was called.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    info: function() {},

    /**
     * APIFunction: warn
     * Writes a message to the console with the visual "warning" icon and
     * color coding and a hyperlink to the line where it was called.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    warn: function() {},

    /**
     * APIFunction: error
     * Writes a message to the console with the visual "error" icon and color
     * coding and a hyperlink to the line where it was called.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    error: function() {},
    
    /**
     * APIFunction: userError
     * A single interface for showing error messages to the user. The default
     * behavior is a Javascript alert, though this can be overridden by
     * reassigning OpenLayers.Console.userError to a different function.
     *
     * Expects a single error message
     * 
     * Parameters:
     * error - {Object}
     */
    userError: function(error) {
        alert(error);
    },

    /**
     * APIFunction: assert
     * Tests that an expression is true. If not, it will write a message to
     * the console and throw an exception.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    assert: function() {},

    /**
     * APIFunction: dir
     * Prints an interactive listing of all properties of the object. This
     * looks identical to the view that you would see in the DOM tab.
     * 
     * Parameters:
     * object - {Object}
     */
    dir: function() {},

    /**
     * APIFunction: dirxml
     * Prints the XML source tree of an HTML or XML element. This looks
     * identical to the view that you would see in the HTML tab. You can click
     * on any node to inspect it in the HTML tab.
     * 
     * Parameters:
     * object - {Object}
     */
    dirxml: function() {},

    /**
     * APIFunction: trace
     * Prints an interactive stack trace of JavaScript execution at the point
     * where it is called.  The stack trace details the functions on the stack,
     * as well as the values that were passed as arguments to each function.
     * You can click each function to take you to its source in the Script tab,
     * and click each argument value to inspect it in the DOM or HTML tabs.
     * 
     */
    trace: function() {},

    /**
     * APIFunction: group
     * Writes a message to the console and opens a nested block to indent all
     * future messages sent to the console. Call OpenLayers.Console.groupEnd()
     * to close the block.
     *
     * May be called with multiple arguments as with OpenLayers.Console.log().
     * 
     * Parameters:
     * object - {Object}
     */
    group: function() {},

    /**
     * APIFunction: groupEnd
     * Closes the most recently opened block created by a call to
     * OpenLayers.Console.group
     */
    groupEnd: function() {},
    
    /**
     * APIFunction: time
     * Creates a new timer under the given name. Call
     * OpenLayers.Console.timeEnd(name)
     * with the same name to stop the timer and print the time elapsed.
     *
     * Parameters:
     * name - {String}
     */
    time: function() {},

    /**
     * APIFunction: timeEnd
     * Stops a timer created by a call to OpenLayers.Console.time(name) and
     * writes the time elapsed.
     *
     * Parameters:
     * name - {String}
     */
    timeEnd: function() {},

    /**
     * APIFunction: profile
     * Turns on the JavaScript profiler. The optional argument title would
     * contain the text to be printed in the header of the profile report.
     *
     * This function is not currently implemented in Firebug Lite.
     * 
     * Parameters:
     * title - {String} Optional title for the profiler
     */
    profile: function() {},

    /**
     * APIFunction: profileEnd
     * Turns off the JavaScript profiler and prints its report.
     * 
     * This function is not currently implemented in Firebug Lite.
     */
    profileEnd: function() {},

    /**
     * APIFunction: count
     * Writes the number of times that the line of code where count was called
     * was executed. The optional argument title will print a message in
     * addition to the number of the count.
     *
     * This function is not currently implemented in Firebug Lite.
     *
     * Parameters:
     * title - {String} Optional title to be printed with count
     */
    count: function() {},

    CLASS_NAME: "OpenLayers.Console"
};

/**
 * Execute an anonymous function to extend the OpenLayers.Console namespace
 * if the firebug.js script is included.  This closure is used so that the
 * "scripts" and "i" variables don't pollute the global namespace.
 */
(function() {
    /**
     * If Firebug Lite is included (before this script), re-route all
     * OpenLayers.Console calls to the console object.
     */
    var scripts = document.getElementsByTagName("script");
    for(var i=0, len=scripts.length; i<len; ++i) {
        if(scripts[i].src.indexOf("firebug.js") != -1) {
            if(console) {
                OpenLayers.Util.extend(OpenLayers.Console, console);
                break;
            }
        }
    }
})();
/* ======================================================================
    OpenLayers/Tween.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 */

/**
 * Namespace: OpenLayers.Tween
 */
OpenLayers.Tween = OpenLayers.Class({
    
    /**
     * Constant: INTERVAL
     * {int} Interval in milliseconds between 2 steps
     */
    INTERVAL: 10,
    
    /**
     * APIProperty: easing
     * {<OpenLayers.Easing>(Function)} Easing equation used for the animation
     *     Defaultly set to OpenLayers.Easing.Expo.easeOut
     */
    easing: null,
    
    /**
     * APIProperty: begin
     * {Object} Values to start the animation with
     */
    begin: null,
    
    /**
     * APIProperty: finish
     * {Object} Values to finish the animation with
     */
    finish: null,
    
    /**
     * APIProperty: duration
     * {int} duration of the tween (number of steps)
     */
    duration: null,
    
    /**
     * APIProperty: callbacks
     * {Object} An object with start, eachStep and done properties whose values
     *     are functions to be call during the animation. They are passed the
     *     current computed value as argument.
     */
    callbacks: null,
    
    /**
     * Property: time
     * {int} Step counter
     */
    time: null,
    
    /**
     * Property: interval
     * {int} Interval id returned by window.setInterval
     */
    interval: null,
    
    /**
     * Property: playing
     * {Boolean} Tells if the easing is currently playing
     */
    playing: false,
    
    /** 
     * Constructor: OpenLayers.Tween
     * Creates a Tween.
     *
     * Parameters:
     * easing - {<OpenLayers.Easing>(Function)} easing function method to use
     */ 
    initialize: function(easing) {
        this.easing = (easing) ? easing : OpenLayers.Easing.Expo.easeOut;
    },
    
    /**
     * APIMethod: start
     * Plays the Tween, and calls the callback method on each step
     * 
     * Parameters:
     * begin - {Object} values to start the animation with
     * finish - {Object} values to finish the animation with
     * duration - {int} duration of the tween (number of steps)
     * options - {Object} hash of options (for example callbacks (start, eachStep, done))
     */
    start: function(begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.interval = window.setInterval(
            OpenLayers.Function.bind(this.play, this), this.INTERVAL);
    },
    
    /**
     * APIMethod: stop
     * Stops the Tween, and calls the done callback
     *     Doesn't do anything if animation is already finished
     */
    stop: function() {
        if (!this.playing) {
            return;
        }
        
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        window.clearInterval(this.interval);
        this.interval = null;
        this.playing = false;
    },
    
    /**
     * Method: play
     * Calls the appropriate easing method
     */
    play: function() {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                OpenLayers.Console.error('invalid value for Tween');
            }
            
            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        
        if (this.time > this.duration) {
            this.stop();
        }
    },
    
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "OpenLayers.Tween"
});

/**
 * Namespace: OpenLayers.Easing
 * 
 * Credits:
 *      Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>
 */
OpenLayers.Easing = {
    /**
     * Create empty functions for all easing methods.
     */
    CLASS_NAME: "OpenLayers.Easing"
};

/**
 * Namespace: OpenLayers.Easing.Linear
 */
OpenLayers.Easing.Linear = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return c*t/d + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        return c*t/d + b;
    },

    CLASS_NAME: "OpenLayers.Easing.Linear"
};

/**
 * Namespace: OpenLayers.Easing.Expo
 */
OpenLayers.Easing.Expo = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },

    CLASS_NAME: "OpenLayers.Easing.Expo"
};

/**
 * Namespace: OpenLayers.Easing.Quad
 */
OpenLayers.Easing.Quad = {
    
    /**
     * Function: easeIn
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeIn: function(t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    
    /**
     * Function: easeOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeOut: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    
    /**
     * Function: easeInOut
     * 
     * Parameters:
     * t - {Float} time
     * b - {Float} beginning position
     * c - {Float} total change
     * d - {Float} duration of the transition
     */
    easeInOut: function(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    CLASS_NAME: "OpenLayers.Easing.Quad"
};
/* ======================================================================
    OpenLayers/Lang.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Console.js
 */

/**
 * Namespace: OpenLayers.Lang
 * Internationalization namespace.  Contains dictionaries in various languages
 *     and methods to set and get the current language.
 */
OpenLayers.Lang = {
    
    /** 
     * Property: code
     * {String}  Current language code to use in OpenLayers.  Use the
     *     <setCode> method to set this value and the <getCode> method to
     *     retrieve it.
     */
    code: null,

    /** 
     * APIProperty: defaultCode
     * {String} Default language to use when a specific language can't be
     *     found.  Default is "en".
     */
    defaultCode: "en",
        
    /**
     * APIFunction: getCode
     * Get the current language code.
     *
     * Returns:
     * The current language code.
     */
    getCode: function() {
        if(!OpenLayers.Lang.code) {
            OpenLayers.Lang.setCode();
        }
        return OpenLayers.Lang.code;
    },
    
    /**
     * APIFunction: setCode
     * Set the language code for string translation.  This code is used by
     *     the <OpenLayers.Lang.translate> method.
     *
     * Parameters-
     * code - {String} These codes follow the IETF recommendations at
     *     http://www.ietf.org/rfc/rfc3066.txt.  If no value is set, the
     *     browser's language setting will be tested.  If no <OpenLayers.Lang>
     *     dictionary exists for the code, the <OpenLayers.String.defaultLang>
     *     will be used.
     */
    setCode: function(code) {
        var lang;
        if(!code) {
            code = (OpenLayers.BROWSER_NAME == "msie") ?
                navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if(typeof OpenLayers.Lang[parts[0]] == "object") {
            lang = parts[0];
        }

        // check for regional extensions
        if(parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if(typeof OpenLayers.Lang[testLang] == "object") {
                lang = testLang;
            }
        }
        if(!lang) {
            OpenLayers.Console.warn(
                'Failed to find OpenLayers.Lang.' + parts.join("-") +
                ' dictionary, falling back to default language'
            );
            lang = OpenLayers.Lang.defaultCode;
        }
        
        OpenLayers.Lang.code = lang;
    },

    /**
     * APIMethod: translate
     * Looks up a key from a dictionary based on the current language string.
     *     The value of <getCode> will be used to determine the appropriate
     *     dictionary.  Dictionaries are stored in <OpenLayers.Lang>.
     *
     * Parameters:
     * key - {String} The key for an i18n string value in the dictionary.
     * context - {Object} Optional context to be used with
     *     <OpenLayers.String.format>.
     * 
     * Returns:
     * {String} A internationalized string.
     */
    translate: function(key, context) {
        var dictionary = OpenLayers.Lang[OpenLayers.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if(!message) {
            // Message not found, fall back to message key
            message = key;
        }
        if(context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    }
    
};


/**
 * APIMethod: OpenLayers.i18n
 * Alias for <OpenLayers.Lang.translate>.  Looks up a key from a dictionary
 *     based on the current language string. The value of
 *     <OpenLayers.Lang.getCode> will be used to determine the appropriate
 *     dictionary.  Dictionaries are stored in <OpenLayers.Lang>.
 *
 * Parameters:
 * key - {String} The key for an i18n string value in the dictionary.
 * context - {Object} Optional context to be used with
 *     <OpenLayers.String.format>.
 * 
 * Returns:
 * {String} A internationalized string.
 */
OpenLayers.i18n = OpenLayers.Lang.translate;
/* ======================================================================
    OpenLayers/BaseTypes.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Lang.js
 * @requires OpenLayers/Console.js
 */
 
/** 
 * Header: OpenLayers Base Types
 * OpenLayers custom string, number and function functions are described here.
 */

/**
 * Namespace: OpenLayers.String
 * Contains convenience functions for string manipulation.
 */
OpenLayers.String = {

    /**
     * APIFunction: startsWith
     * Test whether a string starts with another string. 
     * 
     * Parameters:
     * str - {String} The string to test.
     * sub - {String} The substring to look for.
     *  
     * Returns:
     * {Boolean} The first string starts with the second.
     */
    startsWith: function(str, sub) {
        return (str.indexOf(sub) == 0);
    },

    /**
     * APIFunction: contains
     * Test whether a string contains another string.
     * 
     * Parameters:
     * str - {String} The string to test.
     * sub - {String} The substring to look for.
     * 
     * Returns:
     * {Boolean} The first string contains the second.
     */
    contains: function(str, sub) {
        return (str.indexOf(sub) != -1);
    },
    
    /**
     * APIFunction: trim
     * Removes leading and trailing whitespace characters from a string.
     * 
     * Parameters:
     * str - {String} The (potentially) space padded string.  This string is not
     *     modified.
     * 
     * Returns:
     * {String} A trimmed version of the string with all leading and 
     *     trailing spaces removed.
     */
    trim: function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    
    /**
     * APIFunction: camelize
     * Camel-case a hyphenated string. 
     *     Ex. "chicken-head" becomes "chickenHead", and
     *     "-chicken-head" becomes "ChickenHead".
     *
     * Parameters:
     * str - {String} The string to be camelized.  The original is not modified.
     * 
     * Returns:
     * {String} The string, camelized
     */
    camelize: function(str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i=1, len=oStringList.length; i<len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    
    /**
     * APIFunction: format
     * Given a string with tokens in the form ${token}, return a string
     *     with tokens replaced with properties from the given context
     *     object.  Represent a literal "${" by doubling it, e.g. "${${".
     *
     * Parameters:
     * template - {String} A string with tokens to be replaced.  A template
     *     has the form "literal ${token}" where the token will be replaced
     *     by the value of context["token"].
     * context - {Object} An optional object with properties corresponding
     *     to the tokens in the format string.  If no context is sent, the
     *     window object will be used.
     * args - {Array} Optional arguments to pass to any functions found in
     *     the context.  If a context property is a function, the token
     *     will be replaced by the return from the function called with
     *     these arguments.
     *
     * Returns:
     * {String} A string with tokens replaced from the context object.
     */
    format: function(template, context, args) {
        if(!context) {
            context = window;
        }

        // Example matching: 
        // str   = ${foo.bar}
        // match = foo.bar
        var replacer = function(str, match) {
            var replacement;

            // Loop through all subs. Example: ${a.b.c}
            // 0 -> replacement = context[a];
            // 1 -> replacement = context[a][b];
            // 2 -> replacement = context[a][b][c];
            var subs = match.split(/\.+/);
            for (var i=0; i< subs.length; i++) {
                if (i == 0) {
                    replacement = context;
                }

                replacement = replacement[subs[i]];
            }

            if(typeof replacement == "function") {
                replacement = args ?
                    replacement.apply(null, args) :
                    replacement();
            }

            // If replacement is undefined, return the string 'undefined'.
            // This is a workaround for a bugs in browsers not properly 
            // dealing with non-participating groups in regular expressions:
            // http://blog.stevenlevithan.com/archives/npcg-javascript
            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement; 
            }
        };

        return template.replace(OpenLayers.String.tokenRegEx, replacer);
    },

    /**
     * Property: tokenRegEx
     * Used to find tokens in a string.
     * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
     */
    tokenRegEx:  /\$\{([\w.]+?)\}/g,
    
    /**
     * Property: numberRegEx
     * Used to test strings as numbers.
     */
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    
    /**
     * APIFunction: isNumeric
     * Determine whether a string contains only a numeric value.
     *
     * Examples:
     * (code)
     * OpenLayers.String.isNumeric("6.02e23") // true
     * OpenLayers.String.isNumeric("12 dozen") // false
     * OpenLayers.String.isNumeric("4") // true
     * OpenLayers.String.isNumeric(" 4 ") // false
     * (end)
     *
     * Returns:
     * {Boolean} String contains only a number.
     */
    isNumeric: function(value) {
        return OpenLayers.String.numberRegEx.test(value);
    },
    
    /**
     * APIFunction: numericIf
     * Converts a string that appears to be a numeric value into a number.
     * 
     * Returns
     * {Number|String} a Number if the passed value is a number, a String
     *     otherwise. 
     */
    numericIf: function(value) {
        return OpenLayers.String.isNumeric(value) ? parseFloat(value) : value;
    }

};

if (!String.prototype.startsWith) {
    /**
     * APIMethod: String.startsWith
     * *Deprecated*. Whether or not a string starts with another string. 
     * 
     * Parameters:
     * sStart - {String} The string we're testing for.
     *  
     * Returns:
     * {Boolean} Whether or not this string starts with the string passed in.
     */
    String.prototype.startsWith = function(sStart) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                                {'newMethod':'OpenLayers.String.startsWith'}));
        return OpenLayers.String.startsWith(this, sStart);
    };
}

if (!String.prototype.contains) {
    /**
     * APIMethod: String.contains
     * *Deprecated*. Whether or not a string contains another string.
     * 
     * Parameters:
     * str - {String} The string that we're testing for.
     * 
     * Returns:
     * {Boolean} Whether or not this string contains with the string passed in.
     */
    String.prototype.contains = function(str) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                                  {'newMethod':'OpenLayers.String.contains'}));
        return OpenLayers.String.contains(this, str);
    };
}

if (!String.prototype.trim) {
    /**
     * APIMethod: String.trim
     * *Deprecated*. Removes leading and trailing whitespace characters from a string.
     * 
     * Returns:
     * {String} A trimmed version of the string - all leading and 
     *          trailing spaces removed
     */
    String.prototype.trim = function() {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                                      {'newMethod':'OpenLayers.String.trim'}));
        return OpenLayers.String.trim(this);
    };
}

if (!String.prototype.camelize) {
    /**
     * APIMethod: String.camelize
     * *Deprecated*. Camel-case a hyphenated string. 
     *     Ex. "chicken-head" becomes "chickenHead", and
     *     "-chicken-head" becomes "ChickenHead".
     * 
     * Returns:
     * {String} The string, camelized
     */
    String.prototype.camelize = function() {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                                  {'newMethod':'OpenLayers.String.camelize'}));
        return OpenLayers.String.camelize(this);
    };
}

/**
 * Namespace: OpenLayers.Number
 * Contains convenience functions for manipulating numbers.
 */
OpenLayers.Number = {

    /**
     * Property: decimalSeparator
     * Decimal separator to use when formatting numbers.
     */
    decimalSeparator: ".",
    
    /**
     * Property: thousandsSeparator
     * Thousands separator to use when formatting numbers.
     */
    thousandsSeparator: ",",
    
    /**
     * APIFunction: limitSigDigs
     * Limit the number of significant digits on a float.
     * 
     * Parameters:
     * num - {Float}
     * sig - {Integer}
     * 
     * Returns:
     * {Float} The number, rounded to the specified number of significant
     *     digits.
     */
    limitSigDigs: function(num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },
    
    /**
     * APIFunction: format
     * Formats a number for output.
     * 
     * Parameters:
     * num  - {Float}
     * dec  - {Integer} Number of decimal places to round to.
     *        Defaults to 0. Set to null to leave decimal places unchanged.
     * tsep - {String} Thousands separator.
     *        Default is ",".
     * dsep - {String} Decimal separator.
     *        Default is ".".
     *
     * Returns:
     * {String} A string representing the formatted number.
     */
    format: function(num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0; 
        tsep = (typeof tsep != "undefined") ? tsep :
            OpenLayers.Number.thousandsSeparator; 
        dsep = (typeof dsep != "undefined") ? dsep :
            OpenLayers.Number.decimalSeparator;

        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }

        var parts = num.toString().split(".");
        if (parts.length == 1 && dec == null) {
            // integer where we do not want to touch the decimals
            dec = 0;
        }
        
        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/; 
            while(thousands.test(integer)) { 
                integer = integer.replace(thousands, "$1" + tsep + "$2"); 
            }
        }
        
        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};

if (!Number.prototype.limitSigDigs) {
    /**
     * APIMethod: Number.limitSigDigs
     * *Deprecated*. Limit the number of significant digits on an integer. Does *not*
     *     work with floats!
     * 
     * Parameters:
     * sig - {Integer}
     * 
     * Returns:
     * {Integer} The number, rounded to the specified number of significant digits.
     *           If null, 0, or negative value passed in, returns 0
     */
    Number.prototype.limitSigDigs = function(sig) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                              {'newMethod':'OpenLayers.Number.limitSigDigs'}));
        return OpenLayers.Number.limitSigDigs(this, sig);
    };
}

/**
 * Namespace: OpenLayers.Function
 * Contains convenience functions for function manipulation.
 */
OpenLayers.Function = {
    /**
     * APIFunction: bind
     * Bind a function to an object.  Method to easily create closures with
     *     'this' altered.
     * 
     * Parameters:
     * func - {Function} Input function.
     * object - {Object} The object to bind to the input function (as this).
     * 
     * Returns:
     * {Function} A closure with 'this' set to the passed in object.
     */
    bind: function(func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function() {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
            return func.apply(object, newArgs);
        };
    },
    
    /**
     * APIFunction: bindAsEventListener
     * Bind a function to an object, and configure it to receive the event
     *     object as first parameter when called. 
     * 
     * Parameters:
     * func - {Function} Input function to serve as an event listener.
     * object - {Object} A reference to this.
     * 
     * Returns:
     * {Function}
     */
    bindAsEventListener: function(func, object) {
        return function(event) {
            return func.call(object, event || window.event);
        };
    },
    
    /**
     * APIFunction: False
     * A simple function to that just does "return false". We use this to 
     * avoid attaching anonymous functions to DOM event handlers, which 
     * causes "issues" on IE<8.
     * 
     * Usage:
     * document.onclick = OpenLayers.Function.False;
     * 
     * Returns:
     * {Boolean}
     */
    False : function() {
        return false;
    },

    /**
     * APIFunction: True
     * A simple function to that just does "return true". We use this to 
     * avoid attaching anonymous functions to DOM event handlers, which 
     * causes "issues" on IE<8.
     * 
     * Usage:
     * document.onclick = OpenLayers.Function.True;
     * 
     * Returns:
     * {Boolean}
     */
    True : function() {
        return true;
    },
    
    /**
     * APIFunction: Void
     * A reusable function that returns ``undefined``.
     *
     * Returns:
     * {undefined}
     */
    Void: function() {}

};

if (!Function.prototype.bind) {
    /**
     * APIMethod: Function.bind
     * *Deprecated*. Bind a function to an object. 
     * Method to easily create closures with 'this' altered.
     * 
     * Parameters:
     * object - {Object} the this parameter
     * 
     * Returns:
     * {Function} A closure with 'this' altered to the first
     *            argument.
     */
    Function.prototype.bind = function() {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                                {'newMethod':'OpenLayers.Function.bind'}));
        // new function takes the same arguments with this function up front
        Array.prototype.unshift.apply(arguments, [this]);
        return OpenLayers.Function.bind.apply(null, arguments);
    };
}

if (!Function.prototype.bindAsEventListener) {
    /**
     * APIMethod: Function.bindAsEventListener
     * *Deprecated*. Bind a function to an object, and configure it to receive the
     *     event object as first parameter when called. 
     * 
     * Parameters:
     * object - {Object} A reference to this.
     * 
     * Returns:
     * {Function}
     */
    Function.prototype.bindAsEventListener = function(object) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated",
                        {'newMethod':'OpenLayers.Function.bindAsEventListener'}));
        return OpenLayers.Function.bindAsEventListener(this, object);
    };
}

/**
 * Namespace: OpenLayers.Array
 * Contains convenience functions for array manipulation.
 */
OpenLayers.Array = {

    /**
     * APIMethod: filter
     * Filter an array.  Provides the functionality of the
     *     Array.prototype.filter extension to the ECMA-262 standard.  Where
     *     available, Array.prototype.filter will be used.
     *
     * Based on well known example from http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter
     *
     * Parameters:
     * array - {Array} The array to be filtered.  This array is not mutated.
     *     Elements added to this array by the callback will not be visited.
     * callback - {Function} A function that is called for each element in
     *     the array.  If this function returns true, the element will be
     *     included in the return.  The function will be called with three
     *     arguments: the element in the array, the index of that element, and
     *     the array itself.  If the optional caller parameter is specified
     *     the callback will be called with this set to caller.
     * caller - {Object} Optional object to be set as this when the callback
     *     is called.
     *
     * Returns:
     * {Array} An array of elements from the passed in array for which the
     *     callback returns true.
     */
    filter: function(array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for(var i=0; i<len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }        
        }
        return selected;
    }
    
};
/* ======================================================================
    OpenLayers/BaseTypes/Bounds.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/**
 * Class: OpenLayers.Bounds
 * Instances of this class represent bounding boxes.  Data stored as left,
 * bottom, right, top floats. All values are initialized to null, however,
 * you should make sure you set them before using the bounds for anything.
 * 
 * Possible use case:
 * (code)
 *     bounds = new OpenLayers.Bounds();
 *     bounds.extend(new OpenLayers.LonLat(4,5));
 *     bounds.extend(new OpenLayers.LonLat(5,6));
 *     bounds.toBBOX(); // returns 4,5,5,6
 * (end)
 */
OpenLayers.Bounds = OpenLayers.Class({

    /**
     * Property: left
     * {Number} Minimum horizontal coordinate.
     */
    left: null,

    /**
     * Property: bottom
     * {Number} Minimum vertical coordinate.
     */
    bottom: null,

    /**
     * Property: right
     * {Number} Maximum horizontal coordinate.
     */
    right: null,

    /**
     * Property: top
     * {Number} Maximum vertical coordinate.
     */
    top: null,
    
    /**
     * Property: centerLonLat
     * {<OpenLayers.LonLat>} A cached center location.  This should not be
     *     accessed directly.  Use <getCenterLonLat> instead.
     */
    centerLonLat: null,

    /**
     * Constructor: OpenLayers.Bounds
     * Construct a new bounds object.
     *
     * Parameters:
     * left - {Number} The left bounds of the box.  Note that for width
     *        calculations, this is assumed to be less than the right value.
     * bottom - {Number} The bottom bounds of the box.  Note that for height
     *          calculations, this is assumed to be more than the top value.
     * right - {Number} The right bounds.
     * top - {Number} The top bounds.
     */
    initialize: function(left, bottom, right, top) {
        if (left != null) {
            this.left = OpenLayers.Util.toFloat(left);
        }
        if (bottom != null) {
            this.bottom = OpenLayers.Util.toFloat(bottom);
        }
        if (right != null) {
            this.right = OpenLayers.Util.toFloat(right);
        }
        if (top != null) {
            this.top = OpenLayers.Util.toFloat(top);
        }
    },

    /**
     * Method: clone
     * Create a cloned instance of this bounds.
     *
     * Returns:
     * {<OpenLayers.Bounds>} A fresh copy of the bounds
     */
    clone:function() {
        return new OpenLayers.Bounds(this.left, this.bottom, 
                                     this.right, this.top);
    },

    /**
     * Method: equals
     * Test a two bounds for equivalence.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {Boolean} The passed-in bounds object has the same left,
     *           right, top, bottom components as this.  Note that if bounds 
     *           passed in is null, returns false.
     */
    equals:function(bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && 
                      (this.right == bounds.right) &&
                      (this.top == bounds.top) && 
                      (this.bottom == bounds.bottom));
        }
        return equals;
    },

    /** 
     * APIMethod: toString
     * 
     * Returns:
     * {String} String representation of bounds object. 
     */
    toString:function() {
        return [this.left, this.bottom, this.right, this.top].join(",");
    },

    /**
     * APIMethod: toArray
     *
     * Parameters:
     * reverseAxisOrder - {Boolean} Should we reverse the axis order?
     *
     * Returns:
     * {Array} array of left, bottom, right, top
     */
    toArray: function(reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right];
        } else {
            return [this.left, this.bottom, this.right, this.top];
        }
    },    

    /** 
     * APIMethod: toBBOX
     * 
     * Parameters:
     * decimal - {Integer} How many significant digits in the bbox coords?
     *                     Default is 6
     * reverseAxisOrder - {Boolean} Should we reverse the axis order?
     * 
     * Returns:
     * {String} Simple String representation of bounds object.
     *          (e.g. <i>"5,42,10,45"</i>)
     */
    toBBOX:function(decimal, reverseAxisOrder) {
        if (decimal== null) {
            decimal = 6; 
        }
        var mult = Math.pow(10, decimal);
        var xmin = Math.round(this.left * mult) / mult;
        var ymin = Math.round(this.bottom * mult) / mult;
        var xmax = Math.round(this.right * mult) / mult;
        var ymax = Math.round(this.top * mult) / mult;
        if (reverseAxisOrder === true) {
            return ymin + "," + xmin + "," + ymax + "," + xmax;
        } else {
            return xmin + "," + ymin + "," + xmax + "," + ymax;
        }
    },
 
    /**
     * APIMethod: toGeometry
     * Create a new polygon geometry based on this bounds.
     *
     * Returns:
     * {<OpenLayers.Geometry.Polygon>} A new polygon with the coordinates
     *     of this bounds.
     */
    toGeometry: function() {
        return new OpenLayers.Geometry.Polygon([
            new OpenLayers.Geometry.LinearRing([
                new OpenLayers.Geometry.Point(this.left, this.bottom),
                new OpenLayers.Geometry.Point(this.right, this.bottom),
                new OpenLayers.Geometry.Point(this.right, this.top),
                new OpenLayers.Geometry.Point(this.left, this.top)
            ])
        ]);
    },
    
    /**
     * APIMethod: getWidth
     * 
     * Returns:
     * {Float} The width of the bounds
     */
    getWidth:function() {
        return (this.right - this.left);
    },

    /**
     * APIMethod: getHeight
     * 
     * Returns:
     * {Float} The height of the bounds (top minus bottom).
     */
    getHeight:function() {
        return (this.top - this.bottom);
    },

    /**
     * APIMethod: getSize
     * 
     * Returns:
     * {<OpenLayers.Size>} The size of the box.
     */
    getSize:function() {
        return new OpenLayers.Size(this.getWidth(), this.getHeight());
    },

    /**
     * APIMethod: getCenterPixel
     * 
     * Returns:
     * {<OpenLayers.Pixel>} The center of the bounds in pixel space.
     */
    getCenterPixel:function() {
        return new OpenLayers.Pixel( (this.left + this.right) / 2,
                                     (this.bottom + this.top) / 2);
    },

    /**
     * APIMethod: getCenterLonLat
     * 
     * Returns:
     * {<OpenLayers.LonLat>} The center of the bounds in map space.
     */
    getCenterLonLat:function() {
        if(!this.centerLonLat) {
            this.centerLonLat = new OpenLayers.LonLat(
                (this.left + this.right) / 2, (this.bottom + this.top) / 2
            );
        }
        return this.centerLonLat;
    },

    /**
     * APIMethod: scale
     * Scales the bounds around a pixel or lonlat. Note that the new 
     *     bounds may return non-integer properties, even if a pixel
     *     is passed. 
     * 
     * Parameters:
     * ratio - {Float} 
     * origin - {<OpenLayers.Pixel> or <OpenLayers.LonLat>}
     *          Default is center.
     *
     * Returns:
     * {<OpenLayers.Bounds>} A new bounds that is scaled by ratio
     *                      from origin.
     */
    scale: function(ratio, origin){
        if(origin == null){
            origin = this.getCenterLonLat();
        }
        
        var origx,origy;

        // get origin coordinates
        if(origin.CLASS_NAME == "OpenLayers.LonLat"){
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }

        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;
        
        return new OpenLayers.Bounds(left, bottom, right, top);
    },

    /**
     * APIMethod: add
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A new bounds whose coordinates are the same as
     *     this, but shifted by the passed-in x and y values.
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            var msg = OpenLayers.i18n("boundsAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Bounds(this.left + x, this.bottom + y,
                                     this.right + x, this.top + y);
    },
    
    /**
     * APIMethod: extend
     * Extend the bounds to include the point, lonlat, or bounds specified.
     *     Note, this function assumes that left < right and bottom < top.
     * 
     * Parameters: 
     * object - {Object} Can be LonLat, Point, or Bounds
     */
    extend:function(object) {
        var bounds = null;
        if (object) {
            // clear cached center location
            switch(object.CLASS_NAME) {
                case "OpenLayers.LonLat":    
                    bounds = new OpenLayers.Bounds(object.lon, object.lat,
                                                    object.lon, object.lat);
                    break;
                case "OpenLayers.Geometry.Point":
                    bounds = new OpenLayers.Bounds(object.x, object.y,
                                                    object.x, object.y);
                    break;
                    
                case "OpenLayers.Bounds":    
                    bounds = object;
                    break;
            }
    
            if (bounds) {
                this.centerLonLat = null;
                if ( (this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ( (this.bottom == null) || (bounds.bottom < this.bottom) ) {
                    this.bottom = bounds.bottom;
                } 
                if ( (this.right == null) || (bounds.right > this.right) ) {
                    this.right = bounds.right;
                }
                if ( (this.top == null) || (bounds.top > this.top) ) { 
                    this.top = bounds.top;
                }
            }
        }
    },

    /**
     * APIMethod: containsLonLat
     * 
     * Parameters:
     * ll - {<OpenLayers.LonLat>}
     * inclusive - {Boolean} Whether or not to include the border.
     *     Default is true.
     *
     * Returns:
     * {Boolean} The passed-in lonlat is within this bounds.
     */
    containsLonLat:function(ll, inclusive) {
        return this.contains(ll.lon, ll.lat, inclusive);
    },

    /**
     * APIMethod: containsPixel
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     * inclusive - {Boolean} Whether or not to include the border. Default is
     *     true.
     *
     * Returns:
     * {Boolean} The passed-in pixel is within this bounds.
     */
    containsPixel:function(px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    },
    
    /**
     * APIMethod: contains
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * inclusive - {Boolean} Whether or not to include the border. Default is
     *     true.
     *
     * Returns:
     * {Boolean} Whether or not the passed-in coordinates are within this
     *     bounds.
     */
    contains:function(x, y, inclusive) {
        //set default
        if (inclusive == null) {
            inclusive = true;
        }

        if (x == null || y == null) {
            return false;
        }

        x = OpenLayers.Util.toFloat(x);
        y = OpenLayers.Util.toFloat(y);

        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && 
                        (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) && 
                        (y > this.bottom) && (y < this.top));
        }              
        return contains;
    },

    /**
     * APIMethod: intersectsBounds
     * Determine whether the target bounds intersects this bounds.  Bounds are
     *     considered intersecting if any of their edges intersect or if one
     *     bounds contains the other.
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>} The target bounds.
     * inclusive - {Boolean} Treat coincident borders as intersecting.  Default
     *     is true.  If false, bounds that do not overlap but only touch at the
     *     border will not be considered as intersecting.
     *
     * Returns:
     * {Boolean} The passed-in bounds object intersects this bounds.
     */
    intersectsBounds:function(bounds, inclusive) {
        if (inclusive == null) {
            inclusive = true;
        }
        var intersects = false;
        var mightTouch = (
            this.left == bounds.right ||
            this.right == bounds.left ||
            this.top == bounds.bottom ||
            this.bottom == bounds.top
        );
        
        // if the two bounds only touch at an edge, and inclusive is false,
        // then the bounds don't *really* intersect.
        if (inclusive || !mightTouch) {
            // otherwise, if one of the boundaries even partially contains another,
            // inclusive of the edges, then they do intersect.
            var inBottom = (
                ((bounds.bottom >= this.bottom) && (bounds.bottom <= this.top)) ||
                ((this.bottom >= bounds.bottom) && (this.bottom <= bounds.top))
            );
            var inTop = (
                ((bounds.top >= this.bottom) && (bounds.top <= this.top)) ||
                ((this.top > bounds.bottom) && (this.top < bounds.top))
            );
            var inLeft = (
                ((bounds.left >= this.left) && (bounds.left <= this.right)) ||
                ((this.left >= bounds.left) && (this.left <= bounds.right))
            );
            var inRight = (
                ((bounds.right >= this.left) && (bounds.right <= this.right)) ||
                ((this.right >= bounds.left) && (this.right <= bounds.right))
            );
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        return intersects;
    },
    
    /**
     * APIMethod: containsBounds
     * Determine whether the target bounds is contained within this bounds.
     * 
     * bounds - {<OpenLayers.Bounds>} The target bounds.
     * partial - {Boolean} If any of the target corners is within this bounds
     *     consider the bounds contained.  Default is false.  If false, the
     *     entire target bounds must be contained within this bounds.
     * inclusive - {Boolean} Treat shared edges as contained.  Default is
     *     true.
     *
     * Returns:
     * {Boolean} The passed-in bounds object is contained within this bounds. 
     */
    containsBounds:function(bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var bottomLeft  = this.contains(bounds.left, bounds.bottom, inclusive);
        var bottomRight = this.contains(bounds.right, bounds.bottom, inclusive);
        var topLeft  = this.contains(bounds.left, bounds.top, inclusive);
        var topRight = this.contains(bounds.right, bounds.top, inclusive);
        
        return (partial) ? (bottomLeft || bottomRight || topLeft || topRight)
                         : (bottomLeft && bottomRight && topLeft && topRight);
    },

    /** 
     * APIMethod: determineQuadrant
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Returns:
     * {String} The quadrant ("br" "tr" "tl" "bl") of the bounds in which the
     *     coordinate lies.
     */
    determineQuadrant: function(lonlat) {
    
        var quadrant = "";
        var center = this.getCenterLonLat();
        
        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";
    
        return quadrant; 
    },
    
    /**
     * APIMethod: transform
     * Transform the Bounds object from source to dest. 
     *
     * Parameters: 
     * source - {<OpenLayers.Projection>} Source projection. 
     * dest   - {<OpenLayers.Projection>} Destination projection. 
     *
     * Returns:
     * {<OpenLayers.Bounds>} Itself, for use in chaining operations.
     */
    transform: function(source, dest) {
        // clear cached center location
        this.centerLonLat = null;
        var ll = OpenLayers.Projection.transform(
            {'x': this.left, 'y': this.bottom}, source, dest);
        var lr = OpenLayers.Projection.transform(
            {'x': this.right, 'y': this.bottom}, source, dest);
        var ul = OpenLayers.Projection.transform(
            {'x': this.left, 'y': this.top}, source, dest);
        var ur = OpenLayers.Projection.transform(
            {'x': this.right, 'y': this.top}, source, dest);
        this.left   = Math.min(ll.x, ul.x);
        this.bottom = Math.min(ll.y, lr.y);
        this.right  = Math.max(lr.x, ur.x);
        this.top    = Math.max(ul.y, ur.y);
        return this;
    },

    /**
     * APIMethod: wrapDateLine
     *  
     * Parameters:
     * maxExtent - {<OpenLayers.Bounds>}
     * options - {Object} Some possible options are:
     *
     * Allowed Options:
     *                    leftTolerance - {float} Allow for a margin of error 
     *                                            with the 'left' value of this 
     *                                            bound.
     *                                            Default is 0.
     *                    rightTolerance - {float} Allow for a margin of error 
     *                                             with the 'right' value of 
     *                                             this bound.
     *                                             Default is 0.
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A copy of this bounds, but wrapped around the 
     *                       "dateline" (as specified by the borders of 
     *                       maxExtent). Note that this function only returns 
     *                       a different bounds value if this bounds is 
     *                       *entirely* outside of the maxExtent. If this 
     *                       bounds straddles the dateline (is part in/part 
     *                       out of maxExtent), the returned bounds will be 
     *                       merely a copy of this one.
     */
    wrapDateLine: function(maxExtent, options) {    
        options = options || {};
        
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;

        var newBounds = this.clone();
    
        if (maxExtent) {

           //shift right?
           while ( newBounds.left < maxExtent.left && 
                   (newBounds.right - rightTolerance) <= maxExtent.left ) { 
                newBounds = newBounds.add(maxExtent.getWidth(), 0);
           }

           //shift left?
           while ( (newBounds.left + leftTolerance) >= maxExtent.right && 
                   newBounds.right > maxExtent.right ) { 
                newBounds = newBounds.add(-maxExtent.getWidth(), 0);
           }
        }
                
        return newBounds;
    },

    CLASS_NAME: "OpenLayers.Bounds"
});

/** 
 * APIFunction: fromString
 * Alternative constructor that builds a new OpenLayers.Bounds from a 
 *     parameter string
 * 
 * Parameters: 
 * str - {String}Comma-separated bounds string. (e.g. <i>"5,42,10,45"</i>)
 * reverseAxisOrder - {Boolean} Does the string use reverse axis order?
 * 
 * Returns:
 * {<OpenLayers.Bounds>} New bounds object built from the 
 *                       passed-in String.
 */
OpenLayers.Bounds.fromString = function(str, reverseAxisOrder) {
    var bounds = str.split(",");
    return OpenLayers.Bounds.fromArray(bounds, reverseAxisOrder);
};

/** 
 * APIFunction: fromArray
 * Alternative constructor that builds a new OpenLayers.Bounds
 *     from an array
 * 
 * Parameters:
 * bbox - {Array(Float)} Array of bounds values (e.g. <i>[5,42,10,45]</i>)
 * reverseAxisOrder - {Boolean} Does the array use reverse axis order?
 *
 * Returns:
 * {<OpenLayers.Bounds>} New bounds object built from the passed-in Array.
 */
OpenLayers.Bounds.fromArray = function(bbox, reverseAxisOrder) {
    return reverseAxisOrder === true ?
           new OpenLayers.Bounds(parseFloat(bbox[1]),
                                 parseFloat(bbox[0]),
                                 parseFloat(bbox[3]),
                                 parseFloat(bbox[2])) :
           new OpenLayers.Bounds(parseFloat(bbox[0]),
                                 parseFloat(bbox[1]),
                                 parseFloat(bbox[2]),
                                 parseFloat(bbox[3]));
};

/** 
 * APIFunction: fromSize
 * Alternative constructor that builds a new OpenLayers.Bounds
 *     from a size
 * 
 * Parameters:
 * size - {<OpenLayers.Size>} 
 *
 * Returns:
 * {<OpenLayers.Bounds>} New bounds object built from the passed-in size.
 */
OpenLayers.Bounds.fromSize = function(size) {
    return new OpenLayers.Bounds(0,
                                 size.h,
                                 size.w,
                                 0);
};

/**
 * Function: oppositeQuadrant
 * Get the opposite quadrant for a given quadrant string.
 *
 * Parameters:
 * quadrant - {String} two character quadrant shortstring
 *
 * Returns:
 * {String} The opposing quadrant ("br" "tr" "tl" "bl"). For Example, if 
 *          you pass in "bl" it returns "tr", if you pass in "br" it 
 *          returns "tl", etc.
 */
OpenLayers.Bounds.oppositeQuadrant = function(quadrant) {
    var opp = "";
    
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    
    return opp;
};
/* ======================================================================
    OpenLayers/BaseTypes/Element.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/BaseTypes.js
 */

/**
 * Namespace: OpenLayers.Element
 */
OpenLayers.Element = {

    /**
     * APIFunction: visible
     * 
     * Parameters: 
     * element - {DOMElement}
     * 
     * Returns:
     * {Boolean} Is the element visible?
     */
    visible: function(element) {
        return OpenLayers.Util.getElement(element).style.display != 'none';
    },

    /**
     * APIFunction: toggle
     * Toggle the visibility of element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    toggle: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            var display = OpenLayers.Element.visible(element) ? 'hide' 
                                                              : 'show';
            OpenLayers.Element[display](element);
        }
    },


    /**
     * APIFunction: hide
     * *Deprecated*. Hide element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    hide: function() {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            newMethod: "element.style.display = 'none';"
        }));

        for (var i=0, len=arguments.length; i<len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            if (element) {
                element.style.display = 'none';
            }
        }
    },

    /**
     * APIFunction: show
     * *Deprecated*. Show element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    show: function() {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            newMethod: "element.style.display = '';"
        }));

        for (var i=0, len=arguments.length; i<len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            if (element) {
                element.style.display = '';
            }
        }
    },

    /**
     * APIFunction: remove
     * Remove the specified element from the DOM.
     * 
     * Parameters:
     * element - {DOMElement}
     */
    remove: function(element) {
        element = OpenLayers.Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    /**
     * APIFunction: getHeight
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Returns:
     * {Integer} The offset height of the element passed in
     */
    getHeight: function(element) {
        element = OpenLayers.Util.getElement(element);
        return element.offsetHeight;
    },

    /**
     * APIFunction: getDimensions
     * *Deprecated*. Returns dimensions of the element passed in.
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Returns:
     * {Object} Object with 'width' and 'height' properties which are the 
     *          dimensions of the element passed in.
     */
    getDimensions: function(element) {
        element = OpenLayers.Util.getElement(element);
        if (OpenLayers.Element.getStyle(element, 'display') != 'none') {
            return {width: element.offsetWidth, height: element.offsetHeight};
        }
    
        // All *Width and *Height properties give 0 on elements with display none,
        // so enable the element temporarily
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        var originalDisplay = els.display;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = originalDisplay;
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {width: originalWidth, height: originalHeight};
    },

    /**
     * Function: hasClass
     * Tests if an element has the given CSS class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to search for.
     *
     * Returns:
     * {Boolean} The element has the given class name.
     */
    hasClass: function(element, name) {
        var names = element.className;
        return (!!names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    
    /**
     * Function: addClass
     * Add a CSS class name to an element.  Safe where element already has
     *     the class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to add.
     *
     * Returns:
     * {DOMElement} The element.
     */
    addClass: function(element, name) {
        if(!OpenLayers.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },

    /**
     * Function: removeClass
     * Remove a CSS class name from an element.  Safe where element does not
     *     have the class name.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to remove.
     *
     * Returns:
     * {DOMElement} The element.
     */
    removeClass: function(element, name) {
        var names = element.className;
        if(names) {
            element.className = OpenLayers.String.trim(
                names.replace(
                    new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "
                )
            );
        }
        return element;
    },

    /**
     * Function: toggleClass
     * Remove a CSS class name from an element if it exists.  Add the class name
     *     if it doesn't exist.
     *
     * Parameters:
     * element - {DOMElement} A DOM element node.
     * name - {String} The CSS class name to toggle.
     *
     * Returns:
     * {DOMElement} The element.
     */
    toggleClass: function(element, name) {
        if(OpenLayers.Element.hasClass(element, name)) {
            OpenLayers.Element.removeClass(element, name);
        } else {
            OpenLayers.Element.addClass(element, name);
        }
        return element;
    },

    /**
     * APIFunction: getStyle
     * 
     * Parameters:
     * element - {DOMElement}
     * style - {?}
     * 
     * Returns:
     * {?}
     */
    getStyle: function(element, style) {
        element = OpenLayers.Util.getElement(element);

        var value = null;
        if (element && element.style) {
            value = element.style[OpenLayers.String.camelize(style)];
            if (!value) {
                if (document.defaultView && 
                    document.defaultView.getComputedStyle) {
                    
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[OpenLayers.String.camelize(style)];
                }
            }
        
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera &&
                (OpenLayers.Util.indexOf(positions,style) != -1) &&
                (OpenLayers.Element.getStyle(element, 'position') == 'static')) { 
                value = 'auto';
            }
        }
    
        return value == 'auto' ? null : value;
    }

};
/* ======================================================================
    OpenLayers/BaseTypes/LonLat.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/**
 * Class: OpenLayers.LonLat
 * This class represents a longitude and latitude pair
 */
OpenLayers.LonLat = OpenLayers.Class({

    /** 
     * APIProperty: lon
     * {Float} The x-axis coodinate in map units
     */
    lon: 0.0,
    
    /** 
     * APIProperty: lat
     * {Float} The y-axis coordinate in map units
     */
    lat: 0.0,

    /**
     * Constructor: OpenLayers.LonLat
     * Create a new map location.
     *
     * Parameters:
     * lon - {Number} The x-axis coordinate in map units.  If your map is in
     *     a geographic projection, this will be the Longitude.  Otherwise,
     *     it will be the x coordinate of the map location in your map units.
     * lat - {Number} The y-axis coordinate in map units.  If your map is in
     *     a geographic projection, this will be the Latitude.  Otherwise,
     *     it will be the y coordinate of the map location in your map units.
     */
    initialize: function(lon, lat) {
        this.lon = OpenLayers.Util.toFloat(lon);
        this.lat = OpenLayers.Util.toFloat(lat);
    },
    
    /**
     * Method: toString
     * Return a readable string version of the lonlat
     *
     * Returns:
     * {String} String representation of OpenLayers.LonLat object. 
     *           (e.g. <i>"lon=5,lat=42"</i>)
     */
    toString:function() {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },

    /** 
     * APIMethod: toShortString
     * 
     * Returns:
     * {String} Shortened String representation of OpenLayers.LonLat object. 
     *         (e.g. <i>"5, 42"</i>)
     */
    toShortString:function() {
        return (this.lon + ", " + this.lat);
    },

    /** 
     * APIMethod: clone
     * 
     * Returns:
     * {<OpenLayers.LonLat>} New OpenLayers.LonLat object with the same lon 
     *                       and lat values
     */
    clone:function() {
        return new OpenLayers.LonLat(this.lon, this.lat);
    },

    /** 
     * APIMethod: add
     * 
     * Parameters:
     * lon - {Float}
     * lat - {Float}
     * 
     * Returns:
     * {<OpenLayers.LonLat>} A new OpenLayers.LonLat object with the lon and 
     *                       lat passed-in added to this's. 
     */
    add:function(lon, lat) {
        if ( (lon == null) || (lat == null) ) {
            var msg = OpenLayers.i18n("lonlatAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.LonLat(this.lon + OpenLayers.Util.toFloat(lon), 
                                     this.lat + OpenLayers.Util.toFloat(lat));
    },

    /** 
     * APIMethod: equals
     * 
     * Parameters:
     * ll - {<OpenLayers.LonLat>}
     * 
     * Returns:
     * {Boolean} Boolean value indicating whether the passed-in 
     *           <OpenLayers.LonLat> object has the same lon and lat 
     *           components as this.
     *           Note: if ll passed in is null, returns false
     */
    equals:function(ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) ||
                      (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },

    /**
     * APIMethod: transform
     * Transform the LonLat object from source to dest. This transformation is
     *    *in place*: if you want a *new* lonlat, use .clone() first.
     *
     * Parameters: 
     * source - {<OpenLayers.Projection>} Source projection. 
     * dest   - {<OpenLayers.Projection>} Destination projection. 
     *
     * Returns:
     * {<OpenLayers.LonLat>} Itself, for use in chaining operations.
     */
    transform: function(source, dest) {
        var point = OpenLayers.Projection.transform(
            {'x': this.lon, 'y': this.lat}, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this;
    },
    
    /**
     * APIMethod: wrapDateLine
     * 
     * Parameters:
     * maxExtent - {<OpenLayers.Bounds>}
     * 
     * Returns:
     * {<OpenLayers.LonLat>} A copy of this lonlat, but wrapped around the 
     *                       "dateline" (as specified by the borders of 
     *                       maxExtent)
     */
    wrapDateLine: function(maxExtent) {    

        var newLonLat = this.clone();
    
        if (maxExtent) {
            //shift right?
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon +=  maxExtent.getWidth();
            }    
           
            //shift left?
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }    
        }
                
        return newLonLat;
    },

    CLASS_NAME: "OpenLayers.LonLat"
});

/** 
 * Function: fromString
 * Alternative constructor that builds a new <OpenLayers.LonLat> from a 
 *     parameter string
 * 
 * Parameters:
 * str - {String} Comma-separated Lon,Lat coordinate string. 
 *                 (e.g. <i>"5,40"</i>)
 * 
 * Returns:
 * {<OpenLayers.LonLat>} New <OpenLayers.LonLat> object built from the 
 *                       passed-in String.
 */
OpenLayers.LonLat.fromString = function(str) {
    var pair = str.split(",");
    return new OpenLayers.LonLat(pair[0], pair[1]);
};

/** 
 * Function: fromArray
 * Alternative constructor that builds a new <OpenLayers.LonLat> from an 
 *     array of two numbers that represent lon- and lat-values.
 * 
 * Parameters:
 * arr - {Array(Float)} Array of lon/lat values (e.g. [5,-42])
 * 
 * Returns:
 * {<OpenLayers.LonLat>} New <OpenLayers.LonLat> object built from the 
 *                       passed-in array.
 */
OpenLayers.LonLat.fromArray = function(arr) {
    var gotArr = OpenLayers.Util.isArray(arr),
        lon = gotArr && arr[0],
        lat = gotArr && arr[1];
    return new OpenLayers.LonLat(lon, lat);
};
/* ======================================================================
    OpenLayers/BaseTypes/Pixel.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/**
 * Class: OpenLayers.Pixel
 * This class represents a screen coordinate, in x and y coordinates
 */
OpenLayers.Pixel = OpenLayers.Class({
    
    /**
     * APIProperty: x
     * {Number} The x coordinate
     */
    x: 0.0,

    /**
     * APIProperty: y
     * {Number} The y coordinate
     */
    y: 0.0,
    
    /**
     * Constructor: OpenLayers.Pixel
     * Create a new OpenLayers.Pixel instance
     *
     * Parameters:
     * x - {Number} The x coordinate
     * y - {Number} The y coordinate
     *
     * Returns:
     * An instance of OpenLayers.Pixel
     */
    initialize: function(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    
    /**
     * Method: toString
     * Cast this object into a string
     *
     * Returns:
     * {String} The string representation of Pixel. ex: "x=200.4,y=242.2"
     */
    toString:function() {
        return ("x=" + this.x + ",y=" + this.y);
    },

    /**
     * APIMethod: clone
     * Return a clone of this pixel object
     *
     * Returns:
     * {<OpenLayers.Pixel>} A clone pixel
     */
    clone:function() {
        return new OpenLayers.Pixel(this.x, this.y); 
    },
    
    /**
     * APIMethod: equals
     * Determine whether one pixel is equivalent to another
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {Boolean} The point passed in as parameter is equal to this. Note that
     * if px passed in is null, returns false.
     */
    equals:function(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                      (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },

    /**
     * APIMethod: distanceTo
     * Returns the distance to the pixel point passed in as a parameter.
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {Float} The pixel point passed in as parameter to calculate the
     *     distance to.
     */
    distanceTo:function(px) {
        return Math.sqrt(
            Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2)
        );
    },

    /**
     * APIMethod: add
     *
     * Parameters:
     * x - {Integer}
     * y - {Integer}
     *
     * Returns:
     * {<OpenLayers.Pixel>} A new Pixel with this pixel's x&y augmented by the 
     * values passed in.
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            var msg = OpenLayers.i18n("pixelAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Pixel(this.x + x, this.y + y);
    },

    /**
    * APIMethod: offset
    * 
    * Parameters
    * px - {<OpenLayers.Pixel>}
    * 
    * Returns:
    * {<OpenLayers.Pixel>} A new Pixel with this pixel's x&y augmented by the 
    *                      x&y values of the pixel passed in.
    */
    offset:function(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },

    CLASS_NAME: "OpenLayers.Pixel"
});
/* ======================================================================
    OpenLayers/BaseTypes/Size.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 */

/**
 * Class: OpenLayers.Size
 * Instances of this class represent a width/height pair
 */
OpenLayers.Size = OpenLayers.Class({

    /**
     * APIProperty: w
     * {Number} width
     */
    w: 0.0,
    
    /**
     * APIProperty: h
     * {Number} height
     */
    h: 0.0,


    /**
     * Constructor: OpenLayers.Size
     * Create an instance of OpenLayers.Size
     *
     * Parameters:
     * w - {Number} width
     * h - {Number} height
     */
    initialize: function(w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },

    /**
     * Method: toString
     * Return the string representation of a size object
     *
     * Returns:
     * {String} The string representation of OpenLayers.Size object. 
     * (e.g. <i>"w=55,h=66"</i>)
     */
    toString:function() {
        return ("w=" + this.w + ",h=" + this.h);
    },

    /**
     * APIMethod: clone
     * Create a clone of this size object
     *
     * Returns:
     * {<OpenLayers.Size>} A new OpenLayers.Size object with the same w and h
     * values
     */
    clone:function() {
        return new OpenLayers.Size(this.w, this.h);
    },

    /**
     *
     * APIMethod: equals
     * Determine where this size is equal to another
     *
     * Parameters:
     * sz - {<OpenLayers.Size>}
     *
     * Returns: 
     * {Boolean} The passed in size has the same h and w properties as this one.
     * Note that if sz passed in is null, returns false.
     *
     */
    equals:function(sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) ||
                      (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },

    CLASS_NAME: "OpenLayers.Size"
});
/* ======================================================================
    OpenLayers/Util.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/BaseTypes/Bounds.js
 * @requires OpenLayers/BaseTypes/Element.js
 * @requires OpenLayers/BaseTypes/LonLat.js
 * @requires OpenLayers/BaseTypes/Pixel.js
 * @requires OpenLayers/BaseTypes/Size.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/**
 * Namespace: Util
 */
OpenLayers.Util = OpenLayers.Util || {};

/** 
 * Function: getElement
 * This is the old $() from prototype
 *
 * Parameters:
 * e - {String or DOMElement or Window}
 * Return:
 * {Array(DOMElement)}
 */
OpenLayers.Util.getElement = function() {
    var elements = [];

    for (var i=0, len=arguments.length; i<len; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/**
 * Function: isElement
 * A cross-browser implementation of "e instanceof Element".
 *
 * Parameters:
 * o - {Object} The object to test.
 *
 * Returns:
 * {Boolean}
 */
OpenLayers.Util.isElement = function(o) {
    return !!(o && o.nodeType === 1);
};

/**
 * Function: isArray
 * Tests that the provided object is an array.
 * This test handles the cross-IFRAME case not caught
 * by "a instanceof Array" and should be used instead.
 * 
 * Parameters:
 * a - {Object} the object test.
 * 
 * Returns
 * {Boolean} true if the object is an array.
 */
OpenLayers.Util.isArray = function(a) {
	return (Object.prototype.toString.call(a) === '[object Array]');
};

/** 
 * Maintain existing definition of $.
 */
if(typeof window.$  === "undefined") {
    window.$ = OpenLayers.Util.getElement;
}

/** 
 * Function: removeItem
 * Remove an object from an array. Iterates through the array
 *     to find the item, then removes it.
 *
 * Parameters:
 * array - {Array}
 * item - {Object}
 * 
 * Return
 * {Array} A reference to the array
 */
OpenLayers.Util.removeItem = function(array, item) {
    for(var i = array.length - 1; i >= 0; i--) {
        if(array[i] == item) {
            array.splice(i,1);
            //break;more than once??
        }
    }
    return array;
};

/**
 * Function: clearArray
 * *Deprecated*. This function will disappear in 3.0.
 * Please use "array.length = 0" instead.
 * 
 * Parameters:
 * array - {Array}
 */
OpenLayers.Util.clearArray = function(array) {
    OpenLayers.Console.warn(
        OpenLayers.i18n(
            "methodDeprecated", {'newMethod': 'array = []'}
        )
    );
    array.length = 0;
};

/** 
 * Function: indexOf
 * Seems to exist already in FF, but not in MOZ.
 * 
 * Parameters:
 * array - {Array}
 * obj - {*}
 * 
 * Returns:
 * {Integer} The index at, which the first object was found in the array.
 *           If not found, returns -1.
 */
OpenLayers.Util.indexOf = function(array, obj) {
    // use the build-in function if available.
    if (typeof array.indexOf == "function") {
        return array.indexOf(obj);
    } else {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] == obj) {
                return i;
            }
        }
        return -1;   
    }
};



/**
 * Function: modifyDOMElement
 * 
 * Modifies many properties of a DOM element all at once.  Passing in 
 * null to an individual parameter will avoid setting the attribute.
 *
 * Parameters:
 * element - {DOMElement} DOM element to modify.
 * id - {String} The element id attribute to set.
 * px - {<OpenLayers.Pixel>} The left and top style position.
 * sz - {<OpenLayers.Size>}  The width and height style attributes.
 * position - {String}       The position attribute.  eg: absolute, 
 *                           relative, etc.
 * border - {String}         The style.border attribute.  eg:
 *                           solid black 2px
 * overflow - {String}       The style.overview attribute.  
 * opacity - {Float}         Fractional value (0.0 - 1.0)
 */
OpenLayers.Util.modifyDOMElement = function(element, id, px, sz, position, 
                                            border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};

/** 
 * Function: createDiv
 * Creates a new div and optionally set some standard attributes.
 * Null may be passed to each parameter if you do not wish to
 * set a particular attribute.
 * Note - zIndex is NOT set on the resulting div.
 * 
 * Parameters:
 * id - {String} An identifier for this element.  If no id is
 *               passed an identifier will be created 
 *               automatically.
 * px - {<OpenLayers.Pixel>} The element left and top position. 
 * sz - {<OpenLayers.Size>} The element width and height.
 * imgURL - {String} A url pointing to an image to use as a 
 *                   background image.
 * position - {String} The style.position value. eg: absolute,
 *                     relative etc.
 * border - {String} The the style.border value. 
 *                   eg: 2px solid black
 * overflow - {String} The style.overflow value. Eg. hidden
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * 
 * Returns: 
 * {DOMElement} A DOM Div created with the specified attributes.
 */
OpenLayers.Util.createDiv = function(id, px, sz, imgURL, position, 
                                     border, overflow, opacity) {

    var dom = document.createElement('div');

    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }

    //set generic properties
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "absolute";
    }
    OpenLayers.Util.modifyDOMElement(dom, id, px, sz, position, 
                                     border, overflow, opacity);

    return dom;
};

/**
 * Function: createImage
 * Creates an img element with specific attribute values.
 *  
 * Parameters:
 * id - {String} The id field for the img.  If none assigned one will be
 *               automatically generated.
 * px - {<OpenLayers.Pixel>} The left and top positions.
 * sz - {<OpenLayers.Size>} The style.width and style.height values.
 * imgURL - {String} The url to use as the image source.
 * position - {String} The style.position value.
 * border - {String} The border to place around the image.
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * delayDisplay - {Boolean} If true waits until the image has been
 *                          loaded.
 * 
 * Returns:
 * {DOMElement} A DOM Image created with the specified attributes.
 */
OpenLayers.Util.createImage = function(id, px, sz, imgURL, position, border,
                                       opacity, delayDisplay) {

    var image = document.createElement("img");

    //set generic properties
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "relative";
    }
    OpenLayers.Util.modifyDOMElement(image, id, px, sz, position, 
                                     border, null, opacity);

    if(delayDisplay) {
        image.style.display = "none";
        OpenLayers.Event.observe(image, "load", 
            OpenLayers.Function.bind(OpenLayers.Util.onImageLoad, image));
        OpenLayers.Event.observe(image, "error", 
            OpenLayers.Function.bind(OpenLayers.Util.onImageLoadError, image));
        
    }
    
    //set special properties
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }


        
    return image;
};

/**
 * Function: setOpacity
 * *Deprecated*.  This function has been deprecated. Instead, please use 
 *     <OpenLayers.Util.modifyDOMElement> 
 *     or 
 *     <OpenLayers.Util.modifyAlphaImageDiv>
 * 
 * Set the opacity of a DOM Element
 *     Note that for this function to work in IE, elements must "have layout"
 *     according to:
 *     http://msdn.microsoft.com/workshop/author/dhtml/reference/properties/haslayout.asp
 *
 * Parameters:
 * element - {DOMElement} Set the opacity on this DOM element
 * opacity - {Float} Opacity value (0.0 - 1.0)
 */
OpenLayers.Util.setOpacity = function(element, opacity) {
    OpenLayers.Util.modifyDOMElement(element, null, null, null,
                                     null, null, null, opacity);
};

/**
 * Function: onImageLoad
 * Bound to image load events.  For all images created with <createImage> or
 *     <createAlphaImageDiv>, this function will be bound to the load event.
 */
OpenLayers.Util.onImageLoad = function() {
    // The complex check here is to solve issues described in #480.
    // Every time a map view changes, it increments the 'viewRequestID' 
    // property. As the requests for the images for the new map view are sent
    // out, they are tagged with this unique viewRequestID. 
    // 
    // If an image has no viewRequestID property set, we display it regardless, 
    // but if it does have a viewRequestID property, we check that it matches 
    // the viewRequestID set on the map.
    // 
    // If the viewRequestID on the map has changed, that means that the user
    // has changed the map view since this specific request was sent out, and
    // therefore this tile does not need to be displayed (so we do not execute
    // this code that turns its display on).
    //
    if (!this.viewRequestID ||
        (this.map && this.viewRequestID == this.map.viewRequestID)) { 
        this.style.display = "";  
    }
    OpenLayers.Element.removeClass(this, "olImageLoadError");
};

/**
 * Property: IMAGE_RELOAD_ATTEMPTS
 * {Integer} How many times should we try to reload an image before giving up?
 *           Default is 0
 */
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;

/**
 * Function: onImageLoadError 
 */
OpenLayers.Util.onImageLoadError = function() {
    this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
    if (this._attempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
        var urls = this.urls;
        if (urls && OpenLayers.Util.isArray(urls) && urls.length > 1){
            var src = this.src.toString();
            var current_url, k;
            for (k = 0; current_url = urls[k]; k++){
                if(src.indexOf(current_url) != -1){
                    break;
                }
            }
            var guess = Math.floor(urls.length * Math.random());
            var new_url = urls[guess];
            k = 0;
            while(new_url == current_url && k++ < 4){
                guess = Math.floor(urls.length * Math.random());
                new_url = urls[guess];
            }
            this.src = src.replace(current_url, new_url);
        } else {
            this.src = this.src;
        }
    } else {
        OpenLayers.Element.addClass(this, "olImageLoadError");
    }
    this.style.display = "";
};

/**
 * Property: alphaHackNeeded
 * {Boolean} true if the png alpha hack is necessary and possible, false otherwise.
 */
OpenLayers.Util.alphaHackNeeded = null;

/**
 * Function: alphaHack
 * Checks whether it's necessary (and possible) to use the png alpha
 * hack which allows alpha transparency for png images under Internet
 * Explorer.
 * 
 * Returns:
 * {Boolean} true if the png alpha hack is necessary and possible, false otherwise.
 */
OpenLayers.Util.alphaHack = function() {
    if (OpenLayers.Util.alphaHackNeeded == null) {
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        var filter = false;
    
        // IEs4Lin dies when trying to access document.body.filters, because 
        // the property is there, but requires a DLL that can't be provided. This
        // means that we need to wrap this in a try/catch so that this can
        // continue.
    
        try { 
            filter = !!(document.body.filters);
        } catch (e) {}    
    
        OpenLayers.Util.alphaHackNeeded = (filter && 
                                           (version >= 5.5) && (version < 7));
    }
    return OpenLayers.Util.alphaHackNeeded;
};

/** 
 * Function: modifyAlphaImageDiv
 * 
 * Parameters:
 * div - {DOMElement} Div containing Alpha-adjusted Image
 * id - {String}
 * px - {<OpenLayers.Pixel>}
 * sz - {<OpenLayers.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing - {String} 'crop', 'scale', or 'image'. Default is "scale"
 * opacity - {Float} Fractional value (0.0 - 1.0)
 */ 
OpenLayers.Util.modifyAlphaImageDiv = function(div, id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity) {

    OpenLayers.Util.modifyDOMElement(div, id, px, sz, position,
                                     null, null, opacity);

    var img = div.childNodes[0];

    if (imgURL) {
        img.src = imgURL;
    }
    OpenLayers.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, 
                                     "relative", border);
    
    if (OpenLayers.Util.alphaHack()) {
        if(div.style.display != "none") {
            div.style.display = "inline-block";
        }
        if (sizing == null) {
            sizing = "scale";
        }
        
        div.style.filter = "progid:DXImageTransform.Microsoft" +
                           ".AlphaImageLoader(src='" + img.src + "', " +
                           "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && 
            parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }

        img.style.filter = "alpha(opacity=0)";
    }
};

/** 
 * Function: createAlphaImageDiv
 * 
 * Parameters:
 * id - {String}
 * px - {<OpenLayers.Pixel>}
 * sz - {<OpenLayers.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing - {String} 'crop', 'scale', or 'image'. Default is "scale"
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * delayDisplay - {Boolean} If true waits until the image has been
 *                          loaded.
 * 
 * Returns:
 * {DOMElement} A DOM Div created with a DOM Image inside it. If the hack is 
 *              needed for transparency in IE, it is added.
 */ 
OpenLayers.Util.createAlphaImageDiv = function(id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity, delayDisplay) {
    
    var div = OpenLayers.Util.createDiv();
    var img = OpenLayers.Util.createImage(null, null, null, null, null, null, 
                                          null, false);
    div.appendChild(img);

    if (delayDisplay) {
        img.style.display = "none";
        OpenLayers.Event.observe(img, "load",
            OpenLayers.Function.bind(OpenLayers.Util.onImageLoad, div));
        OpenLayers.Event.observe(img, "error",
            OpenLayers.Function.bind(OpenLayers.Util.onImageLoadError, div));
    }

    OpenLayers.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, 
                                        border, sizing, opacity);
    
    return div;
};


/** 
 * Function: upperCaseObject
 * Creates a new hashtable and copies over all the keys from the 
 *     passed-in object, but storing them under an uppercased
 *     version of the key at which they were stored.
 * 
 * Parameters: 
 * object - {Object}
 * 
 * Returns: 
 * {Object} A new Object with all the same keys but uppercased
 */
OpenLayers.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};

/** 
 * Function: applyDefaults
 * Takes an object and copies any properties that don't exist from
 *     another properties, by analogy with OpenLayers.Util.extend() from
 *     Prototype.js.
 * 
 * Parameters:
 * to - {Object} The destination object.
 * from - {Object} The source object.  Any properties of this object that
 *     are undefined in the to object will be set on the to object.
 *
 * Returns:
 * {Object} A reference to the to object.  Note that the to argument is modified
 *     in place and returned by this function.
 */
OpenLayers.Util.applyDefaults = function (to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event == "function"
                    && from instanceof window.Event;

    for (var key in from) {
        if (to[key] === undefined ||
            (!fromIsEvt && from.hasOwnProperty
             && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if(!fromIsEvt && from && from.hasOwnProperty
       && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }
    
    return to;
};

/**
 * Function: getParameterString
 * 
 * Parameters:
 * params - {Object}
 * 
 * Returns:
 * {String} A concatenation of the properties of an object in 
 *          http parameter notation. 
 *          (ex. <i>"key1=value1&key2=value2&key3=value3"</i>)
 *          If a parameter is actually a list, that parameter will then
 *          be set to a comma-seperated list of values (foo,bar) instead
 *          of being URL escaped (foo%3Abar). 
 */
OpenLayers.Util.getParameterString = function(params) {
    var paramsArray = [];
    
    for (var key in params) {
      var value = params[key];
      if ((value != null) && (typeof value != 'function')) {
        var encodedValue;
        if (typeof value == 'object' && value.constructor == Array) {
          /* value is an array; encode items and separate with "," */
          var encodedItemArray = [];
          var item;
          for (var itemIndex=0, len=value.length; itemIndex<len; itemIndex++) {
            item = value[itemIndex];
            encodedItemArray.push(encodeURIComponent(
                (item === null || item === undefined) ? "" : item)
            );
          }
          encodedValue = encodedItemArray.join(",");
        }
        else {
          /* value is a string; simply encode */
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
      }
    }
    
    return paramsArray.join("&");
};

/**
 * Function: urlAppend
 * Appends a parameter string to a url. This function includes the logic for
 * using the appropriate character (none, & or ?) to append to the url before
 * appending the param string.
 * 
 * Parameters:
 * url - {String} The url to append to
 * paramStr - {String} The param string to append
 * 
 * Returns:
 * {String} The new url
 */
OpenLayers.Util.urlAppend = function(url, paramStr) {
    var newUrl = url;
    if(paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ?
            paramStr :
            parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};

/**
 * Property: ImgPath
 * {String} Default is ''.
 */
OpenLayers.ImgPath = '';

/** 
 * Function: getImagesLocation
 * 
 * Returns:
 * {String} The fully formatted image location string
 */
OpenLayers.Util.getImagesLocation = function() {
    return OpenLayers.ImgPath || (OpenLayers._getScriptLocation() + "img/");
};


/** 
 * Function: Try
 * Execute functions until one of them doesn't throw an error. 
 *     Capitalized because "try" is a reserved word in JavaScript.
 *     Taken directly from OpenLayers.Util.Try()
 * 
 * Parameters:
 * [*] - {Function} Any number of parameters may be passed to Try()
 *    It will attempt to execute each of them until one of them 
 *    successfully executes. 
 *    If none executes successfully, returns null.
 * 
 * Returns:
 * {*} The value returned by the first successfully executed function.
 */
OpenLayers.Util.Try = function() {
    var returnValue = null;

    for (var i=0, len=arguments.length; i<len; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
};

/**
 * Function: getXmlNodeValue
 * 
 * Parameters:
 * node - {XMLNode}
 * 
 * Returns:
 * {String} The text value of the given node, without breaking in firefox or IE
 */
OpenLayers.Util.getXmlNodeValue = function(node) {
    var val = null;
    OpenLayers.Util.Try( 
        function() {
            val = node.text;
            if (!val) {
                val = node.textContent;
            }
            if (!val) {
                val = node.firstChild.nodeValue;
            }
        }, 
        function() {
            val = node.textContent;
        }); 
    return val;
};

/** 
 * Function: mouseLeft
 * 
 * Parameters:
 * evt - {Event}
 * div - {HTMLDivElement}
 * 
 * Returns:
 * {Boolean}
 */
OpenLayers.Util.mouseLeft = function (evt, div) {
    // start with the element to which the mouse has moved
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    // walk up the DOM tree.
    while (target != div && target != null) {
        target = target.parentNode;
    }
    // if the target we stop at isn't the div, then we've left the div.
    return (target != div);
};

/**
 * Property: precision
 * {Number} The number of significant digits to retain to avoid
 * floating point precision errors.
 *
 * We use 14 as a "safe" default because, although IEEE 754 double floats
 * (standard on most modern operating systems) support up to about 16
 * significant digits, 14 significant digits are sufficient to represent
 * sub-millimeter accuracy in any coordinate system that anyone is likely to
 * use with OpenLayers.
 *
 * If DEFAULT_PRECISION is set to 0, the original non-truncating behavior
 * of OpenLayers <2.8 is preserved. Be aware that this will cause problems
 * with certain projections, e.g. spherical Mercator.
 *
 */
OpenLayers.Util.DEFAULT_PRECISION = 14;

/**
 * Function: toFloat
 * Convenience method to cast an object to a Number, rounded to the
 * desired floating point precision.
 *
 * Parameters:
 * number    - {Number} The number to cast and round.
 * precision - {Number} An integer suitable for use with
 *      Number.toPrecision(). Defaults to OpenLayers.Util.DEFAULT_PRECISION.
 *      If set to 0, no rounding is performed.
 *
 * Returns:
 * {Number} The cast, rounded number.
 */
OpenLayers.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = OpenLayers.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number :
                             parseFloat(number.toPrecision(precision));
};

/**
 * Function: rad
 * 
 * Parameters:
 * x - {Float}
 * 
 * Returns:
 * {Float}
 */
OpenLayers.Util.rad = function(x) {return x*Math.PI/180;};

/**
 * Function: deg
 *
 * Parameters:
 * x - {Float}
 *
 * Returns:
 * {Float}
 */
OpenLayers.Util.deg = function(x) {return x*180/Math.PI;};

/**
 * Property: VincentyConstants
 * {Object} Constants for Vincenty functions.
 */
OpenLayers.Util.VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1/298.257223563
};

/**
 * APIFunction: distVincenty
 * Given two objects representing points with geographic coordinates, this
 *     calculates the distance between those points on the surface of an
 *     ellipsoid.
 *
 * Parameters:
 * p1 - {<OpenLayers.LonLat>} (or any object with both .lat, .lon properties)
 * p2 - {<OpenLayers.LonLat>} (or any object with both .lat, .lon properties)
 *
 * Returns:
 * {Float} The distance (in km) between the two input points as measured on an
 *     ellipsoid.  Note that the input point objects must be in geographic
 *     coordinates (decimal degrees) and the return distance is in kilometers.
 */
OpenLayers.Util.distVincenty = function(p1, p2) {
    var ct = OpenLayers.Util.VincentyConstants;
    var a = ct.a, b = ct.b, f = ct.f;

    var L = OpenLayers.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1-f) * Math.tan(OpenLayers.Util.rad(p1.lat)));
    var U2 = Math.atan((1-f) * Math.tan(OpenLayers.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
    var lambda = L, lambdaP = 2*Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0) {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) +
        (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
        if (sinSigma==0) {
            return 0;  // co-incident points
        }
        var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
        var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1-C) * f * Math.sin(alpha) *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
    }
    if (iterLimit==0) {
        return NaN;  // formula failed to converge
    }
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
    var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
        B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
    var s = b*A*(sigma-deltaSigma);
    var d = s.toFixed(3)/1000; // round to 1mm precision
    return d;
};

/**
 * APIFunction: destinationVincenty
 * Calculate destination point given start point lat/long (numeric degrees),
 * bearing (numeric degrees) & distance (in m).
 * Adapted from Chris Veness work, see
 * http://www.movable-type.co.uk/scripts/latlong-vincenty-direct.html
 *
 * Parameters:
 * lonlat  - {<OpenLayers.LonLat>} (or any object with both .lat, .lon
 *     properties) The start point.
 * brng     - {Float} The bearing (degrees).
 * dist     - {Float} The ground distance (meters).
 *
 * Returns:
 * {<OpenLayers.LonLat>} The destination point.
 */
OpenLayers.Util.destinationVincenty = function(lonlat, brng, dist) {
    var u = OpenLayers.Util;
    var ct = u.VincentyConstants;
    var a = ct.a, b = ct.b, f = ct.f;

    var lon1 = lonlat.lon;
    var lat1 = lonlat.lat;

    var s = dist;
    var alpha1 = u.rad(brng);
    var sinAlpha1 = Math.sin(alpha1);
    var cosAlpha1 = Math.cos(alpha1);

    var tanU1 = (1-f) * Math.tan(u.rad(lat1));
    var cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1;
    var sigma1 = Math.atan2(tanU1, cosAlpha1);
    var sinAlpha = cosU1 * sinAlpha1;
    var cosSqAlpha = 1 - sinAlpha*sinAlpha;
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));

    var sigma = s / (b*A), sigmaP = 2*Math.PI;
    while (Math.abs(sigma-sigmaP) > 1e-12) {
        var cos2SigmaM = Math.cos(2*sigma1 + sigma);
        var sinSigma = Math.sin(sigma);
        var cosSigma = Math.cos(sigma);
        var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
            B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b*A) + deltaSigma;
    }

    var tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
    var lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1,
        (1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
    var lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
    var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
    var L = lambda - (1-C) * f * sinAlpha *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));

    var revAz = Math.atan2(sinAlpha, -tmp);  // final bearing

    return new OpenLayers.LonLat(lon1+u.deg(L), u.deg(lat2));
};

/**
 * Function: getParameters
 * Parse the parameters from a URL or from the current page itself into a 
 *     JavaScript Object. Note that parameter values with commas are separated
 *     out into an Array.
 * 
 * Parameters:
 * url - {String} Optional url used to extract the query string.
 *                If url is null or is not supplied, query string is taken 
 *                from the page location.
 * 
 * Returns:
 * {Object} An object of key/value pairs from the query string.
 */
OpenLayers.Util.getParameters = function(url) {
    // if no url specified, take it from the location bar
    url = (url === null || url === undefined) ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (OpenLayers.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = OpenLayers.String.contains(url, "#") ?
                    url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for(var i=0, len=pairs.length; i<len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }
            
            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }
            
            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }                
            
            parameters[key] = value;
         }
     }
    return parameters;
};

/**
 * Function: getArgs
 * *Deprecated*.  Will be removed in 3.0.  Please use instead
 *     <OpenLayers.Util.getParameters>
 * 
 * Parameters:
 * url - {String} Optional url used to extract the query string.
 *                If null, query string is taken from page location.
 * 
 * Returns:
 * {Object} An object of key/value pairs from the query string.
 */
OpenLayers.Util.getArgs = function(url) {
    OpenLayers.Console.warn(
        OpenLayers.i18n(
            "methodDeprecated", {'newMethod': 'OpenLayers.Util.getParameters'}
        )
    );
    return OpenLayers.Util.getParameters(url);
};

/**
 * Property: lastSeqID
 * {Integer} The ever-incrementing count variable.
 *           Used for generating unique ids.
 */
OpenLayers.Util.lastSeqID = 0;

/**
 * Function: createUniqueID
 * Create a unique identifier for this session.  Each time this function
 *     is called, a counter is incremented.  The return will be the optional
 *     prefix (defaults to "id_") appended with the counter value.
 * 
 * Parameters:
 * prefix {String} Optionsal string to prefix unique id. Default is "id_".
 * 
 * Returns:
 * {String} A unique id string, built on the passed in prefix.
 */
OpenLayers.Util.createUniqueID = function(prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    OpenLayers.Util.lastSeqID += 1; 
    return prefix + OpenLayers.Util.lastSeqID;        
};

/**
 * Constant: INCHES_PER_UNIT
 * {Object} Constant inches per unit -- borrowed from MapServer mapscale.c
 * derivation of nautical miles from http://en.wikipedia.org/wiki/Nautical_mile
 * Includes the full set of units supported by CS-MAP (http://trac.osgeo.org/csmap/)
 * and PROJ.4 (http://trac.osgeo.org/proj/)
 * The hardcoded table is maintain in a CS-MAP source code module named CSdataU.c
 * The hardcoded table of PROJ.4 units are in pj_units.c.
 */
OpenLayers.INCHES_PER_UNIT = { 
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
OpenLayers.INCHES_PER_UNIT["in"]= OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT["degrees"] = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT["nmi"] = 1852 * OpenLayers.INCHES_PER_UNIT.m;

// Units from CS-Map
OpenLayers.METERS_PER_INCH = 0.02540005080010160020;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "Inch": OpenLayers.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / OpenLayers.METERS_PER_INCH,   //EPSG:9001
    "Foot": 0.30480060960121920243 / OpenLayers.METERS_PER_INCH,   //EPSG:9003
    "IFoot": 0.30480000000000000000 / OpenLayers.METERS_PER_INCH,   //EPSG:9002
    "ClarkeFoot": 0.3047972651151 / OpenLayers.METERS_PER_INCH,   //EPSG:9005
    "SearsFoot": 0.30479947153867624624 / OpenLayers.METERS_PER_INCH,   //EPSG:9041
    "GoldCoastFoot": 0.30479971018150881758 / OpenLayers.METERS_PER_INCH,   //EPSG:9094
    "IInch": 0.02540000000000000000 / OpenLayers.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / OpenLayers.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / OpenLayers.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / OpenLayers.METERS_PER_INCH,   //EPSG:9036
    "Yard": 0.91440182880365760731 / OpenLayers.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / OpenLayers.METERS_PER_INCH,   //EPSG:9040
    "IndianYard": 0.91439853074444079983 / OpenLayers.METERS_PER_INCH,   //EPSG:9084
    "IndianYd37": 0.91439523 / OpenLayers.METERS_PER_INCH,   //EPSG:9085
    "IndianYd62": 0.9143988 / OpenLayers.METERS_PER_INCH,   //EPSG:9086
    "IndianYd75": 0.9143985 / OpenLayers.METERS_PER_INCH,   //EPSG:9087
    "IndianFoot": 0.30479951 / OpenLayers.METERS_PER_INCH,   //EPSG:9080
    "IndianFt37": 0.30479841 / OpenLayers.METERS_PER_INCH,   //EPSG:9081
    "IndianFt62": 0.3047996 / OpenLayers.METERS_PER_INCH,   //EPSG:9082
    "IndianFt75": 0.3047995 / OpenLayers.METERS_PER_INCH,   //EPSG:9083
    "Mile": 1609.34721869443738887477 / OpenLayers.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / OpenLayers.METERS_PER_INCH,   //EPSG:9096
    "IMile": 1609.34400000000000000000 / OpenLayers.METERS_PER_INCH,   //EPSG:9093
    "NautM": 1852.00000000000000000000 / OpenLayers.METERS_PER_INCH,   //EPSG:9030
    "Lat-66": 110943.316488932731 / OpenLayers.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / OpenLayers.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / OpenLayers.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / OpenLayers.METERS_PER_INCH,   //EPSG:9031
    "CaGrid": 0.999738 / OpenLayers.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / OpenLayers.METERS_PER_INCH,   //EPSG:9038
    "GunterChain": 20.11684023368047 / OpenLayers.METERS_PER_INCH,   //EPSG:9033
    "BenoitChain": 20.116782494375872 / OpenLayers.METERS_PER_INCH,   //EPSG:9062
    "SearsChain": 20.11676512155 / OpenLayers.METERS_PER_INCH,   //EPSG:9042
    "ClarkeLink": 0.201166194976 / OpenLayers.METERS_PER_INCH,   //EPSG:9039
    "GunterLink": 0.2011684023368047 / OpenLayers.METERS_PER_INCH,   //EPSG:9034
    "BenoitLink": 0.20116782494375872 / OpenLayers.METERS_PER_INCH,   //EPSG:9063
    "SearsLink": 0.2011676512155 / OpenLayers.METERS_PER_INCH,   //EPSG:9043
    "Rod": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "IntnlChain": 20.1168 / OpenLayers.METERS_PER_INCH,   //EPSG:9097
    "IntnlLink": 0.201168 / OpenLayers.METERS_PER_INCH,   //EPSG:9098
    "Perch": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Pole": 5.02921005842012 / OpenLayers.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / OpenLayers.METERS_PER_INCH,
    "Rood": 3.778266898 / OpenLayers.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / OpenLayers.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / OpenLayers.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / OpenLayers.METERS_PER_INCH,
    "Fathom": 1.8288 / OpenLayers.METERS_PER_INCH,
    "NautM-UK": 1853.184 / OpenLayers.METERS_PER_INCH,
    "50kilometers": 50000.0 / OpenLayers.METERS_PER_INCH,
    "150kilometers": 150000.0 / OpenLayers.METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
    "mm": OpenLayers.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": OpenLayers.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": OpenLayers.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": OpenLayers.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": OpenLayers.INCHES_PER_UNIT["nmi"],    //International Nautical Mile
    "fath": OpenLayers.INCHES_PER_UNIT["Fathom"], //International Fathom
    "ch": OpenLayers.INCHES_PER_UNIT["IntnlChain"],  //International Chain
    "link": OpenLayers.INCHES_PER_UNIT["IntnlLink"], //International Link
    "us-in": OpenLayers.INCHES_PER_UNIT["inches"], //U.S. Surveyor's Inch
    "us-ft": OpenLayers.INCHES_PER_UNIT["Foot"],	//U.S. Surveyor's Foot
    "us-yd": OpenLayers.INCHES_PER_UNIT["Yard"],	//U.S. Surveyor's Yard
    "us-ch": OpenLayers.INCHES_PER_UNIT["GunterChain"], //U.S. Surveyor's Chain
    "us-mi": OpenLayers.INCHES_PER_UNIT["Mile"],   //U.S. Surveyor's Statute Mile
    "ind-yd": OpenLayers.INCHES_PER_UNIT["IndianYd37"],  //Indian Yard
    "ind-ft": OpenLayers.INCHES_PER_UNIT["IndianFt37"],  //Indian Foot
    "ind-ch": 20.11669506 / OpenLayers.METERS_PER_INCH  //Indian Chain
});

/** 
 * Constant: DOTS_PER_INCH
 * {Integer} 72 (A sensible default)
 */
OpenLayers.DOTS_PER_INCH = 72;

/**
 * Function: normalizeScale
 * 
 * Parameters:
 * scale - {float}
 * 
 * Returns:
 * {Float} A normalized scale value, in 1 / X format. 
 *         This means that if a value less than one ( already 1/x) is passed
 *         in, it just returns scale directly. Otherwise, it returns 
 *         1 / scale
 */
OpenLayers.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) 
                                  : scale;
    return normScale;
};

/**
 * Function: getResolutionFromScale
 * 
 * Parameters:
 * scale - {Float}
 * units - {String} Index into OpenLayers.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Returns:
 * {Float} The corresponding resolution given passed-in scale and unit 
 *     parameters.  If the given scale is falsey, the returned resolution will
 *     be undefined.
 */
OpenLayers.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = OpenLayers.Util.normalizeScale(scale);
        resolution = 1 / (normScale * OpenLayers.INCHES_PER_UNIT[units]
                                        * OpenLayers.DOTS_PER_INCH);        
    }
    return resolution;
};

/**
 * Function: getScaleFromResolution
 * 
 * Parameters:
 * resolution - {Float}
 * units - {String} Index into OpenLayers.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Returns:
 * {Float} The corresponding scale given passed-in resolution and unit 
 *         parameters.
 */
OpenLayers.Util.getScaleFromResolution = function (resolution, units) {

    if (units == null) {
        units = "degrees";
    }

    var scale = resolution * OpenLayers.INCHES_PER_UNIT[units] *
                    OpenLayers.DOTS_PER_INCH;
    return scale;
};

/**
 * Function: safeStopPropagation
 * *Deprecated*. This function has been deprecated. Please use directly 
 *     <OpenLayers.Event.stop> passing 'true' as the 2nd 
 *     argument (preventDefault)
 * 
 * Safely stop the propagation of an event *without* preventing
 *   the default browser action from occurring.
 * 
 * Parameter:
 * evt - {Event}
 */
OpenLayers.Util.safeStopPropagation = function(evt) {
    OpenLayers.Event.stop(evt, true);
};

/**
 * Function: pagePosition
 * Calculates the position of an element on the page (see
 * http://code.google.com/p/doctype/wiki/ArticlePageOffset)
 *
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 * 
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * Parameters:
 * forElement - {DOMElement}
 * 
 * Returns:
 * {Array} two item array, Left value then Top value.
 */
OpenLayers.Util.pagePosition =  function(forElement) {
    // NOTE: If element is hidden (display none or disconnected or any the
    // ancestors are hidden) we get (0,0) by default but we still do the
    // accumulation of scroll position.

    var pos = [0, 0];
    var viewportElement = OpenLayers.Util.getViewportElement();
    if (!forElement || forElement == window || forElement == viewportElement) {
        // viewport is always at 0,0 as that defined the coordinate system for
        // this function - this avoids special case checks in the code below
        return pos;
    }

    // Gecko browsers normally use getBoxObjectFor to calculate the position.
    // When invoked for an element with an implicit absolute position though it
    // can be off by one. Therefore the recursive implementation is used in
    // those (relatively rare) cases.
    var BUGGY_GECKO_BOX_OBJECT =
        OpenLayers.IS_GECKO && document.getBoxObjectFor &&
        OpenLayers.Element.getStyle(forElement, 'position') == 'absolute' &&
        (forElement.style.top == '' || forElement.style.left == '');

    var parent = null;
    var box;

    if (forElement.getBoundingClientRect) { // IE
        box = forElement.getBoundingClientRect();
        var scrollTop = viewportElement.scrollTop;
        var scrollLeft = viewportElement.scrollLeft;

        pos[0] = box.left + scrollLeft;
        pos[1] = box.top + scrollTop;

    } else if (document.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) { // gecko
        // Gecko ignores the scroll values for ancestors, up to 1.9.  See:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
        // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

        box = document.getBoxObjectFor(forElement);
        var vpBox = document.getBoxObjectFor(viewportElement);
        pos[0] = box.screenX - vpBox.screenX;
        pos[1] = box.screenY - vpBox.screenY;

    } else { // safari/opera
        pos[0] = forElement.offsetLeft;
        pos[1] = forElement.offsetTop;
        parent = forElement.offsetParent;
        if (parent != forElement) {
            while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
            }
        }

        var browser = OpenLayers.BROWSER_NAME;

        // opera & (safari absolute) incorrectly account for body offsetTop
        if (browser == "opera" || (browser == "safari" &&
              OpenLayers.Element.getStyle(forElement, 'position') == 'absolute')) {
            pos[1] -= document.body.offsetTop;
        }

        // accumulate the scroll positions for everything but the body element
        parent = forElement.offsetParent;
        while (parent && parent != document.body) {
            pos[0] -= parent.scrollLeft;
            // see https://bugs.opera.com/show_bug.cgi?id=249965
            if (browser != "opera" || parent.tagName != 'TR') {
                pos[1] -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }
    
    return pos;
};

/**
 * Function: getViewportElement
 * Returns die viewport element of the document. The viewport element is
 * usually document.documentElement, except in IE,where it is either
 * document.body or document.documentElement, depending on the document's
 * compatibility mode (see
 * http://code.google.com/p/doctype/wiki/ArticleClientViewportElement)
 */
OpenLayers.Util.getViewportElement = function() {
    var viewportElement = arguments.callee.viewportElement;
    if (viewportElement == undefined) {
        viewportElement = (OpenLayers.BROWSER_NAME == "msie" &&
            document.compatMode != 'CSS1Compat') ? document.body :
            document.documentElement;
        arguments.callee.viewportElement = viewportElement;
    }
    return viewportElement;
};

/** 
 * Function: isEquivalentUrl
 * Test two URLs for equivalence. 
 * 
 * Setting 'ignoreCase' allows for case-independent comparison.
 * 
 * Comparison is based on: 
 *  - Protocol
 *  - Host (evaluated without the port)
 *  - Port (set 'ignorePort80' to ignore "80" values)
 *  - Hash ( set 'ignoreHash' to disable)
 *  - Pathname (for relative <-> absolute comparison) 
 *  - Arguments (so they can be out of order)
 *  
 * Parameters:
 * url1 - {String}
 * url2 - {String}
 * options - {Object} Allows for customization of comparison:
 *                    'ignoreCase' - Default is True
 *                    'ignorePort80' - Default is True
 *                    'ignoreHash' - Default is True
 *
 * Returns:
 * {Boolean} Whether or not the two URLs are equivalent
 */
OpenLayers.Util.isEquivalentUrl = function(url1, url2, options) {
    options = options || {};

    OpenLayers.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });

    var urlObj1 = OpenLayers.Util.createUrlObject(url1, options);
    var urlObj2 = OpenLayers.Util.createUrlObject(url2, options);

    //compare all keys except for "args" (treated below)
    for(var key in urlObj1) {
        if(key !== "args") {
            if(urlObj1[key] != urlObj2[key]) {
                return false;
            }
        }
    }

    // compare search args - irrespective of order
    for(var key in urlObj1.args) {
        if(urlObj1.args[key] != urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    // urlObj2 shouldn't have any args left
    for(var key in urlObj2.args) {
        return false;
    }
    
    return true;
};

/**
 * Function: createUrlObject
 * 
 * Parameters:
 * url - {String}
 * options - {Object} A hash of options.  Can be one of:
 *            ignoreCase: lowercase url,
 *            ignorePort80: don't include explicit port if port is 80,
 *            ignoreHash: Don't include part of url after the hash (#).
 * 
 * Returns:
 * {Object} An object with separate url, a, port, host, and args parsed out 
 *          and ready for comparison
 */
OpenLayers.Util.createUrlObject = function(url, options) {
    options = options || {};

    // deal with relative urls first
    if(!(/^\w+:\/\//).test(url)) {
        var loc = window.location;
        var port = loc.port ? ":" + loc.port : "";
        var fullUrl = loc.protocol + "//" + loc.host.split(":").shift() + port;
        if(url.indexOf("/") === 0) {
            // full pathname
            url = fullUrl + url;
        } else {
            // relative to current path
            var parts = loc.pathname.split("/");
            parts.pop();
            url = fullUrl + parts.join("/") + "/" + url;
        }
    }
  
    if (options.ignoreCase) {
        url = url.toLowerCase(); 
    }

    var a = document.createElement('a');
    a.href = url;
    
    var urlObject = {};
    
    //host (without port)
    urlObject.host = a.host.split(":").shift();

    //protocol
    urlObject.protocol = a.protocol;  

    //port (get uniform browser behavior with port 80 here)
    if(options.ignorePort80) {
        urlObject.port = (a.port == "80" || a.port == "0") ? "" : a.port;
    } else {
        urlObject.port = (a.port == "" || a.port == "0") ? "80" : a.port;
    }

    //hash
    urlObject.hash = (options.ignoreHash || a.hash === "#") ? "" : a.hash;  
    
    //args
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : "";
    }
    urlObject.args = OpenLayers.Util.getParameters(queryString);

    //pathname (uniform browser behavior with leading "/")
    urlObject.pathname = (a.pathname.charAt(0) == "/") ? a.pathname : "/" + a.pathname;
    
    return urlObject; 
};
 
/**
 * Function: removeTail
 * Takes a url and removes everything after the ? and #
 * 
 * Parameters:
 * url - {String} The url to process
 * 
 * Returns:
 * {String} The string with all queryString and Hash removed
 */
OpenLayers.Util.removeTail = function(url) {
    var head = null;
    
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");

    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0,hashMark) : url;
    } else {
        head = (hashMark != -1) ? url.substr(0,Math.min(qMark, hashMark)) 
                                  : url.substr(0, qMark);
    }
    return head;
};

/**
 * Constant: IS_GECKO
 * {Boolean} True if the userAgent reports the browser to use the Gecko engine
 */
OpenLayers.IS_GECKO = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") == -1 && ua.indexOf("gecko") != -1;
})();

/**
 * Constant: BROWSER_NAME
 * {String}
 * A substring of the navigator.userAgent property.  Depending on the userAgent
 *     property, this will be the empty string or one of the following:
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 */
OpenLayers.BROWSER_NAME = (function() {
    var name = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        name = "opera";
    } else if (ua.indexOf("msie") != -1) {
        name = "msie";
    } else if (ua.indexOf("safari") != -1) {
        name = "safari";
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            name = "firefox";
        } else {
            name = "mozilla";
        }
    }
    return name;
})();

/**
 * Function: getBrowserName
 * 
 * Returns:
 * {String} A string which specifies which is the current 
 *          browser in which we are running. 
 * 
 *          Currently-supported browser detection and codes:
 *           * 'opera' -- Opera
 *           * 'msie'  -- Internet Explorer
 *           * 'safari' -- Safari
 *           * 'firefox' -- Firefox
 *           * 'mozilla' -- Mozilla
 * 
 *          If we are unable to property identify the browser, we 
 *           return an empty string.
 */
OpenLayers.Util.getBrowserName = function() {
    return OpenLayers.BROWSER_NAME;
};

/**
 * Method: getRenderedDimensions
 * Renders the contentHTML offscreen to determine actual dimensions for
 *     popup sizing. As we need layout to determine dimensions the content
 *     is rendered -9999px to the left and absolute to ensure the 
 *     scrollbars do not flicker
 *     
 * Parameters:
 * contentHTML
 * size - {<OpenLayers.Size>} If either the 'w' or 'h' properties is 
 *     specified, we fix that dimension of the div to be measured. This is 
 *     useful in the case where we have a limit in one dimension and must 
 *     therefore meaure the flow in the other dimension.
 * options - {Object}
 *
 * Allowed Options:
 *     displayClass - {String} Optional parameter.  A CSS class name(s) string
 *         to provide the CSS context of the rendered content.
 *     containerElement - {DOMElement} Optional parameter. Insert the HTML to 
 *         this node instead of the body root when calculating dimensions. 
 * 
 * Returns:
 * {OpenLayers.Size}
 */
OpenLayers.Util.getRenderedDimensions = function(contentHTML, size, options) {
    
    var w, h;
    
    // create temp container div with restricted size
    var container = document.createElement("div");
    container.style.visibility = "hidden";
        
    var containerElement = (options && options.containerElement) 
    	? options.containerElement : document.body;

    //fix a dimension, if specified.
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px";
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px";
        }
    }

    //add css classes, if specified
    if (options && options.displayClass) {
        container.className = options.displayClass;
    }
    
    // create temp content div and assign content
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    
    // we need overflow visible when calculating the size
    content.style.overflow = "visible";
    if (content.childNodes) {
        for (var i=0, l=content.childNodes.length; i<l; i++) {
            if (!content.childNodes[i].style) continue;
            content.childNodes[i].style.overflow = "visible";
        }
    }
    
    // add content to restricted container 
    container.appendChild(content);
    
    // append container to body for rendering
    containerElement.appendChild(container);
    
    // Opera and IE7 can't handle a node with position:aboslute if it inherits
    // position:absolute from a parent.
    var parentHasPositionAbsolute = false;
    var parent = container.parentNode;
    while (parent && parent.tagName.toLowerCase()!="body") {
        var parentPosition = OpenLayers.Element.getStyle(parent, "position");
        if(parentPosition == "absolute") {
            parentHasPositionAbsolute = true;
            break;
        } else if (parentPosition && parentPosition != "static") {
            break;
        }
        parent = parent.parentNode;
    }

    if(!parentHasPositionAbsolute) {
        container.style.position = "absolute";
    }
    
    // calculate scroll width of content and add corners and shadow width
    if (!w) {
        w = parseInt(content.scrollWidth);
    
        // update container width to allow height to adjust
        container.style.width = w + "px";
    }        
    // capture height and add shadow and corner image widths
    if (!h) {
        h = parseInt(content.scrollHeight);
    }

    // remove elements
    container.removeChild(content);
    containerElement.removeChild(container);
    
    return new OpenLayers.Size(w, h);
};

/**
 * APIFunction: getScrollbarWidth
 * This function has been modified by the OpenLayers from the original version,
 *     written by Matthew Eernisse and released under the Apache 2 
 *     license here:
 * 
 *     http://www.fleegix.org/articles/2006/05/30/getting-the-scrollbar-width-in-pixels
 * 
 *     It has been modified simply to cache its value, since it is physically 
 *     impossible that this code could ever run in more than one browser at 
 *     once. 
 * 
 * Returns:
 * {Integer}
 */
OpenLayers.Util.getScrollbarWidth = function() {
    
    var scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
    
        // Outer scrolling div
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        // Start with no scrollbar
        scr.style.overflow = 'hidden';
    
        // Inner content div
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
    
        // Put the inner div in the scrolling div
        scr.appendChild(inn);
        // Append the scrolling div to the doc
        document.body.appendChild(scr);
    
        // Width of the inner div sans scrollbar
        wNoScroll = inn.offsetWidth;
    
        // Add the scrollbar
        scr.style.overflow = 'scroll';
        // Width of the inner div width scrollbar
        wScroll = inn.offsetWidth;
    
        // Remove the scrolling div from the doc
        document.body.removeChild(document.body.lastChild);
    
        // Pixel width of the scroller
        OpenLayers.Util._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    }

    return scrollbarWidth;
};

/**
 * APIFunction: getFormattedLonLat
 * This function will return latitude or longitude value formatted as 
 *
 * Parameters:
 * coordinate - {Float} the coordinate value to be formatted
 * axis - {String} value of either 'lat' or 'lon' to indicate which axis is to
 *          to be formatted (default = lat)
 * dmsOption - {String} specify the precision of the output can be one of:
 *           'dms' show degrees minutes and seconds
 *           'dm' show only degrees and minutes
 *           'd' show only degrees
 * 
 * Returns:
 * {String} the coordinate value formatted as a string
 */
OpenLayers.Util.getFormattedLonLat = function(coordinate, axis, dmsOption) {
    if (!dmsOption) {
        dmsOption = 'dms';    //default to show degree, minutes, seconds
    }
	
	coordinate = (coordinate+540)%360 - 180; // normalize for sphere being round
	
    var abscoordinate = Math.abs(coordinate);
    var coordinatedegrees = Math.floor(abscoordinate);

    var coordinateminutes = (abscoordinate - coordinatedegrees)/(1/60);
    var tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    var coordinateseconds = (tempcoordinateminutes - coordinateminutes)/(1/60);
    coordinateseconds =  Math.round(coordinateseconds*10);
    coordinateseconds /= 10;

    if( coordinateseconds >= 60) { 
        coordinateseconds -= 60; 
        coordinateminutes += 1; 
        if( coordinateminutes >= 60) { 
            coordinateminutes -= 60; 
            coordinatedegrees += 1; 
        } 
    }
    
    if( coordinatedegrees < 10 ) {
        coordinatedegrees = "0" + coordinatedegrees;
    }
    var str = coordinatedegrees + "\u00B0";

    if (dmsOption.indexOf('dm') >= 0) {
        if( coordinateminutes < 10 ) {
            coordinateminutes = "0" + coordinateminutes;
        }
        str += coordinateminutes + "'";
  
        if (dmsOption.indexOf('dms') >= 0) {
            if( coordinateseconds < 10 ) {
                coordinateseconds = "0" + coordinateseconds;
            }
            str += coordinateseconds + '"';
        }
    }
    
    if (axis == "lon") {
        str += coordinate < 0 ? OpenLayers.i18n("W") : OpenLayers.i18n("E");
    } else {
        str += coordinate < 0 ? OpenLayers.i18n("S") : OpenLayers.i18n("N");
    }
    return str;
};

/* ======================================================================
    OpenLayers/Events.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Util.js
 */

/**
 * Namespace: OpenLayers.Event
 * Utility functions for event handling.
 */
OpenLayers.Event = {

    /** 
     * Property: observers 
     * {Object} A hashtable cache of the event observers. Keyed by
     * element._eventCacheID 
     */
    observers: false,
    
    /** 
     * Constant: KEY_BACKSPACE 
     * {int} 
     */
    KEY_BACKSPACE: 8,

    /** 
     * Constant: KEY_TAB 
     * {int} 
     */
    KEY_TAB: 9,

    /** 
     * Constant: KEY_RETURN 
     * {int} 
     */
    KEY_RETURN: 13,

    /** 
     * Constant: KEY_ESC 
     * {int} 
     */
    KEY_ESC: 27,

    /** 
     * Constant: KEY_LEFT 
     * {int} 
     */
    KEY_LEFT: 37,

    /** 
     * Constant: KEY_UP 
     * {int} 
     */
    KEY_UP: 38,

    /** 
     * Constant: KEY_RIGHT 
     * {int} 
     */
    KEY_RIGHT: 39,

    /** 
     * Constant: KEY_DOWN 
     * {int} 
     */
    KEY_DOWN: 40,

    /** 
     * Constant: KEY_DELETE 
     * {int} 
     */
    KEY_DELETE: 46,


    /**
     * Method: element
     * Cross browser event element detection.
     * 
     * Parameters:
     * event - {Event} 
     * 
     * Returns:
     * {DOMElement} The element that caused the event 
     */
    element: function(event) {
        return event.target || event.srcElement;
    },

    /**
     * Method: isSingleTouch
     * Determine whether event was caused by a single touch
     *
     * Parameters:
     * event - {Event}
     *
     * Returns:
     * {Boolean}
     */
    isSingleTouch: function(event) {
        return event.touches && event.touches.length == 1;
    },

    /**
     * Method: isMultiTouch
     * Determine whether event was caused by a multi touch
     *
     * Parameters:
     * event - {Event}
     *
     * Returns:
     * {Boolean}
     */
    isMultiTouch: function(event) {
        return event.touches && event.touches.length > 1;
    },

    /**
     * Method: isLeftClick
     * Determine whether event was caused by a left click. 
     *
     * Parameters:
     * event - {Event} 
     * 
     * Returns:
     * {Boolean}
     */
    isLeftClick: function(event) {
        return (((event.which) && (event.which == 1)) ||
                ((event.button) && (event.button == 1)));
    },

    /**
     * Method: isRightClick
     * Determine whether event was caused by a right mouse click. 
     *
     * Parameters:
     * event - {Event} 
     * 
     * Returns:
     * {Boolean}
     */
     isRightClick: function(event) {
        return (((event.which) && (event.which == 3)) ||
                ((event.button) && (event.button == 2)));
    },
     
    /**
     * Method: stop
     * Stops an event from propagating. 
     *
     * Parameters: 
     * event - {Event} 
     * allowDefault - {Boolean} If true, we stop the event chain but 
     *                               still allow the default browser 
     *                               behaviour (text selection, radio-button 
     *                               clicking, etc)
     *                               Default false
     */
    stop: function(event, allowDefault) {
        
        if (!allowDefault) { 
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
                
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /** 
     * Method: findElement
     * 
     * Parameters:
     * event - {Event} 
     * tagName - {String} 
     * 
     * Returns:
     * {DOMElement} The first node with the given tagName, starting from the
     * node the event was triggered on and traversing the DOM upwards
     */
    findElement: function(event, tagName) {
        var element = OpenLayers.Event.element(event);
        while (element.parentNode && (!element.tagName ||
              (element.tagName.toUpperCase() != tagName.toUpperCase()))){
            element = element.parentNode;
        }
        return element;
    },

    /** 
     * Method: observe
     * 
     * Parameters:
     * elementParam - {DOMElement || String} 
     * name - {String} 
     * observer - {function} 
     * useCapture - {Boolean} 
     */
    observe: function(elementParam, name, observer, useCapture) {
        var element = OpenLayers.Util.getElement(elementParam);
        useCapture = useCapture || false;

        if (name == 'keypress' &&
           (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
           || element.attachEvent)) {
            name = 'keydown';
        }

        //if observers cache has not yet been created, create it
        if (!this.observers) {
            this.observers = {};
        }

        //if not already assigned, make a new unique cache ID
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = OpenLayers.Util.createUniqueID(idPrefix);
        }

        var cacheID = element._eventCacheID;

        //if there is not yet a hash entry for this element, add one
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }

        //add a new observer to this element's list
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });

        //add the actual browser event listener
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },

    /** 
     * Method: stopObservingElement
     * Given the id of an element to stop observing, cycle through the 
     *   element's cached observers, calling stopObserving on each one, 
     *   skipping those entries which can no longer be removed.
     * 
     * parameters:
     * elementParam - {DOMElement || String} 
     */
    stopObservingElement: function(elementParam) {
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        this._removeElementObservers(OpenLayers.Event.observers[cacheID]);
    },

    /**
     * Method: _removeElementObservers
     *
     * Parameters:
     * elementObservers - {Array(Object)} Array of (element, name, 
     *                                         observer, usecapture) objects, 
     *                                         taken directly from hashtable
     */
    _removeElementObservers: function(elementObservers) {
        if (elementObservers) {
            for(var i = elementObservers.length-1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element,
                                     entry.name,
                                     entry.observer,
                                     entry.useCapture);
                var removed = OpenLayers.Event.stopObserving.apply(this, args);
            }
        }
    },

    /**
     * Method: stopObserving
     * 
     * Parameters:
     * elementParam - {DOMElement || String} 
     * name - {String} 
     * observer - {function} 
     * useCapture - {Boolean} 
     *  
     * Returns:
     * {Boolean} Whether or not the event observer was removed
     */
    stopObserving: function(elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
    
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        if (name == 'keypress') {
            if ( navigator.appVersion.match(/Konqueror|Safari|KHTML/) || 
                 element.detachEvent) {
              name = 'keydown';
            }
        }

        // find element's entry in this.observers cache and remove it
        var foundEntry = false;
        var elementObservers = OpenLayers.Event.observers[cacheID];
        if (elementObservers) {
    
            // find the specific event type in the element's list
            var i=0;
            while(!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
    
                if ((cacheEntry.name == name) &&
                    (cacheEntry.observer == observer) &&
                    (cacheEntry.useCapture == useCapture)) {
    
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete OpenLayers.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break; 
                }
                i++;           
            }
        }
    
        //actually remove the event listener from browser
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture);
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer);
            }
        }
        return foundEntry;
    },
    
    /** 
     * Method: unloadCache
     * Cycle through all the element entries in the events cache and call
     *   stopObservingElement on each. 
     */
    unloadCache: function() {
        // check for OpenLayers.Event before checking for observers, because
        // OpenLayers.Event may be undefined in IE if no map instance was
        // created
        if (OpenLayers.Event && OpenLayers.Event.observers) {
            for (var cacheID in OpenLayers.Event.observers) {
                var elementObservers = OpenLayers.Event.observers[cacheID];
                OpenLayers.Event._removeElementObservers.apply(this, 
                                                           [elementObservers]);
            }
            OpenLayers.Event.observers = false;
        }
    },

    CLASS_NAME: "OpenLayers.Event"
};

/* prevent memory leaks in IE */
OpenLayers.Event.observe(window, 'unload', OpenLayers.Event.unloadCache, false);

// FIXME: Remove this in 3.0. In 3.0, Event.stop will no longer be provided
// by OpenLayers.
if (window.Event) {
    OpenLayers.Util.applyDefaults(window.Event, OpenLayers.Event);
} else {
    var Event = OpenLayers.Event;
}

/**
 * Class: OpenLayers.Events
 */
OpenLayers.Events = OpenLayers.Class({

    /** 
     * Constant: BROWSER_EVENTS
     * {Array(String)} supported events 
     */
    BROWSER_EVENTS: [
        "mouseover", "mouseout",
        "mousedown", "mouseup", "mousemove", 
        "click", "dblclick", "rightclick", "dblrightclick",
        "resize", "focus", "blur",
        "touchstart", "touchmove", "touchend"
    ],

    /** 
     * Property: listeners 
     * {Object} Hashtable of Array(Function): events listener functions  
     */
    listeners: null,

    /** 
     * Property: object 
     * {Object}  the code object issuing application events 
     */
    object: null,

    /** 
     * Property: element 
     * {DOMElement}  the DOM element receiving browser events 
     */
    element: null,

    /** 
     * Property: eventTypes 
     * {Array(String)}  list of support application events 
     */
    eventTypes: null,

    /** 
     * Property: eventHandler 
     * {Function}  bound event handler attached to elements 
     */
    eventHandler: null,

    /** 
     * APIProperty: fallThrough 
     * {Boolean} 
     */
    fallThrough: null,

    /** 
     * APIProperty: includeXY
     * {Boolean} Should the .xy property automatically be created for browser
     *    mouse events? In general, this should be false. If it is true, then
     *    mouse events will automatically generate a '.xy' property on the 
     *    event object that is passed. (Prior to OpenLayers 2.7, this was true
     *    by default.) Otherwise, you can call the getMousePosition on the
     *    relevant events handler on the object available via the 'evt.object'
     *    property of the evt object. So, for most events, you can call:
     *    function named(evt) { 
     *        this.xy = this.object.events.getMousePosition(evt) 
     *    } 
     *
     *    This option typically defaults to false for performance reasons:
     *    when creating an events object whose primary purpose is to manage
     *    relatively positioned mouse events within a div, it may make
     *    sense to set it to true.
     *
     *    This option is also used to control whether the events object caches
     *    offsets. If this is false, it will not: the reason for this is that
     *    it is only expected to be called many times if the includeXY property
     *    is set to true. If you set this to true, you are expected to clear 
     *    the offset cache manually (using this.clearMouseCache()) if:
     *        the border of the element changes
     *        the location of the element in the page changes
    */
    includeXY: false,      

    /**
     * Method: clearMouseListener
     * A version of <clearMouseCache> that is bound to this instance so that
     *     it can be used with <OpenLayers.Event.observe> and
     *     <OpenLayers.Event.stopObserving>.
     */
    clearMouseListener: null,

    /**
     * Constructor: OpenLayers.Events
     * Construct an OpenLayers.Events object.
     *
     * Parameters:
     * object - {Object} The js object to which this Events object  is being added
     * element - {DOMElement} A dom element to respond to browser events
     * eventTypes - {Array(String)} Array of custom application events 
     * fallThrough - {Boolean} Allow events to fall through after these have
     *                         been handled?
     * options - {Object} Options for the events object.
     */
    initialize: function (object, element, eventTypes, fallThrough, options) {
        OpenLayers.Util.extend(this, options);
        this.object     = object;
        this.fallThrough = fallThrough;
        this.listeners  = {};

        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        this.eventHandler = OpenLayers.Function.bindAsEventListener(
            this.handleBrowserEvent, this
        );
        
        // to be used with observe and stopObserving
        this.clearMouseListener = OpenLayers.Function.bind(
            this.clearMouseCache, this
        );

        // if eventTypes is specified, create a listeners list for each 
        // custom application event.
        this.eventTypes = [];
        if (eventTypes != null) {
            for (var i=0, len=eventTypes.length; i<len; i++) {
                this.addEventType(eventTypes[i]);
            }
        }
        
        // if a dom element is specified, add a listeners list 
        // for browser events on the element and register them
        if (element != null) {
            this.attachToElement(element);
        }
    },

    /**
     * APIMethod: destroy
     */
    destroy: function () {
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
            if(this.element.hasScrollEvent) {
                OpenLayers.Event.stopObserving(
                    window, "scroll", this.clearMouseListener
                );
            }
        }
        this.element = null;

        this.listeners = null;
        this.object = null;
        this.eventTypes = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },

    /**
     * APIMethod: addEventType
     * Add a new event type to this events object.
     * If the event type has already been added, do nothing.
     * 
     * Parameters:
     * eventName - {String}
     */
    addEventType: function(eventName) {
        if (!this.listeners[eventName]) {
            this.eventTypes.push(eventName);
            this.listeners[eventName] = [];
        }
    },

    /**
     * Method: attachToElement
     *
     * Parameters:
     * element - {HTMLDOMElement} a DOM element to attach browser events to
     */
    attachToElement: function (element) {
        if(this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
        }
        this.element = element;
        for (var i=0, len=this.BROWSER_EVENTS.length; i<len; i++) {
            var eventType = this.BROWSER_EVENTS[i];

            // every browser event has a corresponding application event 
            // (whether it's listened for or not).
            this.addEventType(eventType);
            
            // use Prototype to register the event cross-browser
            OpenLayers.Event.observe(element, eventType, this.eventHandler);
        }
        // disable dragstart in IE so that mousedown/move/up works normally
        OpenLayers.Event.observe(element, "dragstart", OpenLayers.Event.stop);
    },
    
    /**
     * APIMethod: on
     * Convenience method for registering listeners with a common scope.
     *     Internally, this method calls <register> as shown in the examples
     *     below.
     *
     * Example use:
     * (code)
     * // register a single listener for the "loadstart" event
     * events.on({"loadstart": loadStartListener});
     *
     * // this is equivalent to the following
     * events.register("loadstart", undefined, loadStartListener);
     *
     * // register multiple listeners to be called with the same `this` object
     * events.on({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // this is equivalent to the following
     * events.register("loadstart", object, loadStartListener);
     * events.register("loadend", object, loadEndListener);
     * (end)
     *
     * Parameters:
     *  object - {Object}     
     */
    on: function(object) {
        for(var type in object) {
            if(type != "scope") {
                this.register(type, object.scope, object[type]);
            }
        }
    },

    /**
     * APIMethod: register
     * Register an event on the events object.
     *
     * When the event is triggered, the 'func' function will be called, in the
     * context of 'obj'. Imagine we were to register an event, specifying an 
     * OpenLayers.Bounds Object as 'obj'. When the event is triggered, the 
     * context in the callback function will be our Bounds object. This means
     * that within our callback function, we can access the properties and 
     * methods of the Bounds object through the "this" variable. So our 
     * callback could execute something like: 
     * :    leftStr = "Left: " + this.left;
     *   
     *                   or
     *  
     * :    centerStr = "Center: " + this.getCenterLonLat();
     *
     * Parameters:
     * type - {String} Name of the event to register
     * obj - {Object} The object to bind the context to for the callback#.
     *                     If no object is specified, default is the Events's 
     *                     'object' property.
     * func - {Function} The callback function. If no callback is 
     *                        specified, this function does nothing.
     * 
     * 
     */
    register: function (type, obj, func) {

        if ( (func != null) && 
             (OpenLayers.Util.indexOf(this.eventTypes, type) != -1) ) {

            if (obj == null)  {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            listeners.push( {obj: obj, func: func} );
        }
    },

    /**
     * APIMethod: registerPriority
     * Same as register() but adds the new listener to the *front* of the
     *     events queue instead of to the end.
     *    
     *     TODO: get rid of this in 3.0 - Decide whether listeners should be 
     *     called in the order they were registered or in reverse order.
     *
     *
     * Parameters:
     * type - {String} Name of the event to register
     * obj - {Object} The object to bind the context to for the callback#.
     *                If no object is specified, default is the Events's 
     *                'object' property.
     * func - {Function} The callback function. If no callback is 
     *                   specified, this function does nothing.
     */
    registerPriority: function (type, obj, func) {

        if (func != null) {
            if (obj == null)  {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (listeners != null) {
                listeners.unshift( {obj: obj, func: func} );
            }
        }
    },
    
    /**
     * APIMethod: un
     * Convenience method for unregistering listeners with a common scope.
     *     Internally, this method calls <unregister> as shown in the examples
     *     below.
     *
     * Example use:
     * (code)
     * // unregister a single listener for the "loadstart" event
     * events.un({"loadstart": loadStartListener});
     *
     * // this is equivalent to the following
     * events.unregister("loadstart", undefined, loadStartListener);
     *
     * // unregister multiple listeners with the same `this` object
     * events.un({
     *     "loadstart": loadStartListener,
     *     "loadend": loadEndListener,
     *     scope: object
     * });
     *
     * // this is equivalent to the following
     * events.unregister("loadstart", object, loadStartListener);
     * events.unregister("loadend", object, loadEndListener);
     * (end)
     */
    un: function(object) {
        for(var type in object) {
            if(type != "scope") {
                this.unregister(type, object.scope, object[type]);
            }
        }
    },

    /**
     * APIMethod: unregister
     *
     * Parameters:
     * type - {String} 
     * obj - {Object} If none specified, defaults to this.object
     * func - {Function} 
     */
    unregister: function (type, obj, func) {
        if (obj == null)  {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i=0, len=listeners.length; i<len; i++) {
                if (listeners[i].obj == obj && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },

    /** 
     * Method: remove
     * Remove all listeners for a given event type. If type is not registered,
     *     does nothing.
     *
     * Parameters:
     * type - {String} 
     */
    remove: function(type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },

    /**
     * APIMethod: triggerEvent
     * Trigger a specified registered event.  
     * 
     * Parameters:
     * type - {String} 
     * evt - {Event}
     *
     * Returns:
     * {Boolean} The last listener return.  If a listener returns false, the
     *     chain of listeners will stop getting called.
     */
    triggerEvent: function (type, evt) {
        var listeners = this.listeners[type];

        // fast path
        if(!listeners || listeners.length == 0) {
            return undefined;
        }

        // prep evt object with object & div references
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if(!evt.type) {
            evt.type = type;
        }
    
        // execute all callbacks registered for specified type
        // get a clone of the listeners array to
        // allow for splicing during callbacks
        listeners = listeners.slice();
        var continueChain;
        for (var i=0, len=listeners.length; i<len; i++) {
            var callback = listeners[i];
            // bind the context to callback.obj
            continueChain = callback.func.apply(callback.obj, [evt]);

            if ((continueChain != undefined) && (continueChain == false)) {
                // if callback returns false, execute no more callbacks.
                break;
            }
        }
        // don't fall through to other DOM elements
        if (!this.fallThrough) {           
            OpenLayers.Event.stop(evt, true);
        }
        return continueChain;
    },

    /**
     * Method: handleBrowserEvent
     * Basically just a wrapper to the triggerEvent() function, but takes 
     *     care to set a property 'xy' on the event with the current mouse 
     *     position.
     *
     * Parameters:
     * evt - {Event} 
     */
    handleBrowserEvent: function (evt) {
        var type = evt.type, listeners = this.listeners[type];
        if(!listeners || listeners.length == 0) {
            // noone's listening, bail out
            return;
        }
        // add clientX & clientY to all events - corresponds to average x, y
        var touches = evt.touches;
        if (touches && touches[0]) {
            var x = 0;
            var y = 0;
            var num = touches.length;
            var touch;
            for (var i=0; i<num; ++i) {
                touch = touches[i];
                x += touch.clientX;
                y += touch.clientY;
            }
            evt.clientX = x / num;
            evt.clientY = y / num;
        }
        if (this.includeXY) {
            evt.xy = this.getMousePosition(evt);
        } 
        this.triggerEvent(type, evt);
    },

    /**
     * APIMethod: clearMouseCache
     * Clear cached data about the mouse position. This should be called any 
     *     time the element that events are registered on changes position 
     *     within the page.
     */
    clearMouseCache: function() { 
        this.element.scrolls = null;
        this.element.lefttop = null;
        // OpenLayers.Util.pagePosition needs to use
        // element.getBoundingClientRect to correctly calculate the offsets
        // for the iPhone, but once the page is scrolled, getBoundingClientRect
        // returns incorrect offsets. So our best bet is to not invalidate the
        // offsets once we have them, and hope that the page was not scrolled
        // when we did the initial calculation.
        var body = document.body;
        if (body && !((body.scrollTop != 0 || body.scrollLeft != 0) &&
                                    navigator.userAgent.match(/iPhone/i))) {
            this.element.offsets = null;
        }
    },      

    /**
     * Method: getMousePosition
     * 
     * Parameters:
     * evt - {Event} 
     * 
     * Returns:
     * {<OpenLayers.Pixel>} The current xy coordinate of the mouse, adjusted
     *                      for offsets
     */
    getMousePosition: function (evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            OpenLayers.Event.observe(window, "scroll", this.clearMouseListener);
            this.element.hasScrollEvent = true;
        }
        
        if (!this.element.scrolls) {
            var viewportElement = OpenLayers.Util.getViewportElement();
            this.element.scrolls = [
                viewportElement.scrollLeft,
                viewportElement.scrollTop
            ];
        }

        if (!this.element.lefttop) {
            this.element.lefttop = [
                (document.documentElement.clientLeft || 0),
                (document.documentElement.clientTop  || 0)
            ];
        }
        
        if (!this.element.offsets) {
            this.element.offsets = OpenLayers.Util.pagePosition(this.element);
        }

        return new OpenLayers.Pixel(
            (evt.clientX + this.element.scrolls[0]) - this.element.offsets[0]
                         - this.element.lefttop[0], 
            (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1]
                         - this.element.lefttop[1]
        ); 
    },

    CLASS_NAME: "OpenLayers.Events"
});
/* ======================================================================
    OpenLayers/Map.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/Events.js
 * @requires OpenLayers/Tween.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/**
 * Class: OpenLayers.Map
 * Instances of OpenLayers.Map are interactive maps embedded in a web page.
 * Create a new map with the <OpenLayers.Map> constructor.
 * 
 * On their own maps do not provide much functionality.  To extend a map
 * it's necessary to add controls (<OpenLayers.Control>) and 
 * layers (<OpenLayers.Layer>) to the map. 
 */
OpenLayers.Map = OpenLayers.Class({
    
    /**
     * Constant: Z_INDEX_BASE
     * {Object} Base z-indexes for different classes of thing 
     */
    Z_INDEX_BASE: {
        BaseLayer: 100,
        Overlay: 325,
        Feature: 725,
        Popup: 750,
        Control: 1000
    },

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types.  Register a listener
     *     for a particular event with the following syntax:
     * (code)
     * map.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     *  - *object* {Object} A reference to map.events.object.
     *  - *element* {DOMElement} A reference to map.events.element.
     *
     * Browser events have the following additional properties:
     *  - *xy* {<OpenLayers.Pixel>} The pixel location of the event (relative
     *      to the the map viewport).
     *  - other properties that come with browser events
     *
     * Supported map event types:
     *  - *preaddlayer* triggered before a layer has been added.  The event
     *      object will include a *layer* property that references the layer  
     *      to be added. When a listener returns "false" the adding will be 
     *      aborted.
     *  - *addlayer* triggered after a layer has been added.  The event object
     *      will include a *layer* property that references the added layer.
     *  - *preremovelayer* triggered before a layer has been removed. The event
     *      object will include a *layer* property that references the layer  
     *      to be removed. When a listener returns "false" the removal will be 
     *      aborted.
     *  - *removelayer* triggered after a layer has been removed.  The event
     *      object will include a *layer* property that references the removed
     *      layer.
     *  - *changelayer* triggered after a layer name change, order change,
     *      opacity change, params change, visibility change (due to resolution
     *      thresholds) or attribution change (due to extent change). Listeners
     *      will receive an event object with *layer* and *property* properties.
     *      The *layer* property will be a reference to the changed layer. The
     *      *property* property will be a key to the changed property (name,
     *      order, opacity, params, visibility or attribution).
     *  - *movestart* triggered after the start of a drag, pan, or zoom
     *  - *move* triggered after each drag, pan, or zoom
     *  - *moveend* triggered after a drag, pan, or zoom completes
     *  - *zoomend* triggered after a zoom completes
     *  - *mouseover* triggered after mouseover the map
     *  - *mouseout* triggered after mouseout the map
     *  - *mousemove* triggered after mousemove the map
     *  - *changebaselayer* triggered after the base layer changes
     */
    EVENT_TYPES: [ 
        "preaddlayer", "addlayer","preremovelayer", "removelayer", 
        "changelayer", "movestart",
        "move", "moveend", "zoomend", "popupopen", "popupclose",
        "addmarker", "removemarker", "clearmarkers", "mouseover",
        "mouseout", "mousemove", "dragstart", "drag", "dragend",
        "changebaselayer"],

    /**
     * Property: id
     * {String} Unique identifier for the map
     */
    id: null,
    
    /**
     * Property: fractionalZoom
     * {Boolean} For a base layer that supports it, allow the map resolution
     *     to be set to a value between one of the values in the resolutions
     *     array.  Default is false.
     *
     * When fractionalZoom is set to true, it is possible to zoom to
     *     an arbitrary extent.  This requires a base layer from a source
     *     that supports requests for arbitrary extents (i.e. not cached
     *     tiles on a regular lattice).  This means that fractionalZoom
     *     will not work with commercial layers (Google, Yahoo, VE), layers
     *     using TileCache, or any other pre-cached data sources.
     *
     * If you are using fractionalZoom, then you should also use
     *     <getResolutionForZoom> instead of layer.resolutions[zoom] as the
     *     former works for non-integer zoom levels.
     */
    fractionalZoom: false,
    
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} An events object that handles all 
     *                       events on the map
     */
    events: null,
    
    /**
     * APIProperty: allOverlays
     * {Boolean} Allow the map to function with "overlays" only.  Defaults to
     *     false.  If true, the lowest layer in the draw order will act as
     *     the base layer.  In addition, if set to true, all layers will
     *     have isBaseLayer set to false when they are added to the map.
     *
     * Note:
     * If you set map.allOverlays to true, then you *cannot* use
     *     map.setBaseLayer or layer.setIsBaseLayer.  With allOverlays true,
     *     the lowest layer in the draw layer is the base layer.  So, to change
     *     the base layer, use <setLayerIndex> or <raiseLayer> to set the layer
     *     index to 0.
     */
    allOverlays: false,

    /**
     * APIProperty: div
     * {DOMElement|String} The element that contains the map (or an id for
     *     that element).  If the <OpenLayers.Map> constructor is called
     *     with two arguments, this should be provided as the first argument.
     *     Alternatively, the map constructor can be called with the options
     *     object as the only argument.  In this case (one argument), a
     *     div property may or may not be provided.  If the div property
     *     is not provided, the map can be rendered to a container later
     *     using the <render> method.
     *     
     * Note:
     * If you are calling <render> after map construction, do not use
     *     <maxResolution>  auto.  Instead, divide your <maxExtent> by your
     *     maximum expected dimension.
     */
    div: null,
    
    /**
     * Property: dragging
     * {Boolean} The map is currently being dragged.
     */
    dragging: false,

    /**
     * Property: size
     * {<OpenLayers.Size>} Size of the main div (this.div)
     */
    size: null,
    
    /**
     * Property: viewPortDiv
     * {HTMLDivElement} The element that represents the map viewport
     */
    viewPortDiv: null,

    /**
     * Property: layerContainerOrigin
     * {<OpenLayers.LonLat>} The lonlat at which the later container was
     *                       re-initialized (on-zoom)
     */
    layerContainerOrigin: null,

    /**
     * Property: layerContainerDiv
     * {HTMLDivElement} The element that contains the layers.
     */
    layerContainerDiv: null,

    /**
     * APIProperty: layers
     * {Array(<OpenLayers.Layer>)} Ordered list of layers in the map
     */
    layers: null,

    /**
     * Property: controls
     * {Array(<OpenLayers.Control>)} List of controls associated with the map.
     *
     * If not provided in the map options at construction, the map will
     *     be given the following controls by default:
     *  - <OpenLayers.Control.Navigation>
     *  - <OpenLayers.Control.PanZoom>
     *  - <OpenLayers.Control.ArgParser>
     *  - <OpenLayers.Control.Attribution>
     */
    controls: null,

    /**
     * Property: popups
     * {Array(<OpenLayers.Popup>)} List of popups associated with the map
     */
    popups: null,

    /**
     * APIProperty: baseLayer
     * {<OpenLayers.Layer>} The currently selected base layer.  This determines
     * min/max zoom level, projection, etc.
     */
    baseLayer: null,
    
    /**
     * Property: center
     * {<OpenLayers.LonLat>} The current center of the map
     */
    center: null,

    /**
     * Property: resolution
     * {Float} The resolution of the map.
     */
    resolution: null,

    /**
     * Property: zoom
     * {Integer} The current zoom level of the map
     */
    zoom: 0,    

    /**
     * Property: panRatio
     * {Float} The ratio of the current extent within
     *         which panning will tween.
     */
    panRatio: 1.5,    

    /**
     * Property: viewRequestID
     * {String} Used to store a unique identifier that changes when the map 
     *          view changes. viewRequestID should be used when adding data 
     *          asynchronously to the map: viewRequestID is incremented when 
     *          you initiate your request (right now during changing of 
     *          baselayers and changing of zooms). It is stored here in the 
     *          map and also in the data that will be coming back 
     *          asynchronously. Before displaying this data on request 
     *          completion, we check that the viewRequestID of the data is 
     *          still the same as that of the map. Fix for #480
     */
    viewRequestID: 0,

  // Options

    /**
     * APIProperty: tileSize
     * {<OpenLayers.Size>} Set in the map options to override the default tile
     *                     size for this map.
     */
    tileSize: null,

    /**
     * APIProperty: projection
     * {String} Set in the map options to override the default projection 
     *          string this map - also set maxExtent, maxResolution, and 
     *          units if appropriate.  Default is "EPSG:4326".
     */
    projection: "EPSG:4326",    
        
    /**
     * APIProperty: units
     * {String} The map units.  Defaults to 'degrees'.  Possible values are
     *          'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches'.
     */
    units: 'degrees',

    /**
     * APIProperty: resolutions
     * {Array(Float)} A list of map resolutions (map units per pixel) in 
     *     descending order.  If this is not set in the layer constructor, it 
     *     will be set based on other resolution related properties 
     *     (maxExtent, maxResolution, maxScale, etc.).
     */
    resolutions: null,

    /**
     * APIProperty: maxResolution
     * {Float} Default max is 360 deg / 256 px, which corresponds to
     *          zoom level 0 on gmaps.  Specify a different value in the map 
     *          options if you are not using a geographic projection and 
     *          displaying the whole world.
     */
    maxResolution: 1.40625,

    /**
     * APIProperty: minResolution
     * {Float}
     */
    minResolution: null,

    /**
     * APIProperty: maxScale
     * {Float}
     */
    maxScale: null,

    /**
     * APIProperty: minScale
     * {Float}
     */
    minScale: null,

    /**
     * APIProperty: maxExtent
     * {<OpenLayers.Bounds>} The maximum extent for the map.  Defaults to the
     *                       whole world in decimal degrees 
     *                       (-180, -90, 180, 90).  Specify a different
     *                        extent in the map options if you are not using a 
     *                        geographic projection and displaying the whole 
     *                        world.
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<OpenLayers.Bounds>}
     */
    minExtent: null,
    
    /**
     * APIProperty: restrictedExtent
     * {<OpenLayers.Bounds>} Limit map navigation to this extent where possible.
     *     If a non-null restrictedExtent is set, panning will be restricted
     *     to the given bounds.  In addition, zooming to a resolution that
     *     displays more than the restricted extent will center the map
     *     on the restricted extent.  If you wish to limit the zoom level
     *     or resolution, use maxResolution.
     */
    restrictedExtent: null,

    /**
     * APIProperty: numZoomLevels
     * {Integer} Number of zoom levels for the map.  Defaults to 16.  Set a
     *           different value in the map options if needed.
     */
    numZoomLevels: 16,

    /**
     * APIProperty: theme
     * {String} Relative path to a CSS file from which to load theme styles.
     *          Specify null in the map options (e.g. {theme: null}) if you 
     *          want to get cascading style declarations - by putting links to 
     *          stylesheets or style declarations directly in your page.
     */
    theme: null,
    
    /** 
     * APIProperty: displayProjection
     * {<OpenLayers.Projection>} Requires proj4js support.Projection used by
     *     several controls to display data to user. If this property is set,
     *     it will be set on any control which has a null displayProjection
     *     property at the time the control is added to the map. 
     */
    displayProjection: null,

    /**
     * APIProperty: fallThrough
     * {Boolean} Should OpenLayers allow events on the map to fall through to
     *           other elements on the page, or should it swallow them? (#457)
     *           Default is to fall through.
     */
    fallThrough: true,
    
    /**
     * Property: panTween
     * {OpenLayers.Tween} Animated panning tween object, see panTo()
     */
    panTween: null,

    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /**
     * APIProperty: panMethod
     * {Function} The Easing function to be used for tweening.  Default is
     * OpenLayers.Easing.Expo.easeOut. Setting this to 'null' turns off
     * animated panning.
     */
    panMethod: OpenLayers.Easing.Expo.easeOut,
    
    /**
     * Property: panDuration
     * {Integer} The number of steps to be passed to the
     * OpenLayers.Tween.start() method when the map is
     * panned.
     * Default is 50.
     */
    panDuration: 50,
    
    /**
     * Property: paddingForPopups
     * {<OpenLayers.Bounds>} Outside margin of the popup. Used to prevent 
     *     the popup from getting too close to the map border.
     */
    paddingForPopups : null,
    
    /**
     * Property: minPx
     * {<OpenLayers.Pixel>} Lower left of maxExtent in viewport pixel space.
     *     Used to verify in moveByPx that the new location we're moving to
     *     is valid. It is also used in the getLonLatFromViewPortPx function
     *     of Layer.
     */
    minPx: null,
    
    /**
     * Property: maxPx
     * {<OpenLayers.Pixel>} Top right of maxExtent in viewport pixel space.
     *     Used to verify in moveByPx that the new location we're moving to
     *     is valid.
     */
    maxPx: null,
    
    /**
     * Constructor: OpenLayers.Map
     * Constructor for a new OpenLayers.Map instance.  There are two possible
     *     ways to call the map constructor.  See the examples below.
     *
     * Parameters:
     * div - {DOMElement|String}  The element or id of an element in your page
     *     that will contain the map.  May be omitted if the <div> option is
     *     provided or if you intend to call the <render> method later.
     * options - {Object} Optional object with properties to tag onto the map.
     *
     * Examples:
     * (code)
     * // create a map with default options in an element with the id "map1"
     * var map = new OpenLayers.Map("map1");
     *
     * // create a map with non-default options in an element with id "map2"
     * var options = {
     *     maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * };
     * var map = new OpenLayers.Map("map2", options);
     *
     * // map with non-default options - same as above but with a single argument
     * var map = new OpenLayers.Map({
     *     div: "map_id",
     *     maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * });
     *
     * // create a map without a reference to a container - call render later
     * var map = new OpenLayers.Map({
     *     maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'm',
     *     projection: "EPSG:41001"
     * });
     * (end)
     */    
    initialize: function (div, options) {
        
        // If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
                                            OpenLayers.Map.TILE_HEIGHT);
        
        this.maxExtent = new OpenLayers.Bounds(-180, -90, 180, 90);
        
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);

        this.theme = OpenLayers._getScriptLocation() + 
                             'theme/default/style.css'; 

        // now override default options 
        OpenLayers.Util.extend(this, options);

        // initialize layers array
        this.layers = [];

        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");

        this.div = OpenLayers.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        
        OpenLayers.Element.addClass(this.div, 'olMap');

        // the viewPortDiv is the outermost div we modify
        var id = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);

        // the eventsDiv is where we listen for all map events
        var eventsDiv = document.createElement("div");
        eventsDiv.id = this.id + "_events";
        eventsDiv.style.position = "absolute";
        eventsDiv.style.width = "100%";
        eventsDiv.style.height = "100%";
        eventsDiv.style.zIndex = this.Z_INDEX_BASE.Control - 1;
        this.viewPortDiv.appendChild(eventsDiv);
        this.eventsDiv = eventsDiv;
        this.events = new OpenLayers.Events(
            this, this.eventsDiv, this.EVENT_TYPES, this.fallThrough, 
            {includeXY: true}
        );

        // the layerContainerDiv is the one that holds all the layers
        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        
        this.eventsDiv.appendChild(this.layerContainerDiv);

        this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
 
        // update the map size and location before the map moves
        this.events.register("movestart", this, this.updateSize);

        // Because Mozilla does not support the "resize" event for elements 
        // other than "window", we need to put a hack here. 
        if (OpenLayers.String.contains(navigator.appName, "Microsoft")) {
            // If IE, register the resize on the div
            this.events.register("resize", this, this.updateSize);
        } else {
            // Else updateSize on catching the window's resize
            //  Note that this is ok, as updateSize() does nothing if the 
            //  map's size has not actually changed.
            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, 
                this);
            OpenLayers.Event.observe(window, 'resize',
                            this.updateSizeDestroy);
        }
        
        // only append link stylesheet if the theme property is set
        if(this.theme) {
            // check existing links for equivalent url
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for(var i=0, len=nodes.length; i<len; ++i) {
                if(OpenLayers.Util.isEquivalentUrl(nodes.item(i).href,
                                                   this.theme)) {
                    addNode = false;
                    break;
                }
            }
            // only add a new node if one with an equivalent url hasn't already
            // been added
            if(addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        
        if (this.controls == null) {
            if (OpenLayers.Control != null) { // running full or lite?
                this.controls = [ new OpenLayers.Control.Navigation(),
                                  new OpenLayers.Control.PanZoom(),
                                  new OpenLayers.Control.ArgParser(),
                                  new OpenLayers.Control.Attribution()
                                ];
            } else {
                this.controls = [];
            }
        }

        for(var i=0, len=this.controls.length; i<len; i++) {
            this.addControlToMap(this.controls[i]);
        }

        this.popups = [];

        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        

        // always call map.destroy()
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        
        // add any initial layers
        if (options && options.layers) {
            /** 
             * If you have set options.center, the map center property will be
             * set at this point.  However, since setCenter has not been caleld,
             * addLayers gets confused.  So we delete the map center in this 
             * case.  Because the check below uses options.center, it will
             * be properly set below.
             */
            delete this.center;
            this.addLayers(options.layers);        
            // set center (and optionally zoom)
            if (options.center) {
                // zoom can be undefined here
                this.setCenter(options.center, options.zoom);
            }
        }
    },
    
    /**
     * APIMethod: render
     * Render the map to a specified container.
     * 
     * Parameters:
     * div - {String|DOMElement} The container that the map should be rendered
     *     to. If different than the current container, the map viewport
     *     will be moved from the current to the new container.
     */
    render: function(div) {
        this.div = OpenLayers.Util.getElement(div);
        OpenLayers.Element.addClass(this.div, 'olMap');
        this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
        this.div.appendChild(this.viewPortDiv);
        this.updateSize();
    },

    /**
     * Method: unloadDestroy
     * Function that is called to destroy the map on page unload. stored here
     *     so that if map is manually destroyed, we can unregister this.
     */
    unloadDestroy: null,
    
    /**
     * Method: updateSizeDestroy
     * When the map is destroyed, we need to stop listening to updateSize
     *    events: this method stores the function we need to unregister in 
     *    non-IE browsers.
     */
    updateSizeDestroy: null,

    /**
     * APIMethod: destroy
     * Destroy this map.
     *    Note that if you are using an application which removes a container
     *    of the map from the DOM, you need to ensure that you destroy the
     *    map *before* this happens; otherwise, the page unload handler
     *    will fail because the DOM elements that map.destroy() wants
     *    to clean up will be gone. (See 
     *    http://trac.osgeo.org/openlayers/ticket/2277 for more information).
     *    This will apply to GeoExt and also to other applications which
     *    modify the DOM of the container of the OpenLayers Map.
     */
    destroy:function() {
        // if unloadDestroy is null, we've already been destroyed
        if (!this.unloadDestroy) {
            return false;
        }
        
        // make sure panning doesn't continue after destruction
        if(this.panTween) {
            this.panTween.stop();
            this.panTween = null;
        }

        // map has been destroyed. dont do it again!
        OpenLayers.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;

        if (this.updateSizeDestroy) {
            OpenLayers.Event.stopObserving(window, 'resize', 
                                           this.updateSizeDestroy);
        } else {
            this.events.unregister("resize", this, this.updateSize);
        }    
        
        this.paddingForPopups = null;    

        if (this.controls != null) {
            for (var i = this.controls.length - 1; i>=0; --i) {
                this.controls[i].destroy();
            } 
            this.controls = null;
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i>=0; --i) {
                //pass 'false' to destroy so that map wont try to set a new 
                // baselayer after each baselayer is removed
                this.layers[i].destroy(false);
            } 
            this.layers = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;

        if(this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        this.events.destroy();
        this.events = null;

    },

    /**
     * APIMethod: setOptions
     * Change the map options
     *
     * Parameters:
     * options - {Object} Hashtable of options to tag to the map
     */
    setOptions: function(options) {
        var updatePxExtent = this.minPx &&
            options.restrictedExtent != this.restrictedExtent;
        OpenLayers.Util.extend(this, options);
        // force recalculation of minPx and maxPx
        updatePxExtent && this.moveTo(this.getCachedCenter(), this.zoom, {
            forceZoomChange: true
        });
    },

    /**
     * APIMethod: getTileSize
     * Get the tile size for the map
     *
     * Returns:
     * {<OpenLayers.Size>}
     */
     getTileSize: function() {
         return this.tileSize;
     },


    /**
     * APIMethod: getBy
     * Get a list of objects given a property and a match item.
     *
     * Parameters:
     * array - {String} A property on the map whose value is an array.
     * property - {String} A property on each item of the given array.
     * match - {String | Object} A string to match.  Can also be a regular
     *     expression literal or object.  In addition, it can be any object
     *     with a method named test.  For reqular expressions or other, if
     *     match.test(map[array][i][property]) evaluates to true, the item will
     *     be included in the array returned.  If no items are found, an empty
     *     array is returned.
     *
     * Returns:
     * {Array} An array of items where the given property matches the given
     *     criteria.
     */
    getBy: function(array, property, match) {
        var test = (typeof match.test == "function");
        var found = OpenLayers.Array.filter(this[array], function(item) {
            return item[property] == match || (test && match.test(item[property]));
        });
        return found;
    },

    /**
     * APIMethod: getLayersBy
     * Get a list of layers with properties matching the given criteria.
     *
     * Parameter:
     * property - {String} A layer property to be matched.
     * match - {String | Object} A string to match.  Can also be a regular
     *     expression literal or object.  In addition, it can be any object
     *     with a method named test.  For reqular expressions or other, if
     *     match.test(layer[property]) evaluates to true, the layer will be
     *     included in the array returned.  If no layers are found, an empty
     *     array is returned.
     *
     * Returns:
     * {Array(<OpenLayers.Layer>)} A list of layers matching the given criteria.
     *     An empty array is returned if no matches are found.
     */
    getLayersBy: function(property, match) {
        return this.getBy("layers", property, match);
    },

    /**
     * APIMethod: getLayersByName
     * Get a list of layers with names matching the given name.
     *
     * Parameter:
     * match - {String | Object} A layer name.  The name can also be a regular
     *     expression literal or object.  In addition, it can be any object
     *     with a method named test.  For reqular expressions or other, if
     *     name.test(layer.name) evaluates to true, the layer will be included
     *     in the list of layers returned.  If no layers are found, an empty
     *     array is returned.
     *
     * Returns:
     * {Array(<OpenLayers.Layer>)} A list of layers matching the given name.
     *     An empty array is returned if no matches are found.
     */
    getLayersByName: function(match) {
        return this.getLayersBy("name", match);
    },

    /**
     * APIMethod: getLayersByClass
     * Get a list of layers of a given class (CLASS_NAME).
     *
     * Parameter:
     * match - {String | Object} A layer class name.  The match can also be a
     *     regular expression literal or object.  In addition, it can be any
     *     object with a method named test.  For reqular expressions or other,
     *     if type.test(layer.CLASS_NAME) evaluates to true, the layer will
     *     be included in the list of layers returned.  If no layers are
     *     found, an empty array is returned.
     *
     * Returns:
     * {Array(<OpenLayers.Layer>)} A list of layers matching the given class.
     *     An empty array is returned if no matches are found.
     */
    getLayersByClass: function(match) {
        return this.getLayersBy("CLASS_NAME", match);
    },

    /**
     * APIMethod: getControlsBy
     * Get a list of controls with properties matching the given criteria.
     *
     * Parameter:
     * property - {String} A control property to be matched.
     * match - {String | Object} A string to match.  Can also be a regular
     *     expression literal or object.  In addition, it can be any object
     *     with a method named test.  For reqular expressions or other, if
     *     match.test(layer[property]) evaluates to true, the layer will be
     *     included in the array returned.  If no layers are found, an empty
     *     array is returned.
     *
     * Returns:
     * {Array(<OpenLayers.Control>)} A list of controls matching the given
     *     criteria.  An empty array is returned if no matches are found.
     */
    getControlsBy: function(property, match) {
        return this.getBy("controls", property, match);
    },

    /**
     * APIMethod: getControlsByClass
     * Get a list of controls of a given class (CLASS_NAME).
     *
     * Parameter:
     * match - {String | Object} A control class name.  The match can also be a
     *     regular expression literal or object.  In addition, it can be any
     *     object with a method named test.  For reqular expressions or other,
     *     if type.test(control.CLASS_NAME) evaluates to true, the control will
     *     be included in the list of controls returned.  If no controls are
     *     found, an empty array is returned.
     *
     * Returns:
     * {Array(<OpenLayers.Control>)} A list of controls matching the given class.
     *     An empty array is returned if no matches are found.
     */
    getControlsByClass: function(match) {
        return this.getControlsBy("CLASS_NAME", match);
    },

  /********************************************************/
  /*                                                      */
  /*                  Layer Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Layers to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: getLayer
     * Get a layer based on its id
     *
     * Parameter:
     * id - {String} A layer id
     *
     * Returns:
     * {<OpenLayers.Layer>} The Layer with the corresponding id from the map's 
     *                      layer collection, or null if not found.
     */
    getLayer: function(id) {
        var foundLayer = null;
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },

    /**
    * Method: setLayerZIndex
    * 
    * Parameters:
    * layer - {<OpenLayers.Layer>} 
    * zIdx - {int} 
    */    
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(
            this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay']
            + zIdx * 5 );
    },

    /**
     * Method: resetLayersZIndex
     * Reset each layer's z-index based on layer's array index
     */
    resetLayersZIndex: function() {
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },

    /**
    * APIMethod: addLayer
    *
    * Parameters:
    * layer - {<OpenLayers.Layer>} 
    */    
    addLayer: function (layer) {
        for(var i=0, len=this.layers.length; i <len; i++) {
            if (this.layers[i] == layer) {
                var msg = OpenLayers.i18n('layerAlreadyAdded', 
                                                      {'layerName':layer.name});
                OpenLayers.Console.warn(msg);
                return false;
            }
        }
        if (this.events.triggerEvent("preaddlayer", {layer: layer}) === false) {
            return;
        }
        if(this.allOverlays) {
            layer.isBaseLayer = false;
        }

        
        layer.div.className = "olLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);

        if (layer.isFixed) {
            this.viewPortDiv.appendChild(layer.div);
        } else {
            this.layerContainerDiv.appendChild(layer.div);
        }
        this.layers.push(layer);
        layer.setMap(this);

        if (layer.isBaseLayer || (this.allOverlays && !this.baseLayer))  {
            if (this.baseLayer == null) {
                // set the first baselaye we add as the baselayer
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }

        this.events.triggerEvent("addlayer", {layer: layer});
        layer.events.triggerEvent("added", {map: this, layer: layer});
        layer.afterAdd();
    },

    /**
    * APIMethod: addLayers 
    *
    * Parameters:
    * layers - {Array(<OpenLayers.Layer>)} 
    */    
    addLayers: function (layers) {
        for (var i=0, len=layers.length; i<len; i++) {
            this.addLayer(layers[i]);
        }
    },

    /** 
     * APIMethod: removeLayer
     * Removes a layer from the map by removing its visual element (the 
     *   layer.div property), then removing it from the map's internal list 
     *   of layers, setting the layer's map property to null. 
     * 
     *   a "removelayer" event is triggered.
     * 
     *   very worthy of mention is that simply removing a layer from a map
     *   will not cause the removal of any popups which may have been created
     *   by the layer. this is due to the fact that it was decided at some
     *   point that popups would not belong to layers. thus there is no way 
     *   for us to know here to which layer the popup belongs.
     *    
     *     A simple solution to this is simply to call destroy() on the layer.
     *     the default OpenLayers.Layer class's destroy() function
     *     automatically takes care to remove itself from whatever map it has
     *     been attached to. 
     * 
     *     The correct solution is for the layer itself to register an 
     *     event-handler on "removelayer" and when it is called, if it 
     *     recognizes itself as the layer being removed, then it cycles through
     *     its own personal list of popups, removing them from the map.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * setNewBaseLayer - {Boolean} Default is true
     */
    removeLayer: function(layer, setNewBaseLayer) {
        if (this.events.triggerEvent("preremovelayer", {layer: layer}) === false) {
            return;
        }
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }

        if (layer.isFixed) {
            this.viewPortDiv.removeChild(layer.div);
        } else {
            this.layerContainerDiv.removeChild(layer.div);
        }
        OpenLayers.Util.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;

        // if we removed the base layer, need to set a new one
        if(this.baseLayer == layer) {
            this.baseLayer = null;
            if(setNewBaseLayer) {
                for(var i=0, len=this.layers.length; i<len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer || this.allOverlays) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }

        this.resetLayersZIndex();

        this.events.triggerEvent("removelayer", {layer: layer});
        layer.events.triggerEvent("removed", {map: this, layer: layer});
    },

    /**
     * APIMethod: getNumLayers
     * 
     * Returns:
     * {Int} The number of layers attached to the map.
     */
    getNumLayers: function () {
        return this.layers.length;
    },

    /** 
     * APIMethod: getLayerIndex
     *
     * Parameters:
     * layer - {<OpenLayers.Layer>}
     *
     * Returns:
     * {Integer} The current (zero-based) index of the given layer in the map's
     *           layer stack. Returns -1 if the layer isn't on the map.
     */
    getLayerIndex: function (layer) {
        return OpenLayers.Util.indexOf(this.layers, layer);
    },
    
    /** 
     * APIMethod: setLayerIndex
     * Move the given layer to the specified (zero-based) index in the layer
     *     list, changing its z-index in the map display. Use
     *     map.getLayerIndex() to find out the current index of a layer. Note
     *     that this cannot (or at least should not) be effectively used to
     *     raise base layers above overlays.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * idx - {int} 
     */
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i=0, len=this.layers.length; i<len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer, property: "order"
            });
            if(this.allOverlays) {
                if(idx === 0) {
                    this.setBaseLayer(layer);
                } else if(this.baseLayer !== this.layers[0]) {
                    this.setBaseLayer(this.layers[0]);
                }
            }
        }
    },

    /** 
     * APIMethod: raiseLayer
     * Change the index of the given layer by delta. If delta is positive, 
     *     the layer is moved up the map's layer stack; if delta is negative,
     *     the layer is moved down.  Again, note that this cannot (or at least
     *     should not) be effectively used to raise base layers above overlays.
     *
     * Paremeters:
     * layer - {<OpenLayers.Layer>} 
     * delta - {int} 
     */
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    
    /** 
     * APIMethod: setBaseLayer
     * Allows user to specify one of the currently-loaded layers as the Map's
     *     new base layer.
     * 
     * Parameters:
     * newBaseLayer - {<OpenLayers.Layer>}
     */
    setBaseLayer: function(newBaseLayer) {
        
        if (newBaseLayer != this.baseLayer) {
          
            // ensure newBaseLayer is already loaded
            if (OpenLayers.Util.indexOf(this.layers, newBaseLayer) != -1) {

                // preserve center and scale when changing base layers
                var center = this.getCachedCenter();
                var newResolution = OpenLayers.Util.getResolutionFromScale(
                    this.getScale(), newBaseLayer.units
                );

                // make the old base layer invisible 
                if (this.baseLayer != null && !this.allOverlays) {
                    this.baseLayer.setVisibility(false);
                }

                // set new baselayer
                this.baseLayer = newBaseLayer;
                
                // Increment viewRequestID since the baseLayer is 
                // changing. This is used by tiles to check if they should 
                // draw themselves.
                this.viewRequestID++;
                if(!this.allOverlays || this.baseLayer.visibility) {
                    this.baseLayer.setVisibility(true);
                }

                // recenter the map
                if (center != null) {
                    // new zoom level derived from old scale
                    var newZoom = this.getZoomForResolution(
                        newResolution || this.resolution, true
                    );
                    // zoom and force zoom change
                    this.setCenter(center, newZoom, false, true);
                }

                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }        
        }
    },


  /********************************************************/
  /*                                                      */
  /*                 Control Functions                    */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Controls to and from the Map         */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: addControl
     * Add the passed over control to the map. Optionally 
     *     position the control at the given pixel.
     * 
     * Parameters:
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     */    
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },
    
    /**
     * APIMethod: addControls
     * Add all of the passed over controls to the map. 
     *     You can pass over an optional second array
     *     with pixel-objects to position the controls.
     *     The indices of the two arrays should match and
     *     you can add null as pixel for those controls 
     *     you want to be autopositioned.   
     *     
     * Parameters:
     * controls - {Array(<OpenLayers.Control>)}
     * pixels - {Array(<OpenLayers.Pixel>)}
     */    
    addControls: function (controls, pixels) {
        var pxs = (arguments.length === 1) ? [] : pixels;
        for (var i=0, len=controls.length; i<len; i++) {
            var ctrl = controls[i];
            var px = (pxs[i]) ? pxs[i] : null;
            this.addControl( ctrl, px );
        }
    },

    /**
     * Method: addControlToMap
     * 
     * Parameters:
     * 
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     */    
    addControlToMap: function (control, px) {
        // If a control doesn't have a div at this point, it belongs in the
        // viewport.
        control.outsideViewport = (control.div != null);
        
        // If the map has a displayProjection, and the control doesn't, set 
        // the display projection.
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }    
        
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if(!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                                    this.controls.length;
                this.viewPortDiv.appendChild( div );
            }
        }
        if(control.autoActivate) {
            control.activate();
        }
    },
    
    /**
     * APIMethod: getControl
     * 
     * Parameters:
     * id - {String} ID of the control to return.
     * 
     * Returns:
     * {<OpenLayers.Control>} The control from the map's list of controls 
     *                        which has a matching 'id'. If none found, 
     *                        returns null.
     */    
    getControl: function (id) {
        var returnControl = null;
        for(var i=0, len=this.controls.length; i<len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    
    /** 
     * APIMethod: removeControl
     * Remove a control from the map. Removes the control both from the map 
     *     object's internal array of controls, as well as from the map's 
     *     viewPort (assuming the control was not added outsideViewport)
     * 
     * Parameters:
     * control - {<OpenLayers.Control>} The control to remove.
     */    
    removeControl: function (control) {
        //make sure control is non-null and actually part of our map
        if ( (control) && (control == this.getControl(control.id)) ) {
            if (control.div && (control.div.parentNode == this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            OpenLayers.Util.removeItem(this.controls, control);
        }
    },

  /********************************************************/
  /*                                                      */
  /*                  Popup Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Popups to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /** 
     * APIMethod: addPopup
     * 
     * Parameters:
     * popup - {<OpenLayers.Popup>}
     * exclusive - {Boolean} If true, closes all other popups first
     */
    addPopup: function(popup, exclusive) {

        if (exclusive) {
            //remove all other popups from screen
            for (var i = this.popups.length - 1; i >= 0; --i) {
                this.removePopup(this.popups[i]);
            }
        }

        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] +
                                    this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    
    /** 
    * APIMethod: removePopup
    * 
    * Parameters:
    * popup - {<OpenLayers.Popup>}
    */
    removePopup: function(popup) {
        OpenLayers.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try { this.layerContainerDiv.removeChild(popup.div); }
            catch (e) { } // Popups sometimes apparently get disconnected
                      // from the layerContainerDiv, and cause complaints.
        }
        popup.map = null;
    },

  /********************************************************/
  /*                                                      */
  /*              Container Div Functions                 */
  /*                                                      */
  /*   The following functions deal with the access to    */
  /*    and maintenance of the size of the container div  */
  /*                                                      */
  /********************************************************/     

    /**
     * APIMethod: getSize
     * 
     * Returns:
     * {<OpenLayers.Size>} An <OpenLayers.Size> object that represents the 
     *                     size, in pixels, of the div into which OpenLayers 
     *                     has been loaded. 
     *                     Note - A clone() of this locally cached variable is
     *                     returned, so as not to allow users to modify it.
     */
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },

    /**
     * APIMethod: updateSize
     * This function should be called by any external code which dynamically
     *     changes the size of the map div (because mozilla wont let us catch 
     *     the "onresize" for an element)
     */
    updateSize: function() {
        // the div might have moved on the page, also
        var newSize = this.getCurrentSize();
        if (newSize && !isNaN(newSize.h) && !isNaN(newSize.w)) {
            this.events.clearMouseCache();
            var oldSize = this.getSize();
            if (oldSize == null) {
                this.size = oldSize = newSize;
            }
            if (!newSize.equals(oldSize)) {
                
                // store the new size
                this.size = newSize;
    
                //notify layers of mapresize
                for(var i=0, len=this.layers.length; i<len; i++) {
                    this.layers[i].onMapResize();                
                }
    
                var center = this.getCachedCenter();
    
                if (this.baseLayer != null && center != null) {
                    var zoom = this.getZoom();
                    this.zoom = null;
                    this.setCenter(center, zoom);
                }
    
            }
        }
    },
    
    /**
     * Method: getCurrentSize
     * 
     * Returns:
     * {<OpenLayers.Size>} A new <OpenLayers.Size> object with the dimensions 
     *                     of the map div
     */
    getCurrentSize: function() {

        var size = new OpenLayers.Size(this.div.clientWidth, 
                                       this.div.clientHeight);

        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = this.div.offsetWidth;
            size.h = this.div.offsetHeight;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },

    /** 
     * Method: calculateBounds
     * 
     * Parameters:
     * center - {<OpenLayers.LonLat>} Default is this.getCenter()
     * resolution - {float} Default is this.getResolution() 
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A bounds based on resolution, center, and 
     *                       current mapsize.
     */
    calculateBounds: function(center, resolution) {

        var extent = null;
        
        if (center == null) {
            center = this.getCachedCenter();
        }                
        if (resolution == null) {
            resolution = this.getResolution();
        }
    
        if ((center != null) && (resolution != null)) {

            var size = this.getSize();
            var w_deg = size.w * resolution;
            var h_deg = size.h * resolution;
        
            extent = new OpenLayers.Bounds(center.lon - w_deg / 2,
                                           center.lat - h_deg / 2,
                                           center.lon + w_deg / 2,
                                           center.lat + h_deg / 2);
        
        }

        return extent;
    },


  /********************************************************/
  /*                                                      */
  /*            Zoom, Center, Pan Functions               */
  /*                                                      */
  /*    The following functions handle the validation,    */
  /*   getting and setting of the Zoom Level and Center   */
  /*       as well as the panning of the Map              */
  /*                                                      */
  /********************************************************/
    /**
     * APIMethod: getCenter
     * 
     * Returns:
     * {<OpenLayers.LonLat>}
     */
    getCenter: function () {
        var center = null;
        var cachedCenter = this.getCachedCenter();
        if (cachedCenter) {
            center = cachedCenter.clone();
        }
        return center;
    },

    /**
     * Method: getCachedCenter
     *
     * Returns:
     * {<OpenLayers.LonLat>}
     */
    getCachedCenter: function() {
        if (!this.center && this.size) {
            this.center = this.getLonLatFromViewPortPx(
                new OpenLayers.Pixel(this.size.w / 2, this.size.h / 2)
            );
        }
        return this.center;
    },

    /**
     * APIMethod: getZoom
     * 
     * Returns:
     * {Integer}
     */
    getZoom: function () {
        return this.zoom;
    },
    
    /** 
     * APIMethod: pan
     * Allows user to pan by a value of screen pixels
     * 
     * Parameters:
     * dx - {Integer}
     * dy - {Integer}
     * options - {Object} Options to configure panning:
     *  - *animate* {Boolean} Use panTo instead of setCenter. Default is true.
     *  - *dragging* {Boolean} Call setCenter with dragging true.  Default is
     *    false.
     */
    pan: function(dx, dy, options) {
        options = OpenLayers.Util.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        if (options.dragging) {
            if (dx != 0 || dy != 0) {
                this.moveByPx(dx, dy);
            }
        } else {
            // getCenter
            var centerPx = this.getViewPortPxFromLonLat(this.getCachedCenter());

            // adjust
            var newCenterPx = centerPx.add(dx, dy);

            if (this.dragging || !newCenterPx.equals(centerPx)) {
                var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
                if (options.animate) {
                    this.panTo(newCenterLonLat);
                } else {
                    this.moveTo(newCenterLonLat);
                    this.dragging = false;
                    this.events.triggerEvent("moveend");
                }    
            }
        }        

   },
   
   /** 
     * APIMethod: panTo
     * Allows user to pan to a new lonlat
     * If the new lonlat is in the current extent the map will slide smoothly
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     */
    panTo: function(lonlat) {
        if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
            if (!this.panTween) {
                this.panTween = new OpenLayers.Tween(this.panMethod);
            }
            var center = this.getCachedCenter();

            // center will not change, don't do nothing
            if (lonlat.equals(center)) {
                return;
            }

            var from = this.getPixelFromLonLat(center);
            var to = this.getPixelFromLonLat(lonlat);
            var vector = { x: to.x - from.x, y: to.y - from.y };
            var last = { x: 0, y: 0 };

            this.panTween.start( { x: 0, y: 0 }, vector, this.panDuration, {
                callbacks: {
                    eachStep: OpenLayers.Function.bind(function(px) {
                        var x = px.x - last.x,
                            y = px.y - last.y;
                        this.moveByPx(x, y);
                        last.x = Math.round(px.x);
                        last.y = Math.round(px.y);
                    }, this),
                    done: OpenLayers.Function.bind(function(px) {
                        this.moveTo(lonlat);
                        this.dragging = false;
                        this.events.triggerEvent("moveend");
                    }, this)
                }
            });
        } else {
            this.setCenter(lonlat);
        }
    },

    /**
     * APIMethod: setCenter
     * Set the map center (and optionally, the zoom level).
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>} The new center location.
     * zoom - {Integer} Optional zoom level.
     * dragging - {Boolean} Specifies whether or not to trigger 
     *                      movestart/end events
     * forceZoomChange - {Boolean} Specifies whether or not to trigger zoom 
     *                             change events (needed on baseLayer change)
     *
     * TBD: reconsider forceZoomChange in 3.0
     */
    setCenter: function(lonlat, zoom, dragging, forceZoomChange) {
        this.panTween && this.panTween.stop();             
        this.moveTo(lonlat, zoom, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange
        });
    },
    
    /** 
     * Method: moveByPx
     * Drag the map by pixels.
     *
     * Parameters:
     * dx - {Number}
     * dy - {Number}
     */
    moveByPx: function(dx, dy) {
        var hw = this.size.w / 2;
        var hh = this.size.h / 2;
        var x = hw + dx;
        var y = hh + dy;
        var wrapDateLine = this.baseLayer.wrapDateLine;
        var xRestriction = 0;
        var yRestriction = 0;
        if (this.restrictedExtent) {
            xRestriction = hw;
            yRestriction = hh;
            // wrapping the date line makes no sense for restricted extents
            wrapDateLine = false;
        }
        dx = wrapDateLine ||
                    x <= this.maxPx.x - xRestriction &&
                    x >= this.minPx.x + xRestriction ? Math.round(dx) : 0;
        dy = y <= this.maxPx.y - yRestriction &&
                    y >= this.minPx.y + yRestriction ? Math.round(dy) : 0;
        var minX = this.minPx.x, maxX = this.maxPx.x;
        if (dx || dy) {
            if (!this.dragging) {
                this.dragging = true;
                this.events.triggerEvent("movestart");
            }
            this.center = null;
            if (dx) {
                this.layerContainerDiv.style.left =
                    parseInt(this.layerContainerDiv.style.left) - dx + "px";
                this.minPx.x -= dx;
                this.maxPx.x -= dx;
                if (wrapDateLine) {
                    if (this.maxPx.x > maxX) {
                        this.maxPx.x -= (maxX - minX);
                    }
                    if (this.minPx.x < minX) {
                        this.minPx.x += (maxX - minX);
                    }
                }
            }
            if (dy) {
                this.layerContainerDiv.style.top =
                    parseInt(this.layerContainerDiv.style.top) - dy + "px";
                this.minPx.y -= dy;
                this.maxPx.y -= dy;
            }
            var layer, i, len;
            for (i=0, len=this.layers.length; i<len; ++i) {
                layer = this.layers[i];
                if (layer.visibility &&
                    (layer === this.baseLayer || layer.inRange)) {
                    layer.moveByPx(dx, dy);
                    layer.events.triggerEvent("move");
                }
            }
            this.events.triggerEvent("move");
        }
    },

    /**
     * Method: moveTo
     *
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * zoom - {Integer}
     * options - {Object}
     */
    moveTo: function(lonlat, zoom, options) {
        if (!options) { 
            options = {};
        }
        if (zoom != null) {
            zoom = parseFloat(zoom);
            if (!this.fractionalZoom) {
                zoom = Math.round(zoom);
            }
        }
        // dragging is false by default
        var dragging = options.dragging || this.dragging;
        // forceZoomChange is false by default
        var forceZoomChange = options.forceZoomChange;

        if (!this.getCachedCenter() && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
            this.center = lonlat.clone();
        }

        if(this.restrictedExtent != null) {
            // In 3.0, decide if we want to change interpretation of maxExtent.
            if(lonlat == null) { 
                lonlat = this.center; 
            }
            if(zoom == null) { 
                zoom = this.getZoom(); 
            }
            var resolution = this.getResolutionForZoom(zoom);
            var extent = this.calculateBounds(lonlat, resolution); 
            if(!this.restrictedExtent.containsBounds(extent)) {
                var maxCenter = this.restrictedExtent.getCenterLonLat(); 
                if(extent.getWidth() > this.restrictedExtent.getWidth()) { 
                    lonlat = new OpenLayers.LonLat(maxCenter.lon, lonlat.lat); 
                } else if(extent.left < this.restrictedExtent.left) {
                    lonlat = lonlat.add(this.restrictedExtent.left -
                                        extent.left, 0); 
                } else if(extent.right > this.restrictedExtent.right) { 
                    lonlat = lonlat.add(this.restrictedExtent.right -
                                        extent.right, 0); 
                } 
                if(extent.getHeight() > this.restrictedExtent.getHeight()) { 
                    lonlat = new OpenLayers.LonLat(lonlat.lon, maxCenter.lat); 
                } else if(extent.bottom < this.restrictedExtent.bottom) { 
                    lonlat = lonlat.add(0, this.restrictedExtent.bottom -
                                        extent.bottom); 
                } 
                else if(extent.top > this.restrictedExtent.top) { 
                    lonlat = lonlat.add(0, this.restrictedExtent.top -
                                        extent.top); 
                } 
            }
        }
        
        var zoomChanged = forceZoomChange || (
                            (this.isValidZoomLevel(zoom)) && 
                            (zoom != this.getZoom()) );

        var centerChanged = (this.isValidLonLat(lonlat)) && 
                            (!lonlat.equals(this.center));

        // if neither center nor zoom will change, no need to do anything
        if (zoomChanged || centerChanged || dragging) {
            dragging || this.events.triggerEvent("movestart");

            if (centerChanged) {
                if (!zoomChanged && this.center) { 
                    // if zoom hasnt changed, just slide layerContainer
                    //  (must be done before setting this.center to new value)
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }

            var res = zoomChanged ?
                this.getResolutionForZoom(zoom) : this.getResolution();
            // (re)set the layerContainerDiv's location
            if (zoomChanged || this.layerContainerOrigin == null) {
                this.layerContainerOrigin = this.getCachedCenter();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top  = "0px";
                var maxExtent = this.getMaxExtent({restricted: true});
                var maxExtentCenter = maxExtent.getCenterLonLat();
                var lonDelta = this.center.lon - maxExtentCenter.lon;
                var latDelta = maxExtentCenter.lat - this.center.lat;
                var extentWidth = Math.round(maxExtent.getWidth() / res);
                var extentHeight = Math.round(maxExtent.getHeight() / res);
                var left = (this.size.w - extentWidth) / 2 - lonDelta / res;
                var top = (this.size.h - extentHeight) / 2 - latDelta / res;
                this.minPx = new OpenLayers.Pixel(left, top);
                this.maxPx = new OpenLayers.Pixel(left + extentWidth, top + extentHeight);
            }

            if (zoomChanged) {
                this.zoom = zoom;
                this.resolution = res;
                // zoom level has changed, increment viewRequestID.
                this.viewRequestID++;
            }    
            
            var bounds = this.getExtent();
            
            //send the move call to the baselayer and all the overlays    

            if(this.baseLayer.visibility) {
                this.baseLayer.moveTo(bounds, zoomChanged, options.dragging);
                options.dragging || this.baseLayer.events.triggerEvent(
                    "moveend", {zoomChanged: zoomChanged}
                );
            }
            
            bounds = this.baseLayer.getExtent();
            
            for (var i=this.layers.length-1; i>=0; --i) {
                var layer = this.layers[i];
                if (layer !== this.baseLayer && !layer.isBaseLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        // the inRange property has changed. If the layer is
                        // no longer in range, we turn it off right away. If
                        // the layer is no longer out of range, the moveTo
                        // call below will turn on the layer.
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false);
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer, property: "visibility"
                        });
                    }
                    if (inRange && layer.visibility) {
                        layer.moveTo(bounds, zoomChanged, options.dragging);
                        options.dragging || layer.events.triggerEvent(
                            "moveend", {zoomChanged: zoomChanged}
                        );
                    }
                }                
            }
            
            this.events.triggerEvent("move");
            dragging || this.events.triggerEvent("moveend");

            if (zoomChanged) {
                //redraw popups
                for (var i=0, len=this.popups.length; i<len; i++) {
                    this.popups[i].updatePosition();
                }
                this.events.triggerEvent("zoomend");
            }
        }
    },

    /** 
     * Method: centerLayerContainer
     * This function takes care to recenter the layerContainerDiv.
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     */
    centerLayerContainer: function (lonlat) {
        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);

        if ((originPx != null) && (newPx != null)) {
            var oldLeft = parseInt(this.layerContainerDiv.style.left);
            var oldTop = parseInt(this.layerContainerDiv.style.top);
            var newLeft = Math.round(originPx.x - newPx.x);
            var newTop = Math.round(originPx.y - newPx.y);
            this.layerContainerDiv.style.left = newLeft + "px";
            this.layerContainerDiv.style.top  = newTop + "px";
            var dx = oldLeft - newLeft;
            var dy = oldTop - newTop;
            this.minPx.x -= dx;
            this.maxPx.x -= dx;
            this.minPx.y -= dy;
            this.maxPx.y -= dy;
        }        
    },

    /**
     * Method: isValidZoomLevel
     * 
     * Parameters:
     * zoomLevel - {Integer}
     * 
     * Returns:
     * {Boolean} Whether or not the zoom level passed in is non-null and 
     *           within the min/max range of zoom levels.
     */
    isValidZoomLevel: function(zoomLevel) {
        return ( (zoomLevel != null) &&
                 (zoomLevel >= 0) && 
                 (zoomLevel < this.getNumZoomLevels()) );
    },
    
    /**
     * Method: isValidLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Returns:
     * {Boolean} Whether or not the lonlat passed in is non-null and within
     *           the maxExtent bounds
     */
    isValidLonLat: function(lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            valid = maxExtent.containsLonLat(lonlat);        
        }
        return valid;
    },

  /********************************************************/
  /*                                                      */
  /*                 Layer Options                        */
  /*                                                      */
  /*    Accessor functions to Layer Options parameters    */
  /*                                                      */
  /********************************************************/
    
    /**
     * APIMethod: getProjection
     * This method returns a string representing the projection. In 
     *     the case of projection support, this will be the srsCode which
     *     is loaded -- otherwise it will simply be the string value that
     *     was passed to the projection at startup.
     *
     * FIXME: In 3.0, we will remove getProjectionObject, and instead
     *     return a Projection object from this function. 
     * 
     * Returns:
     * {String} The Projection string from the base layer or null. 
     */
    getProjection: function() {
        var projection = this.getProjectionObject();
        return projection ? projection.getCode() : null;
    },
    
    /**
     * APIMethod: getProjectionObject
     * Returns the projection obect from the baselayer.
     *
     * Returns:
     * {<OpenLayers.Projection>} The Projection of the base layer.
     */
    getProjectionObject: function() {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },
    
    /**
     * APIMethod: getMaxResolution
     * 
     * Returns:
     * {String} The Map's Maximum Resolution
     */
    getMaxResolution: function() {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },
        
    /**
     * APIMethod: getMaxExtent
     *
     * Parameters:
     * options - {Object} 
     * 
     * Allowed Options:
     * restricted - {Boolean} If true, returns restricted extent (if it is 
     *     available.)
     *
     * Returns:
     * {<OpenLayers.Bounds>} The maxExtent property as set on the current 
     *     baselayer, unless the 'restricted' option is set, in which case
     *     the 'restrictedExtent' option from the map is returned (if it
     *     is set).
     */
    getMaxExtent: function (options) {
        var maxExtent = null;
        if(options && options.restricted && this.restrictedExtent){
            maxExtent = this.restrictedExtent;
        } else if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }        
        return maxExtent;
    },
    
    /**
     * APIMethod: getNumZoomLevels
     * 
     * Returns:
     * {Integer} The total number of zoom levels that can be displayed by the 
     *           current baseLayer.
     */
    getNumZoomLevels: function() {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API?, are all merely wrappers to the    */
  /*       the same calls on whatever layer is set as     */
  /*                the current base layer                */
  /*                                                      */
  /********************************************************/

    /**
     * APIMethod: getExtent
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A Bounds object which represents the lon/lat 
     *                       bounds of the current viewPort. 
     *                       If no baselayer is set, returns null.
     */
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },

    /**
     * APIMethod: getResolution
     * 
     * Returns:
     * {Float} The current resolution of the map. 
     *         If no baselayer is set, returns null.
     */
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        } else if(this.allOverlays === true && this.layers.length > 0) {
            // while adding the 1st layer to the map in allOverlays mode,
            // this.baseLayer is not set yet when we need the resolution
            // for calculateInRange.
            resolution = this.layers[0].getResolution();
        }
        return resolution;
    },

    /**
     * APIMethod: getUnits
     * 
     * Returns:
     * {Float} The current units of the map. 
     *         If no baselayer is set, returns null.
     */
    getUnits: function () {
        var units = null;
        if (this.baseLayer != null) {
            units = this.baseLayer.units;
        }
        return units;
    },

     /**
      * APIMethod: getScale
      * 
      * Returns:
      * {Float} The current scale denominator of the map. 
      *         If no baselayer is set, returns null.
      */
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            scale = OpenLayers.Util.getScaleFromResolution(res, units);
        }
        return scale;
    },


    /**
     * APIMethod: getZoomForExtent
     * 
     * Parameters: 
     * bounds - {<OpenLayers.Bounds>}
     * closest - {Boolean} Find the zoom level that most closely fits the 
     *     specified bounds. Note that this may result in a zoom that does 
     *     not exactly contain the entire extent.
     *     Default is false.
     * 
     * Returns:
     * {Integer} A suitable zoom level for the specified bounds.
     *           If no baselayer is set, returns null.
     */
    getZoomForExtent: function (bounds, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds, closest);
        }
        return zoom;
    },

    /**
     * APIMethod: getResolutionForZoom
     * 
     * Parameter:
     * zoom - {Float}
     * 
     * Returns:
     * {Float} A suitable resolution for the specified zoom.  If no baselayer
     *     is set, returns null.
     */
    getResolutionForZoom: function(zoom) {
        var resolution = null;
        if(this.baseLayer) {
            resolution = this.baseLayer.getResolutionForZoom(zoom);
        }
        return resolution;
    },

    /**
     * APIMethod: getZoomForResolution
     * 
     * Parameter:
     * resolution - {Float}
     * closest - {Boolean} Find the zoom level that corresponds to the absolute 
     *     closest resolution, which may result in a zoom whose corresponding
     *     resolution is actually smaller than we would have desired (if this
     *     is being called from a getZoomForExtent() call, then this means that
     *     the returned zoom index might not actually contain the entire 
     *     extent specified... but it'll be close).
     *     Default is false.
     * 
     * Returns:
     * {Integer} A suitable zoom level for the specified resolution.
     *           If no baselayer is set, returns null.
     */
    getZoomForResolution: function(resolution, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution, closest);
        }
        return zoom;
    },

  /********************************************************/
  /*                                                      */
  /*                  Zooming Functions                   */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API, are all merely wrappers to the     */
  /*               the setCenter() function               */
  /*                                                      */
  /********************************************************/
  
    /** 
     * APIMethod: zoomTo
     * Zoom to a specific zoom level
     * 
     * Parameters:
     * zoom - {Integer}
     */
    zoomTo: function(zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    
    /**
     * APIMethod: zoomIn
     * 
     */
    zoomIn: function() {
        this.zoomTo(this.getZoom() + 1);
    },
    
    /**
     * APIMethod: zoomOut
     * 
     */
    zoomOut: function() {
        this.zoomTo(this.getZoom() - 1);
    },

    /**
     * APIMethod: zoomToExtent
     * Zoom to the passed in bounds, recenter
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * closest - {Boolean} Find the zoom level that most closely fits the 
     *     specified bounds. Note that this may result in a zoom that does 
     *     not exactly contain the entire extent.
     *     Default is false.
     * 
     */
    zoomToExtent: function(bounds, closest) {
        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();

            //fix straddling bounds (in the case of a bbox that straddles the 
            // dateline, it's left and right boundaries will appear backwards. 
            // we fix this by allowing a right value that is greater than the
            // max value at the dateline -- this allows us to pass a valid 
            // bounds to calculate zoom)
            //
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            //if the bounds was straddling (see above), then the center point 
            // we got from it was wrong. So we take our new bounds and ask it
            // for the center. Because our new bounds is at least partially 
            // outside the bounds of maxExtent, the new calculated center 
            // might also be. We don't want to pass a bad center value to 
            // setCenter, so we have it wrap itself across the date line.
            //
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds, closest));
    },

    /** 
     * APIMethod: zoomToMaxExtent
     * Zoom to the full extent and recenter.
     *
     * Parameters:
     * options - 
     * 
     * Allowed Options:
     * restricted - {Boolean} True to zoom to restricted extent if it is 
     *     set. Defaults to true.
     */
    zoomToMaxExtent: function(options) {
        //restricted is true by default
        var restricted = (options) ? options.restricted : true;

        var maxExtent = this.getMaxExtent({
            'restricted': restricted 
        });
        this.zoomToExtent(maxExtent);
    },

    /** 
     * APIMethod: zoomToScale
     * Zoom to a specified scale 
     * 
     * Parameters:
     * scale - {float}
     * closest - {Boolean} Find the zoom level that most closely fits the 
     *     specified scale. Note that this may result in a zoom that does 
     *     not exactly contain the entire extent.
     *     Default is false.
     * 
     */
    zoomToScale: function(scale, closest) {
        var res = OpenLayers.Util.getResolutionFromScale(scale, 
                                                         this.baseLayer.units);
        var size = this.getSize();
        var w_deg = size.w * res;
        var h_deg = size.h * res;
        var center = this.getCachedCenter();

        var extent = new OpenLayers.Bounds(center.lon - w_deg / 2,
                                           center.lat - h_deg / 2,
                                           center.lon + w_deg / 2,
                                           center.lat + h_deg / 2);
        this.zoomToExtent(extent, closest);
    },
    
  /********************************************************/
  /*                                                      */
  /*             Translation Functions                    */
  /*                                                      */
  /*      The following functions translate between       */
  /*           LonLat, LayerPx, and ViewPortPx            */
  /*                                                      */
  /********************************************************/
      
  //
  // TRANSLATION: LonLat <-> ViewPortPx
  //

    /**
     * Method: getLonLatFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     * 
     * Returns:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat which is the passed-in view 
     *                       port <OpenLayers.Pixel>, translated into lon/lat
     *                       by the current base layer.
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null; 
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Returns:
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel which is the passed-in 
     *                      <OpenLayers.LonLat>, translated into view port 
     *                      pixels by the current base layer.
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },

    
  //
  // CONVENIENCE TRANSLATION FUNCTIONS FOR API
  //

    /**
     * APIMethod: getLonLatFromPixel
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat corresponding to the given
     *                       OpenLayers.Pixel, translated into lon/lat by the 
     *                       current base layer
     */
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },

    /**
     * APIMethod: getPixelFromLonLat
     * Returns a pixel location given a map location.  The map location is
     *     translated to an integer pixel location (in viewport pixel
     *     coordinates) by the current base layer.
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>} A map location.
     * 
     * Returns: 
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel corresponding to the 
     *     <OpenLayers.LonLat> translated into view port pixels by the current
     *     base layer.
     */
    getPixelFromLonLat: function (lonlat) {
        var px = this.getViewPortPxFromLonLat(lonlat);
        px.x = Math.round(px.x);
        px.y = Math.round(px.y);
        return px;
    },
    
    /**
     * Method: getGeodesicPixelSize
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>} The pixel to get the geodesic length for. If
     *     not provided, the center pixel of the map viewport will be used.
     * 
     * Returns:
     * {<OpenLayers.Size>} The geodesic size of the pixel in kilometers.
     */
    getGeodesicPixelSize: function(px) {
        var lonlat = px ? this.getLonLatFromPixel(px) : (
            this.getCachedCenter() || new OpenLayers.LonLat(0, 0));
        var res = this.getResolution();
        var left = lonlat.add(-res / 2, 0);
        var right = lonlat.add(res / 2, 0);
        var bottom = lonlat.add(0, -res / 2);
        var top = lonlat.add(0, res / 2);
        var dest = new OpenLayers.Projection("EPSG:4326");
        var source = this.getProjectionObject() || dest;
        if(!source.equals(dest)) {
            left.transform(source, dest);
            right.transform(source, dest);
            bottom.transform(source, dest);
            top.transform(source, dest);
        }
        
        return new OpenLayers.Size(
            OpenLayers.Util.distVincenty(left, right),
            OpenLayers.Util.distVincenty(bottom, top)
        );
    },



  //
  // TRANSLATION: ViewPortPx <-> LayerPx
  //

    /**
     * APIMethod: getViewPortPxFromLayerPx
     * 
     * Parameters:
     * layerPx - {<OpenLayers.Pixel>}
     * 
     * Returns:
     * {<OpenLayers.Pixel>} Layer Pixel translated into ViewPort Pixel 
     *                      coordinates
     */
    getViewPortPxFromLayerPx:function(layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);            
        }
        return viewPortPx;
    },
    
    /**
     * APIMethod: getLayerPxFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     * 
     * Returns:
     * {<OpenLayers.Pixel>} ViewPort Pixel translated into Layer Pixel 
     *                      coordinates
     */
    getLayerPxFromViewPortPx:function(viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    
  //
  // TRANSLATION: LonLat <-> LayerPx
  //

    /**
     * Method: getLonLatFromLayerPx
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {<OpenLayers.LonLat>}
     */
    getLonLatFromLayerPx: function (px) {
       //adjust for displacement of layerContainerDiv
       px = this.getViewPortPxFromLayerPx(px);
       return this.getLonLatFromViewPortPx(px);         
    },
    
    /**
     * APIMethod: getLayerPxFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>} lonlat
     *
     * Returns:
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel which is the passed-in 
     *                      <OpenLayers.LonLat>, translated into layer pixels 
     *                      by the current base layer
     */
    getLayerPxFromLonLat: function (lonlat) {
       //adjust for displacement of layerContainerDiv
       var px = this.getPixelFromLonLat(lonlat);
       return this.getLayerPxFromViewPortPx(px);         
    },

    CLASS_NAME: "OpenLayers.Map"
});

/**
 * Constant: TILE_WIDTH
 * {Integer} 256 Default tile width (unless otherwise specified)
 */
OpenLayers.Map.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT
 * {Integer} 256 Default tile height (unless otherwise specified)
 */
OpenLayers.Map.TILE_HEIGHT = 256;
/* ======================================================================
    OpenLayers/Projection.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Util.js
 */

/**
 * Class: OpenLayers.Projection
 * Class for coordinate transforms between coordinate systems.
 *     Depends on the proj4js library. If proj4js is not available, 
 *     then this is just an empty stub.
 */
OpenLayers.Projection = OpenLayers.Class({

    /**
     * Property: proj
     * {Object} Proj4js.Proj instance.
     */
    proj: null,
    
    /**
     * Property: projCode
     * {String}
     */
    projCode: null,
    
    /**
     * Property: titleRegEx
     * {RegExp} regular expression to strip the title from a proj4js definition
     */
    titleRegEx: /\+title=[^\+]*/,

    /**
     * Constructor: OpenLayers.Projection
     * This class offers several methods for interacting with a wrapped 
     *     pro4js projection object. 
     *
     * Parameters:
     * projCode - {String} A string identifying the Well Known Identifier for
     *    the projection.
     * options - {Object} An optional object to set additional properties
     *     on the layer.
     *
     * Returns:
     * {<OpenLayers.Projection>} A projection object.
     */
    initialize: function(projCode, options) {
        OpenLayers.Util.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode);
        }
    },
    
    /**
     * APIMethod: getCode
     * Get the string SRS code.
     *
     * Returns:
     * {String} The SRS code.
     */
    getCode: function() {
        return this.proj ? this.proj.srsCode : this.projCode;
    },
   
    /**
     * APIMethod: getUnits
     * Get the units string for the projection -- returns null if 
     *     proj4js is not available.
     *
     * Returns:
     * {String} The units abbreviation.
     */
    getUnits: function() {
        return this.proj ? this.proj.units : null;
    },

    /**
     * Method: toString
     * Convert projection to string (getCode wrapper).
     *
     * Returns:
     * {String} The projection code.
     */
    toString: function() {
        return this.getCode();
    },

    /**
     * Method: equals
     * Test equality of two projection instances.  Determines equality based
     *     soley on the projection code.
     *
     * Returns:
     * {Boolean} The two projections are equivalent.
     */
    equals: function(projection) {
        var p = projection, equals = false;
        if (p) {
            if (window.Proj4js && this.proj.defData && p.proj.defData) {
                equals = this.proj.defData.replace(this.titleRegEx, "") ==
                    p.proj.defData.replace(this.titleRegEx, "");
            } else if (p.getCode) {
                var source = this.getCode(), target = p.getCode();
                equals = source == target ||
                    !!OpenLayers.Projection.transforms[source] &&
                    OpenLayers.Projection.transforms[source][target] ===
                        OpenLayers.Projection.nullTransform;
            }
        }
        return equals;   
    },

    /* Method: destroy
     * Destroy projection object.
     */
    destroy: function() {
        delete this.proj;
        delete this.projCode;
    },
    
    CLASS_NAME: "OpenLayers.Projection" 
});     

/**
 * Property: transforms
 * Transforms is an object, with from properties, each of which may
 * have a to property. This allows you to define projections without 
 * requiring support for proj4js to be included.
 *
 * This object has keys which correspond to a 'source' projection object.  The
 * keys should be strings, corresponding to the projection.getCode() value.
 * Each source projection object should have a set of destination projection
 * keys included in the object. 
 * 
 * Each value in the destination object should be a transformation function,
 * where the function is expected to be passed an object with a .x and a .y
 * property.  The function should return the object, with the .x and .y
 * transformed according to the transformation function.
 *
 * Note - Properties on this object should not be set directly.  To add a
 *     transform method to this object, use the <addTransform> method.  For an
 *     example of usage, see the OpenLayers.Layer.SphericalMercator file.
 */
OpenLayers.Projection.transforms = {};

/**
 * APIMethod: addTransform
 * Set a custom transform method between two projections.  Use this method in
 *     cases where the proj4js lib is not available or where custom projections
 *     need to be handled.
 *
 * Parameters:
 * from - {String} The code for the source projection
 * to - {String} the code for the destination projection
 * method - {Function} A function that takes a point as an argument and
 *     transforms that point from the source to the destination projection
 *     in place.  The original point should be modified.
 */
OpenLayers.Projection.addTransform = function(from, to, method) {
    if(!OpenLayers.Projection.transforms[from]) {
        OpenLayers.Projection.transforms[from] = {};
    }
    OpenLayers.Projection.transforms[from][to] = method;
};

/**
 * APIMethod: transform
 * Transform a point coordinate from one projection to another.  Note that
 *     the input point is transformed in place.
 * 
 * Parameters:
 * point - {<OpenLayers.Geometry.Point> | Object} An object with x and y
 *     properties representing coordinates in those dimensions.
 * source - {OpenLayers.Projection} Source map coordinate system
 * dest - {OpenLayers.Projection} Destination map coordinate system
 *
 * Returns:
 * point - {object} A transformed coordinate.  The original point is modified.
 */
OpenLayers.Projection.transform = function(point, source, dest) {
    if (source.proj && dest.proj) {
        point = Proj4js.transform(source.proj, dest.proj, point);
    } else if (source && dest && 
               OpenLayers.Projection.transforms[source.getCode()] && 
               OpenLayers.Projection.transforms[source.getCode()][dest.getCode()]) {
        OpenLayers.Projection.transforms[source.getCode()][dest.getCode()](point); 
    }
    return point;
};

/**
 * APIFunction: nullTransform
 * A null transformation - useful for defining projection aliases when
 * proj4js is not available:
 *
 * (code)
 * OpenLayers.Projection.addTransform("EPSG:4326", "EPSG:3857",
 *     OpenLayers.Layer.SphericalMercator.projectForward);
 * OpenLayers.Projection.addTransform("EPSG:3857", "EPSG:3857",
 *     OpenLayers.Layer.SphericalMercator.projectInverse);
 * OpenLayers.Projection.addTransform("EPSG:3857", "EPSG:900913",
 *     OpenLayers.Projection.nullTransform);
 * OpenLayers.Projection.addTransform("EPSG:900913", "EPSG:3857",
 *     OpenLayers.Projection.nullTransform);
 * (end)
 */
OpenLayers.Projection.nullTransform = function(point) {
    return point;
};
/* ======================================================================
    OpenLayers/Layer.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Map.js
 * @requires OpenLayers/Projection.js
 */

/**
 * Class: OpenLayers.Layer
 */
OpenLayers.Layer = OpenLayers.Class({

    /**
     * APIProperty: id
     * {String}
     */
    id: null,

    /** 
     * APIProperty: name
     * {String}
     */
    name: null,

    /** 
     * APIProperty: div
     * {DOMElement}
     */
    div: null,

    /**
     * Property: opacity
     * {Float} The layer's opacity. Float number between 0.0 and 1.0.
     */
    opacity: null,

    /**
     * APIProperty: alwaysInRange
     * {Boolean} If a layer's display should not be scale-based, this should 
     *     be set to true. This will cause the layer, as an overlay, to always 
     *     be 'active', by always returning true from the calculateInRange() 
     *     function. 
     * 
     *     If not explicitly specified for a layer, its value will be 
     *     determined on startup in initResolutions() based on whether or not 
     *     any scale-specific properties have been set as options on the 
     *     layer. If no scale-specific options have been set on the layer, we 
     *     assume that it should always be in range.
     * 
     *     See #987 for more info.
     */
    alwaysInRange: null,   

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types.  Register a listener
     *     for a particular event with the following syntax:
     * (code)
     * layer.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to layer.events.object.
     * element - {DOMElement} A reference to layer.events.element.
     *
     * Supported map event types:
     * loadstart - Triggered when layer loading starts.
     * loadend - Triggered when layer loading ends.
     * loadcancel - Triggered when layer loading is canceled.
     * visibilitychanged - Triggered when layer visibility is changed.
     * move - Triggered when layer moves (triggered with every mousemove
     *     during a drag).
     * moveend - Triggered when layer is done moving, object passed as
     *     argument has a zoomChanged boolean property which tells that the
     *     zoom has changed.
     * added - Triggered after the layer is added to a map.  Listeners will
     *     receive an object with a *map* property referencing the map and a
     *     *layer* property referencing the layer.
     * removed - Triggered after the layer is removed from the map.  Listeners
     *     will receive an object with a *map* property referencing the map and
     *     a *layer* property referencing the layer.
     */
    EVENT_TYPES: ["loadstart", "loadend", "loadcancel", "visibilitychanged",
                  "move", "moveend", "added", "removed"],

    /**
     * Constant: RESOLUTION_PROPERTIES
     * {Array} The properties that are used for calculating resolutions
     *     information.
     */
    RESOLUTION_PROPERTIES: [
        'scales', 'resolutions',
        'maxScale', 'minScale',
        'maxResolution', 'minResolution',
        'numZoomLevels', 'maxZoomLevel'
    ],

    /**
     * APIProperty: events
     * {<OpenLayers.Events>}
     */
    events: null,

    /**
     * APIProperty: map
     * {<OpenLayers.Map>} This variable is set when the layer is added to 
     *     the map, via the accessor function setMap().
     */
    map: null,
    
    /**
     * APIProperty: isBaseLayer
     * {Boolean} Whether or not the layer is a base layer. This should be set 
     *     individually by all subclasses. Default is false
     */
    isBaseLayer: false,
 
    /**
     * Property: alpha
     * {Boolean} The layer's images have an alpha channel.  Default is false. 
     */
    alpha: false,

    /** 
     * APIProperty: displayInLayerSwitcher
     * {Boolean} Display the layer's name in the layer switcher.  Default is
     *     true.
     */
    displayInLayerSwitcher: true,

    /**
     * APIProperty: visibility
     * {Boolean} The layer should be displayed in the map.  Default is true.
     */
    visibility: true,

    /**
     * APIProperty: attribution
     * {String} Attribution string, displayed when an 
     *     <OpenLayers.Control.Attribution> has been added to the map.
     */
    attribution: null, 

    /** 
     * Property: inRange
     * {Boolean} The current map resolution is within the layer's min/max 
     *     range. This is set in <OpenLayers.Map.setCenter> whenever the zoom 
     *     changes.
     */
    inRange: false,
    
    /**
     * Propery: imageSize
     * {<OpenLayers.Size>} For layers with a gutter, the image is larger than 
     *     the tile by twice the gutter in each dimension.
     */
    imageSize: null,
    
    /**
     * Property: imageOffset
     * {<OpenLayers.Pixel>} For layers with a gutter, the image offset 
     *     represents displacement due to the gutter.
     */
    imageOffset: null,

  // OPTIONS

    /** 
     * Property: options
     * {Object} An optional object whose properties will be set on the layer.
     *     Any of the layer properties can be set as a property of the options
     *     object and sent to the constructor when the layer is created.
     */
    options: null,

    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /**
     * APIProperty: gutter
     * {Integer} Determines the width (in pixels) of the gutter around image
     *     tiles to ignore.  By setting this property to a non-zero value,
     *     images will be requested that are wider and taller than the tile
     *     size by a value of 2 x gutter.  This allows artifacts of rendering
     *     at tile edges to be ignored.  Set a gutter value that is equal to
     *     half the size of the widest symbol that needs to be displayed.
     *     Defaults to zero.  Non-tiled layers always have zero gutter.
     */ 
    gutter: 0, 

    /**
     * APIProperty: projection
     * {<OpenLayers.Projection>} or {<String>} Set in the layer options to
     *     override the default projection string this layer - also set maxExtent,
     *     maxResolution, and units if appropriate. Can be either a string or
     *     an <OpenLayers.Projection> object when created -- will be converted
     *     to an object when setMap is called if a string is passed.  
     */
    projection: null,    
    
    /**
     * APIProperty: units
     * {String} The layer map units.  Defaults to 'degrees'.  Possible values
     *     are 'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches'.
     */
    units: null,

    /**
     * APIProperty: scales
     * {Array}  An array of map scales in descending order.  The values in the
     *     array correspond to the map scale denominator.  Note that these
     *     values only make sense if the display (monitor) resolution of the
     *     client is correctly guessed by whomever is configuring the
     *     application.  In addition, the units property must also be set.
     *     Use <resolutions> instead wherever possible.
     */
    scales: null,

    /**
     * APIProperty: resolutions
     * {Array} A list of map resolutions (map units per pixel) in descending
     *     order.  If this is not set in the layer constructor, it will be set
     *     based on other resolution related properties (maxExtent,
     *     maxResolution, maxScale, etc.).
     */
    resolutions: null,
    
    /**
     * APIProperty: maxExtent
     * {<OpenLayers.Bounds>}  The center of these bounds will not stray outside
     *     of the viewport extent during panning.  In addition, if
     *     <displayOutsideMaxExtent> is set to false, data will not be
     *     requested that falls completely outside of these bounds.
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<OpenLayers.Bounds>}
     */
    minExtent: null,
    
    /**
     * APIProperty: maxResolution
     * {Float} Default max is 360 deg / 256 px, which corresponds to
     *     zoom level 0 on gmaps.  Specify a different value in the layer 
     *     options if you are not using a geographic projection and 
     *     displaying the whole world.
     */
    maxResolution: null,

    /**
     * APIProperty: minResolution
     * {Float}
     */
    minResolution: null,

    /**
     * APIProperty: numZoomLevels
     * {Integer}
     */
    numZoomLevels: null,
    
    /**
     * APIProperty: minScale
     * {Float}
     */
    minScale: null,
    
    /**
     * APIProperty: maxScale
     * {Float}
     */
    maxScale: null,

    /**
     * APIProperty: displayOutsideMaxExtent
     * {Boolean} Request map tiles that are completely outside of the max 
     *     extent for this layer. Defaults to false.
     */
    displayOutsideMaxExtent: false,

    /**
     * APIProperty: wrapDateLine
     * {Boolean} #487 for more info.   
     */
    wrapDateLine: false,
    
    /**
     * APIProperty: transitionEffect
     * {String} The transition effect to use when the map is panned or
     *     zoomed.  
     *
     * There are currently two supported values:
     *  - *null* No transition effect (the default).
     *  - *resize*  Existing tiles are resized on zoom to provide a visual
     *    effect of the zoom having taken place immediately.  As the
     *    new tiles become available, they are drawn over top of the
     *    resized tiles.
     */
    transitionEffect: null,
    
    /**
     * Property: SUPPORTED_TRANSITIONS
     * {Array} An immutable (that means don't change it!) list of supported 
     *     transitionEffect values.
     */
    SUPPORTED_TRANSITIONS: ['resize'],

    /**
     * Property: metadata
     * {Object} This object can be used to store additional information on a
     *     layer object.
     */
    metadata: {},
    
    /**
     * Constructor: OpenLayers.Layer
     *
     * Parameters:
     * name - {String} The layer name
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {

        this.addOptions(options);

        this.name = name;
        
        if (this.id == null) {

            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");

            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.div.dir = "ltr";

            this.events = new OpenLayers.Events(this, this.div, 
                                                this.EVENT_TYPES);
            if(this.eventListeners instanceof Object) {
                this.events.on(this.eventListeners);
            }

        }

        if (this.wrapDateLine) {
            this.displayOutsideMaxExtent = true;
        }
    },
    
    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     *
     * Parameters:
     * setNewBaseLayer - {Boolean} Set a new base layer when this layer has
     *     been destroyed.  Default is true.
     */
    destroy: function(setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;

        if (this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },
    
   /**
    * Method: clone
    *
    * Parameters:
    * obj - {<OpenLayers.Layer>} The layer to be cloned
    *
    * Returns:
    * {<OpenLayers.Layer>} An exact clone of this <OpenLayers.Layer>
    */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer(this.name, this.getOptions());
        }
        
        // catch any randomly tagged-on properties
        OpenLayers.Util.applyDefaults(obj, this);
        
        // a cloned layer should never have its map property set
        //  because it has not been added to a map yet. 
        obj.map = null;
        
        return obj;
    },
    
    /**
     * Method: getOptions
     * Extracts an object from the layer with the properties that were set as
     *     options, but updates them with the values currently set on the
     *     instance.
     * 
     * Returns:
     * {Object} the <options> of the layer, representing the current state.
     */
    getOptions: function() {
        var options = {};
        for(var o in this.options) {
            options[o] = this[o];
        }
        return options;
    },
    
    /** 
     * APIMethod: setName
     * Sets the new layer name for this layer.  Can trigger a changelayer event
     *     on the map.
     *
     * Parameters:
     * newName - {String} The new name.
     */
    setName: function(newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                });
            }
        }
    },    
    
   /**
    * APIMethod: addOptions
    * 
    * Parameters:
    * newOptions - {Object}
    * reinitialize - {Boolean} If set to true, and if resolution options of the
    *     current baseLayer were changed, the map will be recentered to make
    *     sure that it is displayed with a valid resolution, and a
    *     changebaselayer event will be triggered.
    */
    addOptions: function (newOptions, reinitialize) {

        if (this.options == null) {
            this.options = {};
        }

        // update our copy for clone
        OpenLayers.Util.extend(this.options, newOptions);

        // add new options to this
        OpenLayers.Util.extend(this, newOptions);

        // make sure this.projection references a projection object
        if(typeof this.projection == "string") {
            this.projection = new OpenLayers.Projection(this.projection);
        }

        // get the units from the projection, if we have a projection
        // and it it has units
        if(this.projection && this.projection.getUnits()) {
            this.units = this.projection.getUnits();
        }

        // re-initialize resolutions if necessary, i.e. if any of the
        // properties of the "properties" array defined below is set
        // in the new options
        if(this.map) {
            // store current resolution so we can try to restore it later
            var resolution = this.map.getResolution();
            var properties = this.RESOLUTION_PROPERTIES.concat(
                ["projection", "units", "minExtent", "maxExtent"]
            );
            for(var o in newOptions) {
                if(newOptions.hasOwnProperty(o) &&
                   OpenLayers.Util.indexOf(properties, o) >= 0) {

                    this.initResolutions();
                    if (reinitialize && this.map.baseLayer === this) {
                        // update map position, and restore previous resolution
                        this.map.setCenter(this.map.getCenter(),
                            this.map.getZoomForResolution(resolution),
                            false, true
                        );
                        // trigger a changebaselayer event to make sure that
                        // all controls (especially
                        // OpenLayers.Control.PanZoomBar) get notified of the
                        // new options
                        this.map.events.triggerEvent("changebaselayer", {
                            layer: this
                        });
                    }
                    break;
                }
            }
        }
    },

    /**
     * APIMethod: onMapResize
     * This function can be implemented by subclasses
     */
    onMapResize: function() {
        //this function can be implemented by subclasses  
    },

    /**
     * APIMethod: redraw
     * Redraws the layer.  Returns true if the layer was redrawn, false if not.
     *
     * Returns:
     * {Boolean} The layer was redrawn.
     */
    redraw: function() {
        var redrawn = false;
        if (this.map) {

            // min/max Range may have changed
            this.inRange = this.calculateInRange();

            // map's center might not yet be set
            var extent = this.getExtent();

            if (extent && this.inRange && this.visibility) {
                var zoomChanged = true;
                this.moveTo(extent, zoomChanged, false);
                this.events.triggerEvent("moveend",
                    {"zoomChanged": zoomChanged});
                redrawn = true;
            }
        }
        return redrawn;
    },

    /**
     * Method: moveTo
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * zoomChanged - {Boolean} Tells when zoom has changed, as layers have to
     *     do some init work in that case.
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },

    /**
     * Method: moveByPx
     * Move the layer based on pixel vector. To be implemented by subclasses.
     *
     * Parameters:
     * dx - {Number} The x coord of the displacement vector.
     * dy - {Number} The y coord of the displacement vector.
     */
    moveByPx: function(dx, dy) {
    },

    /**
     * Method: setMap
     * Set the map property for the layer. This is done through an accessor
     *     so that subclasses can override this and take special action once 
     *     they have their map variable set. 
     * 
     *     Here we take care to bring over any of the necessary default 
     *     properties from the map. 
     * 
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        if (this.map == null) {
        
            this.map = map;
            
            // grab some essential layer data from the map if it hasn't already
            //  been set
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.minExtent = this.minExtent || this.map.minExtent;

            this.projection = this.projection || this.map.projection;
            if (typeof this.projection == "string") {
                this.projection = new OpenLayers.Projection(this.projection);
            }

            // Check the projection to see if we can get units -- if not, refer
            // to properties.
            this.units = this.projection.getUnits() ||
                         this.units || this.map.units;
            
            this.initResolutions();
            
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            
            // deal with gutters
            this.setTileSize();
        }
    },
    
    /**
     * Method: afterAdd
     * Called at the end of the map.addLayer sequence.  At this point, the map
     *     will have a base layer.  To be overridden by subclasses.
     */
    afterAdd: function() {
    },
    
    /**
     * APIMethod: removeMap
     * Just as setMap() allows each layer the possibility to take a 
     *     personalized action on being added to the map, removeMap() allows
     *     each layer to take a personalized action on being removed from it. 
     *     For now, this will be mostly unused, except for the EventPane layer,
     *     which needs this hook so that it can remove the special invisible
     *     pane. 
     * 
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    removeMap: function(map) {
        //to be overridden by subclasses
    },
    
    /**
     * APIMethod: getImageSize
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>} optional tile bounds, can be used
     *     by subclasses that have to deal with different tile sizes at the
     *     layer extent edges (e.g. Zoomify)
     * 
     * Returns:
     * {<OpenLayers.Size>} The size that the image should be, taking into 
     *     account gutters.
     */ 
    getImageSize: function(bounds) { 
        return (this.imageSize || this.tileSize); 
    },    
  
    /**
     * APIMethod: setTileSize
     * Set the tile size based on the map size.  This also sets layer.imageSize
     *     and layer.imageOffset for use by Tile.Image.
     * 
     * Parameters:
     * size - {<OpenLayers.Size>}
     */
    setTileSize: function(size) {
        var tileSize = (size) ? size :
                                ((this.tileSize) ? this.tileSize :
                                                   this.map.getTileSize());
        this.tileSize = tileSize;
        if(this.gutter) {
          // layers with gutters need non-null tile sizes
          //if(tileSize == null) {
          //    OpenLayers.console.error("Error in layer.setMap() for " +
          //                              this.name + ": layers with " +
          //                              "gutters need non-null tile sizes");
          //}
            this.imageOffset = new OpenLayers.Pixel(-this.gutter, 
                                                    -this.gutter); 
            this.imageSize = new OpenLayers.Size(tileSize.w + (2*this.gutter), 
                                                 tileSize.h + (2*this.gutter)); 
        }
    },

    /**
     * APIMethod: getVisibility
     * 
     * Returns:
     * {Boolean} The layer should be displayed (if in range).
     */
    getVisibility: function() {
        return this.visibility;
    },

    /** 
     * APIMethod: setVisibility
     * Set the visibility flag for the layer and hide/show & redraw 
     *     accordingly. Fire event unless otherwise specified
     * 
     * Note that visibility is no longer simply whether or not the layer's
     *     style.display is set to "block". Now we store a 'visibility' state 
     *     property on the layer class, this allows us to remember whether or 
     *     not we *desire* for a layer to be visible. In the case where the 
     *     map's resolution is out of the layer's range, this desire may be 
     *     subverted.
     * 
     * Parameters:
     * visibility - {Boolean} Whether or not to display the layer (if in range)
     */
    setVisibility: function(visibility) {
        if (visibility != this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visibility"
                });
            }
            this.events.triggerEvent("visibilitychanged");
        }
    },

    /** 
     * APIMethod: display
     * Hide or show the Layer. This is designed to be used internally, and 
     *     is not generally the way to enable or disable the layer. For that,
     *     use the setVisibility function instead..
     * 
     * Parameters:
     * display - {Boolean}
     */
    display: function(display) {
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display && this.calculateInRange()) ? "block" : "none";
        }
    },

    /**
     * APIMethod: calculateInRange
     * 
     * Returns:
     * {Boolean} The layer is displayable at the current map's current
     *     resolution. Note that if 'alwaysInRange' is true for the layer, 
     *     this function will always return true.
     */
    calculateInRange: function() {
        var inRange = false;

        if (this.alwaysInRange) {
            inRange = true;
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                inRange = ( (resolution >= this.minResolution) &&
                            (resolution <= this.maxResolution) );
            }
        }
        return inRange;
    },

    /** 
     * APIMethod: setIsBaseLayer
     * 
     * Parameters:
     * isBaseLayer - {Boolean}
     */
    setIsBaseLayer: function(isBaseLayer) {
        if (isBaseLayer != this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebaselayer", {
                    layer: this
                });
            }
        }
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /********************************************************/
  
    /** 
     * Method: initResolutions
     * This method's responsibility is to set up the 'resolutions' array 
     *     for the layer -- this array is what the layer will use to interface
     *     between the zoom levels of the map and the resolution display 
     *     of the layer.
     * 
     * The user has several options that determine how the array is set up.
     *  
     * For a detailed explanation, see the following wiki from the 
     *     openlayers.org homepage:
     *     http://trac.openlayers.org/wiki/SettingZoomLevels
     */
    initResolutions: function() {

        // ok we want resolutions, here's our strategy:
        //
        // 1. if resolutions are defined in the layer config, use them
        // 2. else, if scales are defined in the layer config then derive
        //    resolutions from these scales
        // 3. else, attempt to calculate resolutions from maxResolution,
        //    minResolution, numZoomLevels, maxZoomLevel set in the
        //    layer config
        // 4. if we still don't have resolutions, and if resolutions
        //    are defined in the same, use them
        // 5. else, if scales are defined in the map then derive
        //    resolutions from these scales
        // 6. else, attempt to calculate resolutions from maxResolution,
        //    minResolution, numZoomLevels, maxZoomLevel set in the
        //    map
        // 7. hope for the best!

        var i, len, p;
        var props = {}, alwaysInRange = true;

        // get resolution data from layer config
        // (we also set alwaysInRange in the layer as appropriate)
        for(i=0, len=this.RESOLUTION_PROPERTIES.length; i<len; i++) {
            p = this.RESOLUTION_PROPERTIES[i];
            props[p] = this.options[p];
            if(alwaysInRange && this.options[p]) {
                alwaysInRange = false;
            }
        }
        if(this.alwaysInRange == null) {
            this.alwaysInRange = alwaysInRange;
        }

        // if we don't have resolutions then attempt to derive them from scales
        if(props.resolutions == null) {
            props.resolutions = this.resolutionsFromScales(props.scales);
        }

        // if we still don't have resolutions then attempt to calculate them
        if(props.resolutions == null) {
            props.resolutions = this.calculateResolutions(props);
        }

        // if we couldn't calculate resolutions then we look at we have
        // in the map
        if(props.resolutions == null) {
            for(i=0, len=this.RESOLUTION_PROPERTIES.length; i<len; i++) {
                p = this.RESOLUTION_PROPERTIES[i];
                props[p] = this.options[p] != null ?
                    this.options[p] : this.map[p];
            }
            if(props.resolutions == null) {
                props.resolutions = this.resolutionsFromScales(props.scales);
            }
            if(props.resolutions == null) {
                props.resolutions = this.calculateResolutions(props);
            }
        }

        // ok, we new need to set properties in the instance

        // get maxResolution from the config if it's defined there
        var maxResolution;
        if(this.options.maxResolution &&
           this.options.maxResolution !== "auto") {
            maxResolution = this.options.maxResolution;
        }
        if(this.options.minScale) {
            maxResolution = OpenLayers.Util.getResolutionFromScale(
                this.options.minScale, this.units);
        }

        // get minResolution from the config if it's defined there
        var minResolution;
        if(this.options.minResolution &&
           this.options.minResolution !== "auto") {
            minResolution = this.options.minResolution;
        }
        if(this.options.maxScale) {
            minResolution = OpenLayers.Util.getResolutionFromScale(
                this.options.maxScale, this.units);
        }

        if(props.resolutions) {

            //sort resolutions array descendingly
            props.resolutions.sort(function(a, b) {
                return (b - a);
            });

            // if we still don't have a maxResolution get it from the
            // resolutions array
            if(!maxResolution) {
                maxResolution = props.resolutions[0];
            }

            // if we still don't have a minResolution get it from the
            // resolutions array
            if(!minResolution) {
                var lastIdx = props.resolutions.length - 1;
                minResolution = props.resolutions[lastIdx];
            }
        }

        this.resolutions = props.resolutions;
        if(this.resolutions) {
            len = this.resolutions.length;
            this.scales = new Array(len);
            for(i=0; i<len; i++) {
                this.scales[i] = OpenLayers.Util.getScaleFromResolution(
                    this.resolutions[i], this.units);
            }
            this.numZoomLevels = len;
        }
        this.minResolution = minResolution;
        if(minResolution) {
            this.maxScale = OpenLayers.Util.getScaleFromResolution(
                minResolution, this.units);
        }
        this.maxResolution = maxResolution;
        if(maxResolution) {
            this.minScale = OpenLayers.Util.getScaleFromResolution(
                maxResolution, this.units);
        }
    },

    /**
     * Method: resolutionsFromScales
     * Derive resolutions from scales.
     *
     * Parameters:
     * scales - {Array(Number)} Scales
     *
     * Returns
     * {Array(Number)} Resolutions
     */
    resolutionsFromScales: function(scales) {
        if(scales == null) {
            return;
        }
        var resolutions, i, len;
        len = scales.length;
        resolutions = new Array(len);
        for(i=0; i<len; i++) {
            resolutions[i] = OpenLayers.Util.getResolutionFromScale(
                scales[i], this.units);
        }
        return resolutions;
    },

    /**
     * Method: calculateResolutions
     * Calculate resolutions based on the provided properties.
     *
     * Parameters:
     * props - {Object} Properties
     *
     * Return:
     * {Array({Number})} Array of resolutions.
     */
    calculateResolutions: function(props) {

        var viewSize, wRes, hRes;

        // determine maxResolution
        var maxResolution = props.maxResolution;
        if(props.minScale != null) {
            maxResolution =
                OpenLayers.Util.getResolutionFromScale(props.minScale,
                                                       this.units);
        } else if(maxResolution == "auto" && this.maxExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.maxExtent.getWidth() / viewSize.w;
            hRes = this.maxExtent.getHeight() / viewSize.h;
            maxResolution = Math.max(wRes, hRes);
        }

        // determine minResolution
        var minResolution = props.minResolution;
        if(props.maxScale != null) {
            minResolution =
                OpenLayers.Util.getResolutionFromScale(props.maxScale,
                                                       this.units);
        } else if(props.minResolution == "auto" && this.minExtent != null) {
            viewSize = this.map.getSize();
            wRes = this.minExtent.getWidth() / viewSize.w;
            hRes = this.minExtent.getHeight()/ viewSize.h;
            minResolution = Math.max(wRes, hRes);
        }

        // determine numZoomLevels
        var maxZoomLevel = props.maxZoomLevel;
        var numZoomLevels = props.numZoomLevels;
        if(typeof minResolution === "number" &&
           typeof maxResolution === "number" && numZoomLevels === undefined) {
            var ratio = maxResolution / minResolution;
            numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
        } else if(numZoomLevels === undefined && maxZoomLevel != null) {
            numZoomLevels = maxZoomLevel + 1;
        }

        // are we able to calculate resolutions?
        if(typeof numZoomLevels !== "number" || numZoomLevels <= 0 ||
           (typeof maxResolution !== "number" &&
                typeof minResolution !== "number")) {
            return;
        }

        // now we have numZoomLevels and at least one of maxResolution
        // or minResolution, we can populate the resolutions array

        var resolutions = new Array(numZoomLevels);
        var base = 2;
        if(typeof minResolution == "number" &&
           typeof maxResolution == "number") {
            // if maxResolution and minResolution are set, we calculate
            // the base for exponential scaling that starts at
            // maxResolution and ends at minResolution in numZoomLevels
            // steps.
            base = Math.pow(
                    (maxResolution / minResolution),
                (1 / (numZoomLevels - 1))
            );
        }

        var i;
        if(typeof maxResolution === "number") {
            for(i=0; i<numZoomLevels; i++) {
                resolutions[i] = maxResolution / Math.pow(base, i);
            }
        } else {
            for(i=0; i<numZoomLevels; i++) {
                resolutions[numZoomLevels - 1 - i] =
                    minResolution * Math.pow(base, i);
            }
        }

        return resolutions;
    },

    /**
     * APIMethod: getResolution
     * 
     * Returns:
     * {Float} The currently selected resolution of the map, taken from the
     *     resolutions array, indexed by current zoom level.
     */
    getResolution: function() {
        var zoom = this.map.getZoom();
        return this.getResolutionForZoom(zoom);
    },

    /** 
     * APIMethod: getExtent
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A Bounds object which represents the lon/lat 
     *     bounds of the current viewPort.
     */
    getExtent: function() {
        // just use stock map calculateBounds function -- passing no arguments
        //  means it will user map's current center & resolution
        //
        return this.map.calculateBounds();
    },

    /**
     * APIMethod: getZoomForExtent
     * 
     * Parameters:
     * extent - {<OpenLayers.Bounds>}
     * closest - {Boolean} Find the zoom level that most closely fits the 
     *     specified bounds. Note that this may result in a zoom that does 
     *     not exactly contain the entire extent.
     *     Default is false.
     *
     * Returns:
     * {Integer} The index of the zoomLevel (entry in the resolutions array) 
     *     for the passed-in extent. We do this by calculating the ideal 
     *     resolution for the given extent (based on the map size) and then 
     *     calling getZoomForResolution(), passing along the 'closest'
     *     parameter.
     */
    getZoomForExtent: function(extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max( extent.getWidth()  / viewSize.w,
                                        extent.getHeight() / viewSize.h );

        return this.getZoomForResolution(idealResolution, closest);
    },
    
    /** 
     * Method: getDataExtent
     * Calculates the max extent which includes all of the data for the layer.
     *     This function is to be implemented by subclasses.
     * 
     * Returns:
     * {<OpenLayers.Bounds>}
     */
    getDataExtent: function () {
        //to be implemented by subclasses
    },

    /**
     * APIMethod: getResolutionForZoom
     * 
     * Parameter:
     * zoom - {Float}
     * 
     * Returns:
     * {Float} A suitable resolution for the specified zoom.
     */
    getResolutionForZoom: function(zoom) {
        zoom = Math.max(0, Math.min(zoom, this.resolutions.length - 1));
        var resolution;
        if(this.map.fractionalZoom) {
            var low = Math.floor(zoom);
            var high = Math.ceil(zoom);
            resolution = this.resolutions[low] -
                ((zoom-low) * (this.resolutions[low]-this.resolutions[high]));
        } else {
            resolution = this.resolutions[Math.round(zoom)];
        }
        return resolution;
    },

    /**
     * APIMethod: getZoomForResolution
     * 
     * Parameters:
     * resolution - {Float}
     * closest - {Boolean} Find the zoom level that corresponds to the absolute 
     *     closest resolution, which may result in a zoom whose corresponding
     *     resolution is actually smaller than we would have desired (if this
     *     is being called from a getZoomForExtent() call, then this means that
     *     the returned zoom index might not actually contain the entire 
     *     extent specified... but it'll be close).
     *     Default is false.
     * 
     * Returns:
     * {Integer} The index of the zoomLevel (entry in the resolutions array) 
     *     that corresponds to the best fit resolution given the passed in 
     *     value and the 'closest' specification.
     */
    getZoomForResolution: function(resolution, closest) {
        var zoom, i, len;
        if(this.map.fractionalZoom) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for(i=0, len=this.resolutions.length; i<len; ++i) {
                res = this.resolutions[i];
                if(res >= resolution) {
                    highRes = res;
                    lowZoom = i;
                }
                if(res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break;
                }
            }
            var dRes = highRes - lowRes;
            if(dRes > 0) {
                zoom = lowZoom + ((highRes - resolution) / dRes);
            } else {
                zoom = lowZoom;
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for(i=0, len=this.resolutions.length; i<len; i++) {            
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break;
                    }
                    minDiff = diff;
                } else {
                    if (this.resolutions[i] < resolution) {
                        break;
                    }
                }
            }
            zoom = Math.max(0, i-1);
        }
        return zoom;
    },
    
    /**
     * APIMethod: getLonLatFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat which is the passed-in 
     *     view port <OpenLayers.Pixel>, translated into lon/lat by the layer.
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        var map = this.map;
        if (viewPortPx != null && map.minPx) {
            var res = map.getResolution();
            var maxExtent = map.getMaxExtent({restricted: true});
            var lon = (viewPortPx.x - map.minPx.x) * res + maxExtent.left;
            var lat = (map.minPx.y - viewPortPx.y) * res + maxExtent.top;
            lonlat = new OpenLayers.LonLat(lon, lat);

            if (this.wrapDateLine) {
                lonlat = lonlat.wrapDateLine(this.maxExtent);
            }
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     * Returns a pixel location given a map location.  This method will return
     *     fractional pixel values.
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     *
     * Returns: 
     * {<OpenLayers.Pixel>} An <OpenLayers.Pixel> which is the passed-in 
     *     <OpenLayers.LonLat>,translated into view port pixels.
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (lonlat != null) {
            var resolution = this.map.getResolution();
            var extent = this.map.getExtent();
            px = new OpenLayers.Pixel(
                (1/resolution * (lonlat.lon - extent.left)),
                (1/resolution * (extent.top - lonlat.lat))
            );    
        }
        return px;
    },
    
    /**
     * APIMethod: setOpacity
     * Sets the opacity for the entire layer (all images)
     * 
     * Parameter:
     * opacity - {Float}
     */
    setOpacity: function(opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            for(var i=0, len=this.div.childNodes.length; i<len; ++i) {
                var element = this.div.childNodes[i].firstChild;
                OpenLayers.Util.modifyDOMElement(element, null, null, null, 
                                                 null, null, null, opacity);
            }
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "opacity"
                });
            }
        }
    },

    /**
     * Method: getZIndex
     * 
     * Returns: 
     * {Integer} the z-index of this layer
     */    
    getZIndex: function () {
        return this.div.style.zIndex;
    },

    /**
     * Method: setZIndex
     * 
     * Parameters: 
     * zIndex - {Integer}
     */    
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },

    /**
     * Method: adjustBounds
     * This function will take a bounds, and if wrapDateLine option is set
     *     on the layer, it will return a bounds which is wrapped around the 
     *     world. We do not wrap for bounds which *cross* the 
     *     maxExtent.left/right, only bounds which are entirely to the left 
     *     or entirely to the right.
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    adjustBounds: function (bounds) {

        if (this.gutter) {
            // Adjust the extent of a bounds in map units by the 
            // layer's gutter in pixels.
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new OpenLayers.Bounds(bounds.left - mapGutter,
                                           bounds.bottom - mapGutter,
                                           bounds.right + mapGutter,
                                           bounds.top + mapGutter);
        }

        if (this.wrapDateLine) {
            // wrap around the date line, within the limits of rounding error
            var wrappingOptions = { 
                'rightTolerance':this.getResolution(),
                'leftTolerance':this.getResolution()
            };    
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
                              
        }
        return bounds;
    },

    CLASS_NAME: "OpenLayers.Layer"
});
/* ======================================================================
    OpenLayers/Layer/HTTPRequest.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Layer.js
 */

/**
 * Class: OpenLayers.Layer.HTTPRequest
 * 
 * Inherits from: 
 *  - <OpenLayers.Layer>
 */
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {

    /** 
     * Constant: URL_HASH_FACTOR
     * {Float} Used to hash URL param strings for multi-WMS server selection.
     *         Set to the Golden Ratio per Knuth's recommendation.
     */
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,

    /** 
     * Property: url
     * {Array(String) or String} This is either an array of url strings or 
     *                           a single url string. 
     */
    url: null,

    /** 
     * Property: params
     * {Object} Hashtable of key/value parameters
     */
    params: null,
    
    /** 
     * APIProperty: reproject
     * *Deprecated*. See http://docs.openlayers.org/library/spherical_mercator.html
     * for information on the replacement for this functionality. 
     * {Boolean} Whether layer should reproject itself based on base layer 
     *           locations. This allows reprojection onto commercial layers. 
     *           Default is false: Most layers can't reproject, but layers 
     *           which can create non-square geographic pixels can, like WMS.
     *           
     */
    reproject: false,

    /**
     * Constructor: OpenLayers.Layer.HTTPRequest
     * 
     * Parameters:
     * name - {String}
     * url - {Array(String) or String}
     * params - {Object}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        OpenLayers.Layer.prototype.initialize.apply(this, [name, options]);
        this.url = url;
        this.params = OpenLayers.Util.extend( {}, params);
    },

    /**
     * APIMethod: destroy
     */
    destroy: function() {
        this.url = null;
        this.params = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments); 
    },
    
    /**
     * APIMethod: clone
     * 
     * Parameters:
     * obj - {Object}
     * 
     * Returns:
     * {<OpenLayers.Layer.HTTPRequest>} An exact clone of this 
     *                                  <OpenLayers.Layer.HTTPRequest>
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.HTTPRequest(this.name,
                                                   this.url,
                                                   this.params,
                                                   this.getOptions());
        }
        
        //get all additions from superclasses
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        
        return obj;
    },

    /** 
     * APIMethod: setUrl
     * 
     * Parameters:
     * newUrl - {String}
     */
    setUrl: function(newUrl) {
        this.url = newUrl;
    },

    /**
     * APIMethod: mergeNewParams
     * 
     * Parameters:
     * newParams - {Object}
     *
     * Returns:
     * redrawn: {Boolean} whether the layer was actually redrawn.
     */
    mergeNewParams:function(newParams) {
        this.params = OpenLayers.Util.extend(this.params, newParams);
        var ret = this.redraw();
        if(this.map != null) {
            this.map.events.triggerEvent("changelayer", {
                layer: this,
                property: "params"
            });
        }
        return ret;
    },

    /**
     * APIMethod: redraw
     * Redraws the layer.  Returns true if the layer was redrawn, false if not.
     *
     * Parameters:
     * force - {Boolean} Force redraw by adding random parameter.
     *
     * Returns:
     * {Boolean} The layer was redrawn.
     */
    redraw: function(force) { 
        if (force) {
            return this.mergeNewParams({"_olSalt": Math.random()});
        } else {
            return OpenLayers.Layer.prototype.redraw.apply(this, []);
        }
    },
    
    /**
     * Method: selectUrl
     * selectUrl() implements the standard floating-point multiplicative
     *     hash function described by Knuth, and hashes the contents of the 
     *     given param string into a float between 0 and 1. This float is then
     *     scaled to the size of the provided urls array, and used to select
     *     a URL.
     *
     * Parameters:
     * paramString - {String}
     * urls - {Array(String)}
     * 
     * Returns:
     * {String} An entry from the urls array, deterministically selected based
     *          on the paramString.
     */
    selectUrl: function(paramString, urls) {
        var product = 1;
        for (var i=0, len=paramString.length; i<len; i++) { 
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR; 
            product -= Math.floor(product); 
        }
        return urls[Math.floor(product * urls.length)];
    },

    /** 
     * Method: getFullRequestString
     * Combine url with layer's params and these newParams. 
     *   
     *    does checking on the serverPath variable, allowing for cases when it 
     *     is supplied with trailing ? or &, as well as cases where not. 
     *
     *    return in formatted string like this:
     *        "server?key1=value1&key2=value2&key3=value3"
     * 
     * WARNING: The altUrl parameter is deprecated and will be removed in 3.0.
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String} Use this as the url instead of the layer's url
     *   
     * Returns: 
     * {String}
     */
    getFullRequestString:function(newParams, altUrl) {

        // if not altUrl passed in, use layer's url
        var url = altUrl || this.url;
        
        // create a new params hashtable with all the layer params and the 
        // new params together. then convert to string
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        
        // if url is not a string, it should be an array of strings, 
        // in which case we will deterministically select one of them in 
        // order to evenly distribute requests to different urls.
        //
        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(paramsString, url);
        }   
 
        // ignore parameters that are already in the url search string
        var urlParams = 
            OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(url));
        for(var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = OpenLayers.Util.getParameterString(allParams);
        
        return OpenLayers.Util.urlAppend(url, paramsString);
    },

    CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
});
/* ======================================================================
    OpenLayers/Layer/Grid.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Layer/HTTPRequest.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: OpenLayers.Layer.Grid
 * Base class for layers that use a lattice of tiles.  Create a new grid
 * layer with the <OpenLayers.Layer.Grid> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Layer.HTTPRequest>
 */
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
    
    /**
     * APIProperty: tileSize
     * {<OpenLayers.Size>}
     */
    tileSize: null,

    /**
     * Property: tileOriginCorner
     * {String} If the <tileOrigin> property is not provided, the tile origin 
     *     will be derived from the layer's <maxExtent>.  The corner of the 
     *     <maxExtent> used is determined by this property.  Acceptable values
     *     are "tl" (top left), "tr" (top right), "bl" (bottom left), and "br"
     *     (bottom right).  Default is "bl".
     */
    tileOriginCorner: "bl",
    
    /**
     * APIProperty: tileOrigin
     * {<OpenLayers.LonLat>} Optional origin for aligning the grid of tiles.
     *     If provided, requests for tiles at all resolutions will be aligned
     *     with this location (no tiles shall overlap this location).  If
     *     not provided, the grid of tiles will be aligned with the layer's
     *     <maxExtent>.  Default is ``null``.
     */
    tileOrigin: null,
    
    /** APIProperty: tileOptions
     *  {Object} optional configuration options for <OpenLayers.Tile> instances
     *  created by this Layer, if supported by the tile class.
     */
    tileOptions: null,
    
    /**
     * Property: grid
     * {Array(Array(<OpenLayers.Tile>))} This is an array of rows, each row is 
     *     an array of tiles.
     */
    grid: null,

    /**
     * APIProperty: singleTile
     * {Boolean} Moves the layer into single-tile mode, meaning that one tile 
     *     will be loaded. The tile's size will be determined by the 'ratio'
     *     property. When the tile is dragged such that it does not cover the 
     *     entire viewport, it is reloaded.
     */
    singleTile: false,

    /** APIProperty: ratio
     *  {Float} Used only when in single-tile mode, this specifies the 
     *          ratio of the size of the single tile to the size of the map.
     */
    ratio: 1.5,

    /**
     * APIProperty: buffer
     * {Integer} Used only when in gridded mode, this specifies the number of 
     *           extra rows and colums of tiles on each side which will
     *           surround the minimum grid tiles to cover the map.
     *           For very slow loading layers, a larger value may increase
     *           performance somewhat when dragging, but will increase bandwidth
     *           use significantly. 
     */
    buffer: 0,

    /**
     * APIProperty: numLoadingTiles
     * {Integer} How many tiles are still loading?
     */
    numLoadingTiles: 0,

    /**
     * APIProperty: tileLoadingDelay
     * {Integer} - Number of milliseconds before we shift and load
     *     tiles. Default is 100.
     */
    tileLoadingDelay: 100,

    /**
     * Property: timerId
     * {Number} - The id of the tileLoadingDelay timer.
     */
    timerId: null,

    /**
     * Constructor: OpenLayers.Layer.Grid
     * Create a new grid layer
     *
     * Parameters:
     * name - {String}
     * url - {String}
     * params - {Object}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, 
                                                                arguments);
        
        //grid layers will trigger 'tileloaded' when each new tile is 
        // loaded, as a means of progress update to listeners.
        // listeners can access 'numLoadingTiles' if they wish to keep track
        // of the loading progress
        //
        this.events.addEventType("tileloaded");

        this.grid = [];
        
        this._moveGriddedTiles = OpenLayers.Function.bind(
            this.moveGriddedTiles, this
        );
    },

    /**
     * Method: removeMap
     * Called when the layer is removed from the map.
     *
     * Parameters:
     * map - {<OpenLayers.Map>} The map.
     */
    removeMap: function(map) {
        if(this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    },

    /**
     * APIMethod: destroy
     * Deconstruct the layer and clear the grid.
     */
    destroy: function() {
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments); 
    },

    /**
     * Method: clearGrid
     * Go through and remove all tiles from the grid, calling
     *    destroy() on each of them to kill circular references
     */
    clearGrid:function() {
        if (this.grid) {
            for(var iRow=0, len=this.grid.length; iRow<len; iRow++) {
                var row = this.grid[iRow];
                for(var iCol=0, clen=row.length; iCol<clen; iCol++) {
                    var tile = row[iCol];
                    this.removeTileMonitoringHooks(tile);
                    tile.destroy();
                }
            }
            this.grid = [];
        }
    },

    /**
     * APIMethod: clone
     * Create a clone of this layer
     *
     * Parameters:
     * obj - {Object} Is this ever used?
     * 
     * Returns:
     * {<OpenLayers.Layer.Grid>} An exact clone of this OpenLayers.Layer.Grid
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.Grid(this.name,
                                            this.url,
                                            this.params,
                                            this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        
        // we do not want to copy reference to grid, so we make a new array
        obj.grid = [];

        return obj;
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
        OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        
        bounds = bounds || this.map.getExtent();

        if (bounds != null) {
             
            // if grid is empty or zoom has changed, we *must* re-tile
            var forceReTile = !this.grid.length || zoomChanged;

            // total bounds of the tiles
            var tilesBounds = this.getTilesBounds();            
      
            if (this.singleTile) {
                
                // We want to redraw whenever even the slightest part of the 
                //  current bounds is not contained by our tile.
                //  (thus, we do not specify partial -- its default is false)
                if ( forceReTile || 
                     (!dragging && !tilesBounds.containsBounds(bounds))) {
                    this.initSingleTile(bounds);
                }
            } else {
             
                // if the bounds have changed such that they are not even 
                //  *partially* contained by our tiles (IE user has 
                //  programmatically panned to the other side of the earth) 
                //  then we want to reTile (thus, partial true).  
                //
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    this.initGriddedTiles(bounds);
                } else {
                    this.scheduleMoveGriddedTiles();
                }
            }
        }
    },

    /**
     * Method: moveByPx
     * Move the layer based on pixel vector.
     *
     * Parameters:
     * dx - {Number}
     * dy - {Number}
     */
    moveByPx: function(dx, dy) {
        if (!this.singleTile) {
            this.scheduleMoveGriddedTiles();
        }
    },

    /**
     * Method: scheduleMoveGriddedTiles
     * Schedule the move of tiles.
     */
    scheduleMoveGriddedTiles: function() {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
        }
        this.timerId = window.setTimeout(
            this._moveGriddedTiles,
            this.tileLoadingDelay
        );
    },
    
    /**
     * APIMethod: setTileSize
     * Check if we are in singleTile mode and if so, set the size as a ratio
     *     of the map size (as specified by the layer's 'ratio' property).
     * 
     * Parameters:
     * size - {<OpenLayers.Size>}
     */
    setTileSize: function(size) { 
        if (this.singleTile) {
            size = this.map.getSize();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        } 
        OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
        
    /**
     * Method: getGridBounds
     * Deprecated. This function will be removed in 3.0. Please use 
     *     getTilesBounds() instead.
     * 
     * Returns:
     * {<OpenLayers.Bounds>} A Bounds object representing the bounds of all the
     * currently loaded tiles (including those partially or not at all seen 
     * onscreen)
     */
    getGridBounds: function() {
        var msg = "The getGridBounds() function is deprecated. It will be " +
                  "removed in 3.0. Please use getTilesBounds() instead.";
        OpenLayers.Console.warn(msg);
        return this.getTilesBounds();
    },

    /**
     * APIMethod: getTilesBounds
     * Return the bounds of the tile grid.
     *
     * Returns:
     * {<OpenLayers.Bounds>} A Bounds object representing the bounds of all the
     *     currently loaded tiles (including those partially or not at all seen 
     *     onscreen).
     */
    getTilesBounds: function() {    
        var bounds = null; 
        
        if (this.grid.length) {
            var bottom = this.grid.length - 1;
            var bottomLeftTile = this.grid[bottom][0];
    
            var right = this.grid[0].length - 1; 
            var topRightTile = this.grid[0][right];
    
            bounds = new OpenLayers.Bounds(bottomLeftTile.bounds.left, 
                                           bottomLeftTile.bounds.bottom,
                                           topRightTile.bounds.right, 
                                           topRightTile.bounds.top);
            
        }   
        return bounds;
    },

    /**
     * Method: initSingleTile
     * 
     * Parameters: 
     * bounds - {<OpenLayers.Bounds>}
     */
    initSingleTile: function(bounds) {

        //determine new tile bounds
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
                                       
        var tileBounds = 
            new OpenLayers.Bounds(center.lon - (tileWidth/2),
                                  center.lat - (tileHeight/2),
                                  center.lon + (tileWidth/2),
                                  center.lat + (tileHeight/2));
  
        var ul = new OpenLayers.LonLat(tileBounds.left, tileBounds.top);
        var px = this.map.getLayerPxFromLonLat(ul);

        if (!this.grid.length) {
            this.grid[0] = [];
        }

        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }           
        
        //remove all but our single tile
        this.removeExcessTiles(1,1);
    },

    /** 
     * Method: calculateGridLayout
     * Generate parameters for the grid layout.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bound>}
     * origin - {<OpenLayers.LonLat>}
     * resolution - {Number}
     *
     * Returns:
     * Object containing properties tilelon, tilelat, tileoffsetlat,
     * tileoffsetlat, tileoffsetx, tileoffsety
     */
    calculateGridLayout: function(bounds, origin, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        
        var offsetlon = bounds.left - origin.lon;
        var tilecol = Math.floor(offsetlon/tilelon) - this.buffer;
        var tilecolremain = offsetlon/tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = origin.lon + tilecol * tilelon;
        
        var offsetlat = bounds.top - (origin.lat + tilelat);  
        var tilerow = Math.ceil(offsetlat/tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat/tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = origin.lat + tilerow * tilelat;
        
        return { 
          tilelon: tilelon, tilelat: tilelat,
          tileoffsetlon: tileoffsetlon, tileoffsetlat: tileoffsetlat,
          tileoffsetx: tileoffsetx, tileoffsety: tileoffsety
        };

    },
    
    /**
     * Method: getTileOrigin
     * Determine the origin for aligning the grid of tiles.  If a <tileOrigin>
     *     property is supplied, that will be returned.  Otherwise, the origin
     *     will be derived from the layer's <maxExtent> property.  In this case,
     *     the tile origin will be the corner of the <maxExtent> given by the 
     *     <tileOriginCorner> property.
     *
     * Returns:
     * {<OpenLayers.LonLat>} The tile origin.
     */
    getTileOrigin: function() {
        var origin = this.tileOrigin;
        if (!origin) {
            var extent = this.getMaxExtent();
            var edges = ({
                "tl": ["left", "top"],
                "tr": ["right", "top"],
                "bl": ["left", "bottom"],
                "br": ["right", "bottom"]
            })[this.tileOriginCorner];
            origin = new OpenLayers.LonLat(extent[edges[0]], extent[edges[1]]);
        }
        return origin;
    },

    /**
     * Method: initGriddedTiles
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    initGriddedTiles:function(bounds) {
        
        // work out mininum number of rows and columns; this is the number of
        // tiles required to cover the viewport plus at least one for panning

        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h/this.tileSize.h) + 
                      Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w/this.tileSize.w) +
                      Math.max(1, 2 * this.buffer);
        
        var origin = this.getTileOrigin();
        var resolution = this.map.getResolution();
        
        var tileLayout = this.calculateGridLayout(bounds, origin, resolution);

        var tileoffsetx = Math.round(tileLayout.tileoffsetx); // heaven help us
        var tileoffsety = Math.round(tileLayout.tileoffsety);

        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;

        this.origin = new OpenLayers.Pixel(tileoffsetx, tileoffsety);

        var startX = tileoffsetx; 
        var startLon = tileoffsetlon;

        var rowidx = 0;
        
        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);
        
    
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }

            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
 
            do {
                var tileBounds = 
                    new OpenLayers.Bounds(tileoffsetlon, 
                                          tileoffsetlat, 
                                          tileoffsetlon + tilelon,
                                          tileoffsetlat + tilelat);

                var x = tileoffsetx;
                x -= layerContainerDivLeft;

                var y = tileoffsety;
                y -= layerContainerDivTop;

                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
     
                tileoffsetlon += tilelon;       
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer)
                     || colidx < minCols);
             
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while((tileoffsetlat >= bounds.bottom - tilelat * this.buffer)
                || rowidx < minRows);
        
        //shave off exceess rows and colums
        this.removeExcessTiles(rowidx, colidx);

        //now actually draw the tiles
        this.spiralTileLoad();
    },

    /**
     * Method: getMaxExtent
     * Get this layer's maximum extent. (Implemented as a getter for
     *     potential specific implementations in sub-classes.)
     *
     * Returns:
     * {OpenLayers.Bounds}
     */
    getMaxExtent: function() {
        return this.maxExtent;
    },
    
    /**
     * Method: spiralTileLoad
     *   Starts at the top right corner of the grid and proceeds in a spiral 
     *    towards the center, adding tiles one at a time to the beginning of a 
     *    queue. 
     * 
     *   Once all the grid's tiles have been added to the queue, we go back 
     *    and iterate through the queue (thus reversing the spiral order from 
     *    outside-in to inside-out), calling draw() on each tile. 
     */
    spiralTileLoad: function() {
        var tileQueue = [];
 
        var directions = ["right", "down", "left", "up"];

        var iRow = 0;
        var iCell = -1;
        var direction = OpenLayers.Util.indexOf(directions, "right");
        var directionsTried = 0;
        
        while( directionsTried < directions.length) {

            var testRow = iRow;
            var testCell = iCell;

            switch (directions[direction]) {
                case "right":
                    testCell++;
                    break;
                case "down":
                    testRow++;
                    break;
                case "left":
                    testCell--;
                    break;
                case "up":
                    testRow--;
                    break;
            } 
    
            // if the test grid coordinates are within the bounds of the 
            //  grid, get a reference to the tile.
            var tile = null;
            if ((testRow < this.grid.length) && (testRow >= 0) &&
                (testCell < this.grid[0].length) && (testCell >= 0)) {
                tile = this.grid[testRow][testCell];
            }
            
            if ((tile != null) && (!tile.queued)) {
                //add tile to beginning of queue, mark it as queued.
                tileQueue.unshift(tile);
                tile.queued = true;
                
                //restart the directions counter and take on the new coords
                directionsTried = 0;
                iRow = testRow;
                iCell = testCell;
            } else {
                //need to try to load a tile in a different direction
                direction = (direction + 1) % 4;
                directionsTried++;
            }
        } 
        
        // now we go through and draw the tiles in forward order
        for(var i=0, len=tileQueue.length; i<len; i++) {
            var tile = tileQueue[i];
            tile.draw();
            //mark tile as unqueued for the next time (since tiles are reused)
            tile.queued = false;       
        }
    },

    /**
     * APIMethod: addTile
     * Create a tile, initialize it, and add it to the layer div. 
     *
     * Parameters
     * bounds - {<OpenLayers.Bounds>}
     * position - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {<OpenLayers.Tile>} The added OpenLayers.Tile
     */
    addTile:function(bounds, position) {
        return new OpenLayers.Tile.Image(this, position, bounds, null, 
                                         this.tileSize, this.tileOptions);
    },
    
    /** 
     * Method: addTileMonitoringHooks
     * This function takes a tile as input and adds the appropriate hooks to 
     *     the tile so that the layer can keep track of the loading tiles.
     * 
     * Parameters: 
     * tile - {<OpenLayers.Tile>}
     */
    addTileMonitoringHooks: function(tile) {
        
        tile.onLoadStart = function() {
            //if that was first tile then trigger a 'loadstart' on the layer
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadstart");
            }
            this.numLoadingTiles++;
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
      
        tile.onLoadEnd = function() {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded");
            //if that was the last tile, then trigger a 'loadend' on the layer
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadend");
            }
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },

    /** 
     * Method: removeTileMonitoringHooks
     * This function takes a tile as input and removes the tile hooks 
     *     that were added in addTileMonitoringHooks()
     * 
     * Parameters: 
     * tile - {<OpenLayers.Tile>}
     */
    removeTileMonitoringHooks: function(tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        });
    },
    
    /**
     * Method: moveGriddedTiles
     */
    moveGriddedTiles: function() {
        var shifted = true;
        var buffer = this.buffer || 1;
        var tlLayer = this.grid[0][0].position;
        var offsetX = parseInt(this.map.layerContainerDiv.style.left);
        var offsetY = parseInt(this.map.layerContainerDiv.style.top);
        var tlViewPort = tlLayer.add(offsetX, offsetY);
        if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
            this.shiftColumn(true);
        } else if (tlViewPort.x < -this.tileSize.w * buffer) {
            this.shiftColumn(false);
        } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
            this.shiftRow(true);
        } else if (tlViewPort.y < -this.tileSize.h * buffer) {
            this.shiftRow(false);
        } else {
            shifted = false;
        }
        if (shifted) {
            // we may have other row or columns to shift, schedule it
            // with a setTimeout, to give the user a chance to sneak
            // in moveTo's
            this.timerId = window.setTimeout(this._moveGriddedTiles, 0);
        }
    },

    /**
     * Method: shiftRow
     * Shifty grid work
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftRow:function(prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];

        var resolution = this.map.getResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;

        var row = (prepend) ? grid.pop() : grid.shift();

        for (var i=0, len=modelRow.length; i<len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }

        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },

    /**
     * Method: shiftColumn
     * Shift grid work in the other dimension
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftColumn: function(prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.map.getResolution();
        var deltaLon = resolution * deltaX;

        for (var i=0, len=this.grid.length; i<len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;

            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },
    
    /**
     * Method: removeExcessTiles
     * When the size of the map or the buffer changes, we may need to
     *     remove some excess rows and columns.
     * 
     * Parameters:
     * rows - {Integer} Maximum number of rows we want our grid to have.
     * columns - {Integer} Maximum number of columns we want our grid to have.
     */
    removeExcessTiles: function(rows, columns) {
        
        // remove extra rows
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i=0, l=row.length; i<l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
        
        // remove extra columns
        while (this.grid[0].length > columns) {
            for (var i=0, l=this.grid.length; i<l; i++) {
                var row = this.grid[i];
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
    },

    /**
     * Method: onMapResize
     * For singleTile layers, this will set a new tile size according to the
     * dimensions of the map pane.
     */
    onMapResize: function() {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize();
        }
    },
    
    /**
     * APIMethod: getTileBounds
     * Returns The tile bounds for a layer given a pixel location.
     *
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>} The location in the viewport.
     *
     * Returns:
     * {<OpenLayers.Bounds>} Bounds of the tile at the given pixel location.
     */
    getTileBounds: function(viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this.getLonLatFromViewPortPx(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth *
                                         Math.floor((mapPoint.lon -
                                                     maxExtent.left) /
                                                    tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight *
                                             Math.floor((mapPoint.lat -
                                                         maxExtent.bottom) /
                                                        tileMapHeight));
        return new OpenLayers.Bounds(tileLeft, tileBottom,
                                     tileLeft + tileMapWidth,
                                     tileBottom + tileMapHeight);
    },
    
    CLASS_NAME: "OpenLayers.Layer.Grid"
});
/* ======================================================================
    OpenLayers/Tile.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Lang.js
 */

/*
 * Class: OpenLayers.Tile 
 * This is a class designed to designate a single tile, however
 *     it is explicitly designed to do relatively little. Tiles store 
 *     information about themselves -- such as the URL that they are related
 *     to, and their size - but do not add themselves to the layer div 
 *     automatically, for example. Create a new tile with the 
 *     <OpenLayers.Tile> constructor, or a subclass. 
 * 
 * TBD 3.0 - remove reference to url in above paragraph
 * 
 */
OpenLayers.Tile = OpenLayers.Class({
    
    /** 
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types
     */
    EVENT_TYPES: [ "loadstart", "loadend", "reload", "unload"],
    
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} An events object that handles all 
     *                       events on the tile.
     */
    events: null,

    /**
     * Property: id 
     * {String} null
     */
    id: null,
    
    /** 
     * Property: layer 
     * {<OpenLayers.Layer>} layer the tile is attached to 
     */
    layer: null,
    
    /**
     * Property: url
     * {String} url of the request.
     *
     * TBD 3.0 
     * Deprecated. The base tile class does not need an url. This should be 
     * handled in subclasses. Does not belong here.
     */
    url: null,

    /** 
     * APIProperty: bounds 
     * {<OpenLayers.Bounds>} null
     */
    bounds: null,
    
    /** 
     * Property: size 
     * {<OpenLayers.Size>} null
     */
    size: null,
    
    /** 
     * Property: position 
     * {<OpenLayers.Pixel>} Top Left pixel of the tile
     */    
    position: null,

    /**
     * Property: isLoading
     * {Boolean} Is the tile loading?
     */
    isLoading: false,
        
    /** TBD 3.0 -- remove 'url' from the list of parameters to the constructor.
     *             there is no need for the base tile class to have a url.
     * 
     * Constructor: OpenLayers.Tile
     * Constructor for a new <OpenLayers.Tile> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * url - {<String>}
     * size - {<OpenLayers.Size>}
     * options - {Object}
     */   
    initialize: function(layer, position, bounds, url, size, options) {
        this.layer = layer;
        this.position = position.clone();
        this.bounds = bounds.clone();
        this.url = url;
        if (size) {
            this.size = size.clone();
        }

        //give the tile a unique id based on its BBOX.
        this.id = OpenLayers.Util.createUniqueID("Tile_");
        
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);

        OpenLayers.Util.extend(this, options);
    },

    /**
     * Method: unload
     * Call immediately before destroying if you are listening to tile
     * events, so that counters are properly handled if tile is still
     * loading at destroy-time. Will only fire an event if the tile is
     * still loading.
     */
    unload: function() {
       if (this.isLoading) { 
           this.isLoading = false; 
           this.events.triggerEvent("unload"); 
       }
    },
    
    /** 
     * APIMethod: destroy
     * Nullify references to prevent circular references and memory leaks.
     */
    destroy:function() {
        this.layer  = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        
        this.events.destroy();
        this.events = null;
    },
    
    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<OpenLayers.Tile>} The tile to be cloned
     *
     * Returns:
     * {<OpenLayers.Tile>} An exact clone of this <OpenLayers.Tile>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile(this.layer, 
                                      this.position, 
                                      this.bounds, 
                                      this.url, 
                                      this.size);
        } 
        
        // catch any randomly tagged-on properties
        OpenLayers.Util.applyDefaults(obj, this);
        
        return obj;
    },

    /**
     * Method: draw
     * Clear whatever is currently in the tile, then return whether or not 
     *     it should actually be re-drawn.
     * 
     * Returns:
     * {Boolean} Whether or not the tile should actually be drawn. Note that 
     *     this is not really the best way of doing things, but such is 
     *     the way the code has been developed. Subclasses call this and
     *     depend on the return to know if they should draw or not.
     */
    draw: function() {
        var maxExtent = this.layer.maxExtent;
        var withinMaxExtent = (maxExtent &&
                               this.bounds.intersectsBounds(maxExtent, false));
 
        // The only case where we *wouldn't* want to draw the tile is if the 
        // tile is outside its layer's maxExtent.
        this.shouldDraw = (withinMaxExtent || this.layer.displayOutsideMaxExtent);
                
        //clear tile's contents and mark as not drawn
        this.clear();
        
        return this.shouldDraw;
    },
    
    /** 
     * Method: moveTo
     * Reposition the tile.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * position - {<OpenLayers.Pixel>}
     * redraw - {Boolean} Call draw method on tile after moving.
     *     Default is true
     */
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }

        this.bounds = bounds.clone();
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },

    /** 
     * Method: clear
     * Clear the tile of any bounds/position-related data so that it can 
     *     be reused in a new location. To be implemented by subclasses.
     */
    clear: function() {
        // to be implemented by subclasses
    },
    
    /**   
     * Method: getBoundsFromBaseLayer
     * Take the pixel locations of the corner of the tile, and pass them to 
     *     the base layer and ask for the location of those pixels, so that 
     *     displaying tiles over Google works fine.
     *
     * Parameters:
     * position - {<OpenLayers.Pixel>}
     *
     * Returns:
     * bounds - {<OpenLayers.Bounds>} 
     */
    getBoundsFromBaseLayer: function(position) {
        var msg = OpenLayers.i18n('reprojectDeprecated',
                                              {'layerName':this.layer.name});
        OpenLayers.Console.warn(msg);
        var topLeft = this.layer.map.getLonLatFromLayerPx(position); 
        var bottomRightPx = position.clone();
        bottomRightPx.x += this.size.w;
        bottomRightPx.y += this.size.h;
        var bottomRight = this.layer.map.getLonLatFromLayerPx(bottomRightPx); 
        // Handle the case where the base layer wraps around the date line.
        // Google does this, and it breaks WMS servers to request bounds in 
        // that fashion.  
        if (topLeft.lon > bottomRight.lon) {
            if (topLeft.lon < 0) {
                topLeft.lon = -180 - (topLeft.lon+180);
            } else {
                bottomRight.lon = 180+bottomRight.lon+180;
            }        
        }
        var bounds = new OpenLayers.Bounds(topLeft.lon, 
                                       bottomRight.lat, 
                                       bottomRight.lon, 
                                       topLeft.lat);  
        return bounds;
    },        
        
    /** 
     * Method: showTile
     * Show the tile only if it should be drawn.
     */
    showTile: function() { 
        if (this.shouldDraw) {
            this.show();
        }
    },
    
    /** 
     * Method: show
     * Show the tile.  To be implemented by subclasses.
     */
    show: function() { },
    
    /** 
     * Method: hide
     * Hide the tile.  To be implemented by subclasses.
     */
    hide: function() { },
    
    CLASS_NAME: "OpenLayers.Tile"
});
/* ======================================================================
    OpenLayers/Tile/Image.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Tile.js
 */

/**
 * Class: OpenLayers.Tile.Image
 * Instances of OpenLayers.Tile.Image are used to manage the image tiles
 * used by various layers.  Create a new image tile with the
 * <OpenLayers.Tile.Image> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Tile>
 */
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {

    /** 
     * Property: url
     * {String} The URL of the image being requested. No default. Filled in by
     * layer.getURL() function. 
     */
    url: null,
    
    /** 
     * Property: imgDiv
     * {DOMElement} The div element which wraps the image.
     */
    imgDiv: null,

    /**
     * Property: frame
     * {DOMElement} The image element is appended to the frame.  Any gutter on
     * the image will be hidden behind the frame. 
     */ 
    frame: null, 
    
    /**
     * Property: layerAlphaHack
     * {Boolean} True if the png alpha hack needs to be applied on the layer's div.
     */
    layerAlphaHack: null,
    
    /**
     * Property: isBackBuffer
     * {Boolean} Is this tile a back buffer tile?
     */
    isBackBuffer: false,
    
    /**
     * Property: isFirstDraw
     * {Boolean} Is this the first time the tile is being drawn?
     *     This is used to force resetBackBuffer to synchronize
     *     the backBufferTile with the foreground tile the first time
     *     the foreground tile loads so that if the user zooms
     *     before the layer has fully loaded, the backBufferTile for
     *     tiles that have been loaded can be used.
     */
    isFirstDraw: true,
        
    /**
     * Property: backBufferTile
     * {<OpenLayers.Tile>} A clone of the tile used to create transition
     *     effects when the tile is moved or changes resolution.
     */
    backBufferTile: null,
    
    /**
     * APIProperty: maxGetUrlLength
     * {Number} If set, requests that would result in GET urls with more
     * characters than the number provided will be made using form-encoded
     * HTTP POST. It is good practice to avoid urls that are longer than 2048
     * characters.
     *
     * Caution:
     * Older versions of Gecko based browsers (e.g. Firefox < 3.5) and
     * Opera < 10.0 do not fully support this option.
     *
     * Note:
     * Do not use this option for layers that have a transitionEffect
     * configured - IFrame tiles from POST requests can not be resized.
     */
    maxGetUrlLength: null,
    
    /** TBD 3.0 - reorder the parameters to the init function to remove 
     *             URL. the getUrl() function on the layer gets called on 
     *             each draw(), so no need to specify it here.
     * 
     * Constructor: OpenLayers.Tile.Image
     * Constructor for a new <OpenLayers.Tile.Image> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * url - {<String>} Deprecated. Remove me in 3.0.
     * size - {<OpenLayers.Size>}
     * options - {Object}
     */   
    initialize: function(layer, position, bounds, url, size, options) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);

        if (this.maxGetUrlLength != null) {
            OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame);
        }

        this.url = url; //deprecated remove me
        
        this.frame = document.createElement('div'); 
        this.frame.style.overflow = 'hidden'; 
        this.frame.style.position = 'absolute'; 

        this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();        
    },

    /** 
     * APIMethod: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        if (this.imgDiv != null)  {
            this.removeImgDiv();
        }
        this.imgDiv = null;
        if ((this.frame != null) && (this.frame.parentNode == this.layer.div)) { 
            this.layer.div.removeChild(this.frame); 
        }
        this.frame = null; 
        
        /* clean up the backBufferTile if it exists */
        if (this.backBufferTile) {
            this.backBufferTile.destroy();
            this.backBufferTile = null;
        }
        
        this.layer.events.unregister("loadend", this, this.resetBackBuffer);
        
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<OpenLayers.Tile.Image>} The tile to be cloned
     *
     * Returns:
     * {<OpenLayers.Tile.Image>} An exact clone of this <OpenLayers.Tile.Image>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile.Image(this.layer, 
                                            this.position, 
                                            this.bounds, 
                                            this.url, 
                                            this.size);        
        } 
        
        //pick up properties from superclass
        obj = OpenLayers.Tile.prototype.clone.apply(this, [obj]);
        
        //dont want to directly copy the image div
        obj.imgDiv = null;
            
        
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
        
        if ((OpenLayers.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, this.layer.transitionEffect) != -1) || 
            this.layer.singleTile) {
            if (drawTile) {
                //we use a clone of this tile to create a double buffer for visual
                //continuity.  The backBufferTile is used to create transition
                //effects while the tile in the grid is repositioned and redrawn
                if (!this.backBufferTile) {
                    this.backBufferTile = this.clone();
                    this.backBufferTile.hide();
                    // this is important.  It allows the backBuffer to place itself
                    // appropriately in the DOM.  The Image subclass needs to put
                    // the backBufferTile behind the main tile so the tiles can
                    // load over top and display as soon as they are loaded.
                    this.backBufferTile.isBackBuffer = true;
                    
                    // potentially end any transition effects when the tile loads
                    this.events.register('loadend', this, this.resetBackBuffer);
                    
                    // clear transition back buffer tile only after all tiles in
                    // this layer have loaded to avoid visual glitches
                    this.layer.events.register("loadend", this, this.resetBackBuffer);
                }
                // run any transition effects
                this.startTransition();
            } else {
                // if we aren't going to draw the tile, then the backBuffer should
                // be hidden too!
                if (this.backBufferTile) {
                    this.backBufferTile.clear();
                }
            }
        } else {
            if (drawTile && this.isFirstDraw) {
                this.events.register('loadend', this, this.showTile);
                this.isFirstDraw = false;
            }   
        }    
        
        if (!drawTile) {
            return false;
        }
        
        if (this.isLoading) {
            //if we're already loading, send 'reload' instead of 'loadstart'.
            this.events.triggerEvent("reload"); 
        } else {
            this.isLoading = true;
            this.events.triggerEvent("loadstart");
        }
        
        return this.renderTile();
    },
    
    /** 
     * Method: resetBackBuffer
     * Triggered by two different events, layer loadend, and tile loadend.
     *     In any of these cases, we check to see if we can hide the 
     *     backBufferTile yet and update its parameters to match the 
     *     foreground tile.
     *
     * Basic logic:
     *  - If the backBufferTile hasn't been drawn yet, reset it
     *  - If layer is still loading, show foreground tile but don't hide
     *    the backBufferTile yet
     *  - If layer is done loading, reset backBuffer tile and show 
     *    foreground tile
     */
    resetBackBuffer: function() {
        this.showTile();
        if (this.backBufferTile && 
            (this.isFirstDraw || !this.layer.numLoadingTiles)) {
            this.isFirstDraw = false;
            // check to see if the backBufferTile is within the max extents
            // before rendering it 
            var maxExtent = this.layer.maxExtent;
            var withinMaxExtent = (maxExtent &&
                                   this.bounds.intersectsBounds(maxExtent, false));
            if (withinMaxExtent) {
                this.backBufferTile.position = this.position;
                this.backBufferTile.bounds = this.bounds;
                this.backBufferTile.size = this.size;
                this.backBufferTile.imageSize = this.layer.getImageSize(this.bounds) || this.size;
                this.backBufferTile.imageOffset = this.layer.imageOffset;
                this.backBufferTile.resolution = this.layer.getResolution();
                this.backBufferTile.renderTile();
            }

            this.backBufferTile.hide();
        }
    },
    
    /**
     * Method: renderTile
     * Internal function to actually initialize the image tile,
     *     position it correctly, and set its url.
     */
    renderTile: function() {
        if (this.layer.async) {
            this.initImgDiv();
            // Asyncronous image requests call the asynchronous getURL method
            // on the layer to fetch an image that covers 'this.bounds', in the scope of
            // 'this', setting the 'url' property of the layer itself, and running
            // the callback 'positionFrame' when the image request returns.
            this.layer.getURLasync(this.bounds, this, "url", this.positionImage);
        } else {
            // syncronous image requests get the url and position the frame immediately,
            // and don't wait for an image request to come back.
          
            this.url = this.layer.getURL(this.bounds);

            this.initImgDiv();
          
            // position the frame immediately
            this.positionImage(); 
        }
        return true;
    },

    /**
     * Method: positionImage
     * Using the properties currenty set on the layer, position the tile correctly.
     * This method is used both by the async and non-async versions of the Tile.Image
     * code.
     */
     positionImage: function() {
        // if the this layer doesn't exist at the point the image is
        // returned, do not attempt to use it for size computation
        if (this.layer === null) {
            return;
        }
        // position the frame 
        OpenLayers.Util.modifyDOMElement(this.frame, 
                                          null, this.position, this.size);   

        var imageSize = this.layer.getImageSize(this.bounds); 
        if (this.layerAlphaHack) {
            OpenLayers.Util.modifyAlphaImageDiv(this.imgDiv,
                    null, null, imageSize, this.url);
        } else {
            OpenLayers.Util.modifyDOMElement(this.imgDiv,
                    null, null, imageSize) ;
            this.imgDiv.src = this.url;
        }
    },

    /** 
     * Method: clear
     *  Clear the tile of any bounds/position-related data so that it can 
     *   be reused in a new location.
     */
    clear: function() {
        if(this.imgDiv) {
            this.hide();
            if (OpenLayers.Tile.Image.useBlankTile) { 
                this.imgDiv.src = OpenLayers.Util.getImagesLocation() + "blank.gif";
            }    
        }
    },

    /**
     * Method: initImgDiv
     * Creates the imgDiv property on the tile.
     */
    initImgDiv: function() {
        if (this.imgDiv == null) {
            var offset = this.layer.imageOffset; 
            var size = this.layer.getImageSize(this.bounds); 

            if (this.layerAlphaHack) {
                this.imgDiv = OpenLayers.Util.createAlphaImageDiv(null,
                                                               offset,
                                                               size,
                                                               null,
                                                               "relative",
                                                               null,
                                                               null,
                                                               null,
                                                               true);
            } else {
                this.imgDiv = OpenLayers.Util.createImage(null,
                                                          offset,
                                                          size,
                                                          null,
                                                          "relative",
                                                          null,
                                                          null,
                                                          true);
            }

            // needed for changing to a different server for onload error
            if (OpenLayers.Util.isArray(this.layer.url)) {
                this.imgDiv.urls = this.layer.url.slice();
            }
      
            this.imgDiv.className = 'olTileImage';

            /* checkImgURL used to be used to called as a work around, but it
               ended up hiding problems instead of solving them and broke things
               like relative URLs. See discussion on the dev list:
               http://openlayers.org/pipermail/dev/2007-January/000205.html

            OpenLayers.Event.observe( this.imgDiv, "load",
                OpenLayers.Function.bind(this.checkImgURL, this) );
            */
            this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
            this.frame.appendChild(this.imgDiv); 
            this.layer.div.appendChild(this.frame); 

            if(this.layer.opacity != null) {

                OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, null,
                                                 null, null, null, 
                                                 this.layer.opacity);
            }

            // we need this reference to check back the viewRequestID
            this.imgDiv.map = this.layer.map;

            //bind a listener to the onload of the image div so that we 
            // can register when a tile has finished loading.
            var onload = function() {

                //normally isLoading should always be true here but there are some 
                // right funky conditions where loading and then reloading a tile
                // with the same url *really*fast*. this check prevents sending 
                // a 'loadend' if the msg has already been sent
                //
                if (this.isLoading) { 
                    this.isLoading = false; 
                    this.events.triggerEvent("loadend"); 
                }
            };

            if (this.layerAlphaHack) { 
                OpenLayers.Event.observe(this.imgDiv.childNodes[0], 'load', 
                                         OpenLayers.Function.bind(onload, this));    
            } else { 
                OpenLayers.Event.observe(this.imgDiv, 'load', 
                                     OpenLayers.Function.bind(onload, this)); 
            } 


            // Bind a listener to the onerror of the image div so that we
            // can registere when a tile has finished loading with errors.
            var onerror = function() {

                // If we have gone through all image reload attempts, it is time
                // to realize that we are done with this image. Since
                // OpenLayers.Util.onImageLoadError already has taken care about
                // the error, we can continue as if the image was loaded
                // successfully.
                if (this.imgDiv._attempts > OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
                    onload.call(this);
                }
            };
            OpenLayers.Event.observe(this.imgDiv, "error",
                                     OpenLayers.Function.bind(onerror, this));
        }
        
        this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
    },

    /**
     * Method: removeImgDiv
     * Removes the imgDiv from the DOM and stops listening to events on it.
     */
    removeImgDiv: function() {
        // unregister the "load" and "error" handlers. Only the "error" handler if
        // this.layerAlphaHack is true.
        OpenLayers.Event.stopObservingElement(this.imgDiv);
        
        if (this.imgDiv.parentNode == this.frame) {
            this.frame.removeChild(this.imgDiv);
            this.imgDiv.map = null;
        }
        this.imgDiv.urls = null;

        var child = this.imgDiv.firstChild;
        //check for children (alphaHack img or IFrame)
        if (child) {
            OpenLayers.Event.stopObservingElement(child);
            this.imgDiv.removeChild(child);
            delete child;
        } else {
            // abort any currently loading image
            this.imgDiv.src = OpenLayers.Util.getImagesLocation() + "blank.gif";
        }
    },

    /**
     * Method: checkImgURL
     * Make sure that the image that just loaded is the one this tile is meant
     * to display, since panning/zooming might have changed the tile's URL in
     * the meantime. If the tile URL did change before the image loaded, set
     * the imgDiv display to 'none', as either (a) it will be reset to visible
     * when the new URL loads in the image, or (b) we don't want to display
     * this tile after all because its new bounds are outside our maxExtent.
     * 
     * This function should no longer  be neccesary with the improvements to
     * Grid.js in OpenLayers 2.3. The lack of a good isEquivilantURL function
     * caused problems in 2.2, but it's possible that with the improved 
     * isEquivilant URL function, this might be neccesary at some point.
     * 
     * See discussion in the thread at 
     * http://openlayers.org/pipermail/dev/2007-January/000205.html
     */
    checkImgURL: function () {
        // Sometimes our image will load after it has already been removed
        // from the map, in which case this check is not needed.  
        if (this.layer) {
            var loaded = this.layerAlphaHack ? this.imgDiv.firstChild.src : this.imgDiv.src;
            if (!OpenLayers.Util.isEquivalentUrl(loaded, this.url)) {
                this.hide();
            }
        }
    },
    
    /**
     * Method: startTransition
     * This method is invoked on tiles that are backBuffers for tiles in the
     *     grid.  The grid tile is about to be cleared and a new tile source
     *     loaded.  This is where the transition effect needs to be started
     *     to provide visual continuity.
     */
    startTransition: function() {
        // backBufferTile has to be valid and ready to use
        if (!this.backBufferTile || !this.backBufferTile.imgDiv) {
            return;
        }

        // calculate the ratio of change between the current resolution of the
        // backBufferTile and the layer.  If several animations happen in a
        // row, then the backBufferTile will scale itself appropriately for
        // each request.
        var ratio = 1;
        if (this.backBufferTile.resolution) {
            ratio = this.backBufferTile.resolution / this.layer.getResolution();
        }
        
        // if the ratio is not the same as it was last time (i.e. we are
        // zooming), then we need to adjust the backBuffer tile
        if (ratio != 1) {
            if (this.layer.transitionEffect == 'resize') {
                // In this case, we can just immediately resize the 
                // backBufferTile.
                var upperLeft = new OpenLayers.LonLat(
                    this.backBufferTile.bounds.left, 
                    this.backBufferTile.bounds.top
                );
                var size = new OpenLayers.Size(
                    this.backBufferTile.size.w * ratio,
                    this.backBufferTile.size.h * ratio
                );

                var px = this.layer.map.getLayerPxFromLonLat(upperLeft);
                OpenLayers.Util.modifyDOMElement(this.backBufferTile.frame, 
                                                 null, px, size);
                var imageSize = this.backBufferTile.imageSize;
                imageSize = new OpenLayers.Size(imageSize.w * ratio, 
                                                imageSize.h * ratio);
                var imageOffset = this.backBufferTile.imageOffset;
                if(imageOffset) {
                    imageOffset = new OpenLayers.Pixel(
                        imageOffset.x * ratio, imageOffset.y * ratio
                    );
                }

                OpenLayers.Util.modifyDOMElement(
                    this.backBufferTile.imgDiv, null, imageOffset, imageSize
                ) ;

                this.backBufferTile.show();
            }
        } else {
            // default effect is just to leave the existing tile
            // until the new one loads if this is a singleTile and
            // there was no change in resolution.  Otherwise we
            // don't bother to show the backBufferTile at all
            if (this.layer.singleTile) {
                this.backBufferTile.show();
            } else {
                this.backBufferTile.hide();
            }
        }

    },
    
    /** 
     * Method: show
     * Show the tile by showing its frame.
     */
    show: function() {
        this.frame.style.display = '';
        // Force a reflow on gecko based browsers to actually show the element
        // before continuing execution.
        if (OpenLayers.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, 
                this.layer.transitionEffect) != -1) {
            if (OpenLayers.IS_GECKO === true) { 
                this.frame.scrollLeft = this.frame.scrollLeft; 
            } 
        }
    },
    
    /** 
     * Method: hide
     * Hide the tile by hiding its frame.
     */
    hide: function() {
        this.frame.style.display = 'none';
    },
    
    CLASS_NAME: "OpenLayers.Tile.Image"
  }
);

OpenLayers.Tile.Image.useBlankTile = ( 
    OpenLayers.BROWSER_NAME == "safari" || 
    OpenLayers.BROWSER_NAME == "opera"); 
/* ======================================================================
    OpenLayers/Layer/XYZ.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/Grid.js
 * @requires OpenLayers/Tile/Image.js
 */

/** 
 * Class: OpenLayers.Layer.XYZ
 * The XYZ class is designed to make it easier for people who have tiles
 * arranged by a standard XYZ grid. 
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 */
OpenLayers.Layer.XYZ = OpenLayers.Class(OpenLayers.Layer.Grid, {
    
    /**
     * APIProperty: isBaseLayer
     * Default is true, as this is designed to be a base tile source. 
     */
    isBaseLayer: true,
    
    /**
     * APIProperty: sphericalMecator
     * Whether the tile extents should be set to the defaults for 
     *    spherical mercator. Useful for things like OpenStreetMap.
     *    Default is false, except for the OSM subclass.
     */
    sphericalMercator: false,

    /**
     * APIProperty: zoomOffset
     * {Number} If your cache has more zoom levels than you want to provide
     *     access to with this layer, supply a zoomOffset.  This zoom offset
     *     is added to the current map zoom level to determine the level
     *     for a requested tile.  For example, if you supply a zoomOffset
     *     of 3, when the map is at the zoom 0, tiles will be requested from
     *     level 3 of your cache.  Default is 0 (assumes cache level and map
     *     zoom are equivalent).  Using <zoomOffset> is an alternative to
     *     setting <serverResolutions> if you only want to expose a subset
     *     of the server resolutions.
     */
    zoomOffset: 0,
    
    /**
     * APIProperty: serverResolutions
     * {Array} A list of all resolutions available on the server.  Only set this
     *     property if the map resolutions differs from the server.
     */
    serverResolutions: null,

    /**
     * Constructor: OpenLayers.Layer.XYZ
     *
     * Parameters:
     * name - {String}
     * url - {String}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, options) {
        if (options && options.sphericalMercator || this.sphericalMercator) {
            options = OpenLayers.Util.extend({
                maxExtent: new OpenLayers.Bounds(
                    -128 * 156543.03390625,
                    -128 * 156543.03390625,
                    128 * 156543.03390625,
                    128 * 156543.03390625
                ),
                maxResolution: 156543.03390625,
                numZoomLevels: 19,
                units: "m",
                projection: "EPSG:900913"
            }, options);
        }
        url = url || this.url;
        name = name || this.name;
        var newArguments = [name, url, {}, options];
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },
    
    /**
     * APIMethod: clone
     * Create a clone of this layer
     *
     * Parameters:
     * obj - {Object} Is this ever used?
     * 
     * Returns:
     * {<OpenLayers.Layer.XYZ>} An exact clone of this OpenLayers.Layer.XYZ
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.XYZ(this.name,
                                            this.url,
                                            this.getOptions());
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        return obj;
    },    

    /**
     * Method: getURL
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {String} A string with the layer's url and parameters and also the
     *          passed-in bounds and appropriate tile size specified as
     *          parameters
     */
    getURL: function (bounds) {
        var xyz = this.getXYZ(bounds);
        var url = this.url;
        if (OpenLayers.Util.isArray(url)) {
            var s = '' + xyz.x + xyz.y + xyz.z;
            url = this.selectUrl(s, url);
        }
        
        return OpenLayers.String.format(url, xyz);
    },
    
    /**
     * Method: getXYZ
     * Calculates x, y and z for the given bounds.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Returns:
     * {Object} - an object with x, y and z properties.
     */
    getXYZ: function(bounds) {
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) /
            (res * this.tileSize.w));
        var y = Math.round((this.maxExtent.top - bounds.top) /
            (res * this.tileSize.h));
        var z = this.serverResolutions != null ?
            OpenLayers.Util.indexOf(this.serverResolutions, res) :
            this.map.getZoom() + this.zoomOffset;

        var limit = Math.pow(2, z);
        if (this.wrapDateLine)
        {
           x = ((x % limit) + limit) % limit;
        }

        return {'x': x, 'y': y, 'z': z};
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

    CLASS_NAME: "OpenLayers.Layer.XYZ"
});


/**
 * Class: OpenLayers.Layer.OSM
 * A class to access OpenStreetMap tiles. By default, uses the OpenStreetMap
 *    hosted tile.openstreetmap.org 'Mapnik' tileset. If you wish to use
 *    tiles@home / osmarender layer instead, you can pass a layer like:
 * 
 * (code)
 *     new OpenLayers.Layer.OSM("t@h", 
 *       "http://tah.openstreetmap.org/Tiles/tile/${z}/${x}/${y}.png"); 
 * (end)
 *
 * This layer defaults to Spherical Mercator.
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.XYZ>
 */
OpenLayers.Layer.OSM = OpenLayers.Class(OpenLayers.Layer.XYZ, {
     name: "OpenStreetMap",
     attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
     sphericalMercator: true,
     url: 'http://tile.openstreetmap.org/${z}/${x}/${y}.png',
     clone: function(obj) {
         if (obj == null) {
             obj = new OpenLayers.Layer.OSM(
                 this.name, this.url, this.getOptions());
         }
         obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
         return obj;
     },
     wrapDateLine: true,
     CLASS_NAME: "OpenLayers.Layer.OSM"
});
/* ======================================================================
    OpenLayers/Renderer.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 */

/**
 * Class: OpenLayers.Renderer 
 * This is the base class for all renderers.
 *
 * This is based on a merger code written by Paul Spencer and Bertil Chapuis.
 * It is largely composed of virtual functions that are to be implemented
 * in technology-specific subclasses, but there is some generic code too.
 * 
 * The functions that *are* implemented here merely deal with the maintenance
 *  of the size and extent variables, as well as the cached 'resolution' 
 *  value. 
 * 
 * A note to the user that all subclasses should use getResolution() instead
 *  of directly accessing this.resolution in order to correctly use the 
 *  cacheing system.
 *
 */
OpenLayers.Renderer = OpenLayers.Class({

    /** 
     * Property: container
     * {DOMElement} 
     */
    container: null,
    
    /**
     * Property: root
     * {DOMElement}
     */
    root: null,

    /** 
     * Property: extent
     * {<OpenLayers.Bounds>}
     */
    extent: null,

    /**
     * Property: locked
     * {Boolean} If the renderer is currently in a state where many things
     *     are changing, the 'locked' property is set to true. This means 
     *     that renderers can expect at least one more drawFeature event to be
     *     called with the 'locked' property set to 'true': In some renderers,
     *     this might make sense to use as a 'only update local information'
     *     flag. 
     */  
    locked: false,
    
    /** 
     * Property: size
     * {<OpenLayers.Size>} 
     */
    size: null,
    
    /**
     * Property: resolution
     * {Float} cache of current map resolution
     */
    resolution: null,
    
    /**
     * Property: map  
     * {<OpenLayers.Map>} Reference to the map -- this is set in Vector's setMap()
     */
    map: null,
    
    /**
     * Constructor: OpenLayers.Renderer 
     *
     * Parameters:
     * containerID - {<String>} 
     * options - {Object} options for this renderer. See sublcasses for
     *     supported options.
     */
    initialize: function(containerID, options) {
        this.container = OpenLayers.Util.getElement(containerID);
        OpenLayers.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     */
    destroy: function() {
        this.container = null;
        this.extent = null;
        this.size =  null;
        this.resolution = null;
        this.map = null;
    },

    /**
     * APIMethod: supported
     * This should be overridden by specific subclasses
     * 
     * Returns:
     * {Boolean} Whether or not the browser supports the renderer class
     */
    supported: function() {
        return false;
    },    
    
    /**
     * Method: setExtent
     * Set the visible part of the layer.
     *
     * Resolution has probably changed, so we nullify the resolution 
     * cache (this.resolution) -- this way it will be re-computed when 
     * next it is needed.
     * We nullify the resolution cache (this.resolution) if resolutionChanged
     * is set to true - this way it will be re-computed on the next
     * getResolution() request.
     *
     * Parameters:
     * extent - {<OpenLayers.Bounds>}
     * resolutionChanged - {Boolean}
     */
    setExtent: function(extent, resolutionChanged) {
        this.extent = extent.clone();
        if (resolutionChanged) {
            this.resolution = null;
        }
    },
    
    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     * 
     * Resolution has probably changed, so we nullify the resolution 
     * cache (this.resolution) -- this way it will be re-computed when 
     * next it is needed.
     *
     * Parameters:
     * size - {<OpenLayers.Size>} 
     */
    setSize: function(size) {
        this.size = size.clone();
        this.resolution = null;
    },
    
    /** 
     * Method: getResolution
     * Uses cached copy of resolution if available to minimize computing
     * 
     * Returns:
     * The current map's resolution
     */
    getResolution: function() {
        this.resolution = this.resolution || this.map.getResolution();
        return this.resolution;
    },
    
    /**
     * Method: drawFeature
     * Draw the feature.  The optional style argument can be used
     * to override the feature's own style.  This method should only
     * be called from layer.drawFeature().
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} 
     * style - {<Object>}
     * 
     * Returns:
     * {Boolean} true if the feature has been drawn completely, false if not,
     *     undefined if the feature had no geometry
     */
    drawFeature: function(feature, style) {
        if(style == null) {
            style = feature.style;
        }
        if (feature.geometry) {
            var bounds = feature.geometry.getBounds();
            if(bounds) {
                if (!bounds.intersectsBounds(this.extent)) {
                    style = {display: "none"};
                }
                var rendered = this.drawGeometry(feature.geometry, style, feature.id);
                if(style.display != "none" && style.label && rendered !== false) {
                    var location = feature.geometry.getCentroid(); 
                    if(style.labelXOffset || style.labelYOffset) {
                        var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
                        var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
                        var res = this.getResolution();
                        location.move(xOffset*res, yOffset*res);
                    }
                    this.drawText(feature.id, style, location);
                } else {
                    this.removeText(feature.id);
                }
                return rendered;
            }
        }
    },


    /** 
     * Method: drawGeometry
     * 
     * Draw a geometry.  This should only be called from the renderer itself.
     * Use layer.drawFeature() from outside the renderer.
     * virtual function
     *
     * Parameters:
     * geometry - {<OpenLayers.Geometry>} 
     * style - {Object} 
     * featureId - {<String>} 
     */
    drawGeometry: function(geometry, style, featureId) {},
        
    /**
     * Method: drawText
     * Function for drawing text labels.
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * featureId - {String}
     * style -
     * location - {<OpenLayers.Geometry.Point>}
     */
    drawText: function(featureId, style, location) {},

    /**
     * Method: removeText
     * Function for removing text labels.
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * featureId - {String}
     */
    removeText: function(featureId) {},
    
    /**
     * Method: clear
     * Clear all vectors from the renderer.
     * virtual function.
     */    
    clear: function() {},

    /**
     * Method: getFeatureIdFromEvent
     * Returns a feature id from an event on the renderer.  
     * How this happens is specific to the renderer.  This should be
     * called from layer.getFeatureFromEvent().
     * Virtual function.
     * 
     * Parameters:
     * evt - {<OpenLayers.Event>} 
     *
     * Returns:
     * {String} A feature id or null.
     */
    getFeatureIdFromEvent: function(evt) {},
    
    /**
     * Method: eraseFeatures 
     * This is called by the layer to erase features
     * 
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        if(!(OpenLayers.Util.isArray(features))) {
            features = [features];
        }
        for(var i=0, len=features.length; i<len; ++i) {
            var feature = features[i];
            this.eraseGeometry(feature.geometry, feature.id);
            this.removeText(feature.id);
        }
    },
    
    /**
     * Method: eraseGeometry
     * Remove a geometry from the renderer (by id).
     * virtual function.
     * 
     * Parameters:
     * geometry - {<OpenLayers.Geometry>} 
     * featureId - {String}
     */
    eraseGeometry: function(geometry, featureId) {},
    
    /**
     * Method: moveRoot
     * moves this renderer's root to a (different) renderer.
     * To be implemented by subclasses that require a common renderer root for
     * feature selection.
     * 
     * Parameters:
     * renderer - {<OpenLayers.Renderer>} target renderer for the moved root
     */
    moveRoot: function(renderer) {},

    /**
     * Method: getRenderLayerId
     * Gets the layer that this renderer's output appears on. If moveRoot was
     * used, this will be different from the id of the layer containing the
     * features rendered by this renderer.
     * 
     * Returns:
     * {String} the id of the output layer.
     */
    getRenderLayerId: function() {
        return this.container.id;
    },
    
    /**
     * Method: applyDefaultSymbolizer
     * 
     * Parameters:
     * symbolizer - {Object}
     * 
     * Returns:
     * {Object}
     */
    applyDefaultSymbolizer: function(symbolizer) {
        var result = OpenLayers.Util.extend({},
            OpenLayers.Renderer.defaultSymbolizer);
        if(symbolizer.stroke === false) {
            delete result.strokeWidth;
            delete result.strokeColor;
        }
        if(symbolizer.fill === false) {
            delete result.fillColor;
        }
        OpenLayers.Util.extend(result, symbolizer);
        return result;
    },

    CLASS_NAME: "OpenLayers.Renderer"
});

/**
 * Constant: OpenLayers.Renderer.defaultSymbolizer
 * {Object} Properties from this symbolizer will be applied to symbolizers
 *     with missing properties. This can also be used to set a global
 *     symbolizer default in OpenLayers. To be SLD 1.x compliant, add the
 *     following code before rendering any vector features:
 * (code)
 * OpenLayers.Renderer.defaultSymbolizer = {
 *     fillColor: "#808080",
 *     fillOpacity: 1,
 *     strokeColor: "#000000",
 *     strokeOpacity: 1,
 *     strokeWidth: 1,
 *     pointRadius: 3,
 *     graphicName: "square"
 * };
 * (end)
 */
OpenLayers.Renderer.defaultSymbolizer = {
    fillColor: "#000000",
    strokeColor: "#000000",
    strokeWidth: 2,
    fillOpacity: 1,
    strokeOpacity: 1,
    pointRadius: 0
};
    
/* ======================================================================
    OpenLayers/Renderer/Elements.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Renderer.js
 */

/**
 * Class: OpenLayers.ElementsIndexer
 * This class takes care of figuring out which order elements should be
 *     placed in the DOM based on given indexing methods. 
 */
OpenLayers.ElementsIndexer = OpenLayers.Class({
   
    /**
     * Property: maxZIndex
     * {Integer} This is the largest-most z-index value for a node
     *     contained within the indexer.
     */
    maxZIndex: null,
    
    /**
     * Property: order
     * {Array<String>} This is an array of node id's stored in the
     *     order that they should show up on screen. Id's higher up in the
     *     array (higher array index) represent nodes with higher z-indeces.
     */
    order: null, 
    
    /**
     * Property: indices
     * {Object} This is a hash that maps node ids to their z-index value
     *     stored in the indexer. This is done to make finding a nodes z-index 
     *     value O(1).
     */
    indices: null,
    
    /**
     * Property: compare
     * {Function} This is the function used to determine placement of
     *     of a new node within the indexer. If null, this defaults to to
     *     the Z_ORDER_DRAWING_ORDER comparison method.
     */
    compare: null,
    
    /**
     * APIMethod: initialize
     * Create a new indexer with 
     * 
     * Parameters:
     * yOrdering - {Boolean} Whether to use y-ordering.
     */
    initialize: function(yOrdering) {

        this.compare = yOrdering ? 
            OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER :
            OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;

        this.clear();
    },
    
    /**
     * APIMethod: insert
     * Insert a new node into the indexer. In order to find the correct 
     *     positioning for the node to be inserted, this method uses a binary 
     *     search. This makes inserting O(log(n)). 
     * 
     * Parameters:
     * newNode - {DOMElement} The new node to be inserted.
     * 
     * Returns
     * {DOMElement} the node before which we should insert our newNode, or
     *     null if newNode can just be appended.
     */
    insert: function(newNode) {
        // If the node is known to the indexer, remove it so we can
        // recalculate where it should go.
        if (this.exists(newNode)) {
            this.remove(newNode);
        }
        
        var nodeId = newNode.id;
        
        this.determineZIndex(newNode);       

        var leftIndex = -1;
        var rightIndex = this.order.length;
        var middle;

        while (rightIndex - leftIndex > 1) {
            middle = parseInt((leftIndex + rightIndex) / 2);
            
            var placement = this.compare(this, newNode,
                OpenLayers.Util.getElement(this.order[middle]));
            
            if (placement > 0) {
                leftIndex = middle;
            } else {
                rightIndex = middle;
            } 
        }
        
        this.order.splice(rightIndex, 0, nodeId);
        this.indices[nodeId] = this.getZIndex(newNode);
        
        // If the new node should be before another in the index
        // order, return the node before which we have to insert the new one;
        // else, return null to indicate that the new node can be appended.
        return this.getNextElement(rightIndex);
    },
    
    /**
     * APIMethod: remove
     * 
     * Parameters:
     * node - {DOMElement} The node to be removed.
     */
    remove: function(node) {
        var nodeId = node.id;
        var arrayIndex = OpenLayers.Util.indexOf(this.order, nodeId);
        if (arrayIndex >= 0) {
            // Remove it from the order array, as well as deleting the node
            // from the indeces hash.
            this.order.splice(arrayIndex, 1);
            delete this.indices[nodeId];
            
            // Reset the maxium z-index based on the last item in the 
            // order array.
            if (this.order.length > 0) {
                var lastId = this.order[this.order.length - 1];
                this.maxZIndex = this.indices[lastId];
            } else {
                this.maxZIndex = 0;
            }
        }
    },
    
    /**
     * APIMethod: clear
     */
    clear: function() {
        this.order = [];
        this.indices = {};
        this.maxZIndex = 0;
    },
    
    /**
     * APIMethod: exists
     *
     * Parameters:
     * node- {DOMElement} The node to test for existence.
     *
     * Returns:
     * {Boolean} Whether or not the node exists in the indexer?
     */
    exists: function(node) {
        return (this.indices[node.id] != null);
    },

    /**
     * APIMethod: getZIndex
     * Get the z-index value for the current node from the node data itself.
     * 
     * Parameters:
     * node - {DOMElement} The node whose z-index to get.
     * 
     * Returns:
     * {Integer} The z-index value for the specified node (from the node 
     *     data itself).
     */
    getZIndex: function(node) {
        return node._style.graphicZIndex;  
    },
    
    /**
     * Method: determineZIndex
     * Determine the z-index for the current node if there isn't one, 
     *     and set the maximum value if we've found a new maximum.
     * 
     * Parameters:
     * node - {DOMElement} 
     */
    determineZIndex: function(node) {
        var zIndex = node._style.graphicZIndex;
        
        // Everything must have a zIndex. If none is specified,
        // this means the user *must* (hint: assumption) want this
        // node to succomb to drawing order. To enforce drawing order
        // over all indexing methods, we'll create a new z-index that's
        // greater than any currently in the indexer.
        if (zIndex == null) {
            zIndex = this.maxZIndex;
            node._style.graphicZIndex = zIndex; 
        } else if (zIndex > this.maxZIndex) {
            this.maxZIndex = zIndex;
        }
    },

    /**
     * APIMethod: getNextElement
     * Get the next element in the order stack.
     * 
     * Parameters:
     * index - {Integer} The index of the current node in this.order.
     * 
     * Returns:
     * {DOMElement} the node following the index passed in, or
     *     null.
     */
    getNextElement: function(index) {
        var nextIndex = index + 1;
        if (nextIndex < this.order.length) {
            var nextElement = OpenLayers.Util.getElement(this.order[nextIndex]);
            if (nextElement == undefined) {
                nextElement = this.getNextElement(nextIndex);
            }
            return nextElement;
        } else {
            return null;
        } 
    },
    
    CLASS_NAME: "OpenLayers.ElementsIndexer"
});

/**
 * Namespace: OpenLayers.ElementsIndexer.IndexingMethods
 * These are the compare methods for figuring out where a new node should be 
 *     placed within the indexer. These methods are very similar to general 
 *     sorting methods in that they return -1, 0, and 1 to specify the 
 *     direction in which new nodes fall in the ordering.
 */
OpenLayers.ElementsIndexer.IndexingMethods = {
    
    /**
     * Method: Z_ORDER
     * This compare method is used by other comparison methods.
     *     It can be used individually for ordering, but is not recommended,
     *     because it doesn't subscribe to drawing order.
     * 
     * Parameters:
     * indexer - {<OpenLayers.ElementsIndexer>}
     * newNode - {DOMElement}
     * nextNode - {DOMElement}
     * 
     * Returns:
     * {Integer}
     */
    Z_ORDER: function(indexer, newNode, nextNode) {
        var newZIndex = indexer.getZIndex(newNode);

        var returnVal = 0;
        if (nextNode) {
            var nextZIndex = indexer.getZIndex(nextNode);
            returnVal = newZIndex - nextZIndex; 
        }
        
        return returnVal;
    },

    /**
     * APIMethod: Z_ORDER_DRAWING_ORDER
     * This method orders nodes by their z-index, but does so in a way
     *     that, if there are other nodes with the same z-index, the newest 
     *     drawn will be the front most within that z-index. This is the 
     *     default indexing method.
     * 
     * Parameters:
     * indexer - {<OpenLayers.ElementsIndexer>}
     * newNode - {DOMElement}
     * nextNode - {DOMElement}
     * 
     * Returns:
     * {Integer}
     */
    Z_ORDER_DRAWING_ORDER: function(indexer, newNode, nextNode) {
        var returnVal = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(
            indexer, 
            newNode, 
            nextNode
        );
        
        // Make Z_ORDER subscribe to drawing order by pushing it above
        // all of the other nodes with the same z-index.
        if (nextNode && returnVal == 0) {
            returnVal = 1;
        }
        
        return returnVal;
    },

    /**
     * APIMethod: Z_ORDER_Y_ORDER
     * This one should really be called Z_ORDER_Y_ORDER_DRAWING_ORDER, as it
     *     best describes which ordering methods have precedence (though, the 
     *     name would be too long). This method orders nodes by their z-index, 
     *     but does so in a way that, if there are other nodes with the same 
     *     z-index, the nodes with the lower y position will be "closer" than 
     *     those with a higher y position. If two nodes have the exact same y 
     *     position, however, then this method will revert to using drawing  
     *     order to decide placement.
     * 
     * Parameters:
     * indexer - {<OpenLayers.ElementsIndexer>}
     * newNode - {DOMElement}
     * nextNode - {DOMElement}
     * 
     * Returns:
     * {Integer}
     */
    Z_ORDER_Y_ORDER: function(indexer, newNode, nextNode) {
        var returnVal = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(
            indexer, 
            newNode, 
            nextNode
        );
        
        if (nextNode && returnVal === 0) {            
            var result = nextNode._boundsBottom - newNode._boundsBottom;
            returnVal = (result === 0) ? 1 : result;
        }
        
        return returnVal;       
    }
};

/**
 * Class: OpenLayers.Renderer.Elements
 * This is another virtual class in that it should never be instantiated by 
 *  itself as a Renderer. It exists because there is *tons* of shared 
 *  functionality between different vector libraries which use nodes/elements
 *  as a base for rendering vectors. 
 * 
 * The highlevel bits of code that are implemented here are the adding and 
 *  removing of geometries, which is essentially the same for any 
 *  element-based renderer. The details of creating each node and drawing the
 *  paths are of course different, but the machinery is the same. 
 * 
 * Inherits:
 *  - <OpenLayers.Renderer>
 */
OpenLayers.Renderer.Elements = OpenLayers.Class(OpenLayers.Renderer, {

    /**
     * Property: rendererRoot
     * {DOMElement}
     */
    rendererRoot: null,
    
    /**
     * Property: root
     * {DOMElement}
     */
    root: null,
    
    /**
     * Property: vectorRoot
     * {DOMElement}
     */
    vectorRoot: null,

    /**
     * Property: textRoot
     * {DOMElement}
     */
    textRoot: null,

    /**
     * Property: xmlns
     * {String}
     */    
    xmlns: null,
    
    /**
     * Property: Indexer
     * {<OpenLayers.ElementIndexer>} An instance of OpenLayers.ElementsIndexer 
     *     created upon initialization if the zIndexing or yOrdering options
     *     passed to this renderer's constructor are set to true.
     */
    indexer: null, 
    
    /**
     * Constant: BACKGROUND_ID_SUFFIX
     * {String}
     */
    BACKGROUND_ID_SUFFIX: "_background",
    
    /**
     * Constant: LABEL_ID_SUFFIX
     * {String}
     */
    LABEL_ID_SUFFIX: "_label",
    
    /**
     * Constructor: OpenLayers.Renderer.Elements
     * 
     * Parameters:
     * containerID - {String}
     * options - {Object} options for this renderer. Supported options are:
     *     * yOrdering - {Boolean} Whether to use y-ordering
     *     * zIndexing - {Boolean} Whether to use z-indexing. Will be ignored
     *         if yOrdering is set to true.
     */
    initialize: function(containerID, options) {
        OpenLayers.Renderer.prototype.initialize.apply(this, arguments);

        this.rendererRoot = this.createRenderRoot();
        this.root = this.createRoot("_root");
        this.vectorRoot = this.createRoot("_vroot");
        this.textRoot = this.createRoot("_troot");
        
        this.root.appendChild(this.vectorRoot);
        this.root.appendChild(this.textRoot);
        
        this.rendererRoot.appendChild(this.root);
        this.container.appendChild(this.rendererRoot);
        
        if(options && (options.zIndexing || options.yOrdering)) {
            this.indexer = new OpenLayers.ElementsIndexer(options.yOrdering);
        }
    },
    
    /**
     * Method: destroy
     */
    destroy: function() {

        this.clear(); 

        this.rendererRoot = null;
        this.root = null;
        this.xmlns = null;

        OpenLayers.Renderer.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: clear
     * Remove all the elements from the root
     */    
    clear: function() {
        var child;
        var root = this.vectorRoot;
        if (root) {
            while (child = root.firstChild) {
                root.removeChild(child);
            }
        }
        root = this.textRoot;
        if (root) {
            while (child = root.firstChild) {
                root.removeChild(child);
            }
        }
        if (this.indexer) {
            this.indexer.clear();
        }
    },

    /** 
     * Method: getNodeType
     * This function is in charge of asking the specific renderer which type
     *     of node to create for the given geometry and style. All geometries
     *     in an Elements-based renderer consist of one node and some
     *     attributes. We have the nodeFactory() function which creates a node
     *     for us, but it takes a 'type' as input, and that is precisely what
     *     this function tells us.  
     *  
     * Parameters:
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * 
     * Returns:
     * {String} The corresponding node type for the specified geometry
     */
    getNodeType: function(geometry, style) { },

    /** 
     * Method: drawGeometry 
     * Draw the geometry, creating new nodes, setting paths, setting style,
     *     setting featureId on the node.  This method should only be called
     *     by the renderer itself.
     *
     * Parameters:
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * featureId - {String}
     * 
     * Returns:
     * {Boolean} true if the geometry has been drawn completely; null if
     *     incomplete; false otherwise
     */
    drawGeometry: function(geometry, style, featureId) {
        var className = geometry.CLASS_NAME;
        var rendered = true;
        if ((className == "OpenLayers.Geometry.Collection") ||
            (className == "OpenLayers.Geometry.MultiPoint") ||
            (className == "OpenLayers.Geometry.MultiLineString") ||
            (className == "OpenLayers.Geometry.MultiPolygon")) {
            for (var i = 0, len=geometry.components.length; i<len; i++) {
                rendered = this.drawGeometry(
                    geometry.components[i], style, featureId) && rendered;
            }
            return rendered;
        };

        rendered = false;
        var removeBackground = false;
        if (style.display != "none") {
            if (style.backgroundGraphic) {
                this.redrawBackgroundNode(geometry.id, geometry, style,
                    featureId);
            } else {
                removeBackground = true;
            }
            rendered = this.redrawNode(geometry.id, geometry, style,
                featureId);
        }
        if (rendered == false) {
            var node = document.getElementById(geometry.id);
            if (node) {
                if (node._style.backgroundGraphic) {
                    removeBackground = true;
                }
                node.parentNode.removeChild(node);
            }
        }
        if (removeBackground) {
            var node = document.getElementById(
                geometry.id + this.BACKGROUND_ID_SUFFIX);
            if (node) {
                node.parentNode.removeChild(node);
            }
        }
        return rendered;
    },
    
    /**
     * Method: redrawNode
     * 
     * Parameters:
     * id - {String}
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * featureId - {String}
     * 
     * Returns:
     * {Boolean} true if the complete geometry could be drawn, null if parts of
     *     the geometry could not be drawn, false otherwise
     */
    redrawNode: function(id, geometry, style, featureId) {
        style = this.applyDefaultSymbolizer(style);
        // Get the node if it's already on the map.
        var node = this.nodeFactory(id, this.getNodeType(geometry, style));
        
        // Set the data for the node, then draw it.
        node._featureId = featureId;
        node._boundsBottom = geometry.getBounds().bottom;
        node._geometryClass = geometry.CLASS_NAME;
        node._style = style;

        var drawResult = this.drawGeometryNode(node, geometry, style);
        if(drawResult === false) {
            return false;
        }
         
        node = drawResult.node;
        
        // Insert the node into the indexer so it can show us where to
        // place it. Note that this operation is O(log(n)). If there's a
        // performance problem (when dragging, for instance) this is
        // likely where it would be.
        if (this.indexer) {
            var insert = this.indexer.insert(node);
            if (insert) {
                this.vectorRoot.insertBefore(node, insert);
            } else {
                this.vectorRoot.appendChild(node);
            }
        } else {
            // if there's no indexer, simply append the node to root,
            // but only if the node is a new one
            if (node.parentNode !== this.vectorRoot){ 
                this.vectorRoot.appendChild(node);
            }
        }
        
        this.postDraw(node);
        
        return drawResult.complete;
    },
    
    /**
     * Method: redrawBackgroundNode
     * Redraws the node using special 'background' style properties. Basically
     *     just calls redrawNode(), but instead of directly using the 
     *     'externalGraphic', 'graphicXOffset', 'graphicYOffset', and 
     *     'graphicZIndex' properties directly from the specified 'style' 
     *     parameter, we create a new style object and set those properties 
     *     from the corresponding 'background'-prefixed properties from 
     *     specified 'style' parameter.
     * 
     * Parameters:
     * id - {String}
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * featureId - {String}
     * 
     * Returns:
     * {Boolean} true if the complete geometry could be drawn, null if parts of
     *     the geometry could not be drawn, false otherwise
     */
    redrawBackgroundNode: function(id, geometry, style, featureId) {
        var backgroundStyle = OpenLayers.Util.extend({}, style);
        
        // Set regular style attributes to apply to the background styles.
        backgroundStyle.externalGraphic = backgroundStyle.backgroundGraphic;
        backgroundStyle.graphicXOffset = backgroundStyle.backgroundXOffset;
        backgroundStyle.graphicYOffset = backgroundStyle.backgroundYOffset;
        backgroundStyle.graphicZIndex = backgroundStyle.backgroundGraphicZIndex;
        backgroundStyle.graphicWidth = backgroundStyle.backgroundWidth || backgroundStyle.graphicWidth;
        backgroundStyle.graphicHeight = backgroundStyle.backgroundHeight || backgroundStyle.graphicHeight;
        
        // Erase background styles.
        backgroundStyle.backgroundGraphic = null;
        backgroundStyle.backgroundXOffset = null;
        backgroundStyle.backgroundYOffset = null;
        backgroundStyle.backgroundGraphicZIndex = null;
        
        return this.redrawNode(
            id + this.BACKGROUND_ID_SUFFIX, 
            geometry, 
            backgroundStyle, 
            null
        );
    },

    /**
     * Method: drawGeometryNode
     * Given a node, draw a geometry on the specified layer.
     *     node and geometry are required arguments, style is optional.
     *     This method is only called by the render itself.
     *
     * Parameters:
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * 
     * Returns:
     * {Object} a hash with properties "node" (the drawn node) and "complete"
     *     (null if parts of the geometry could not be drawn, false if nothing
     *     could be drawn)
     */
    drawGeometryNode: function(node, geometry, style) {
        style = style || node._style;

        var options = {
            'isFilled': style.fill === undefined ?
                true :
                style.fill,
            'isStroked': style.stroke === undefined ?
                !!style.strokeWidth :
                style.stroke
        };
        var drawn;
        switch (geometry.CLASS_NAME) {
            case "OpenLayers.Geometry.Point":
                if(style.graphic === false) {
                    options.isFilled = false;
                    options.isStroked = false;
                }
                drawn = this.drawPoint(node, geometry);
                break;
            case "OpenLayers.Geometry.LineString":
                options.isFilled = false;
                drawn = this.drawLineString(node, geometry);
                break;
            case "OpenLayers.Geometry.LinearRing":
                drawn = this.drawLinearRing(node, geometry);
                break;
            case "OpenLayers.Geometry.Polygon":
                drawn = this.drawPolygon(node, geometry);
                break;
            case "OpenLayers.Geometry.Surface":
                drawn = this.drawSurface(node, geometry);
                break;
            case "OpenLayers.Geometry.Rectangle":
                drawn = this.drawRectangle(node, geometry);
                break;
            default:
                break;
        }

        node._options = options; 

        //set style
        //TBD simplify this
        if (drawn != false) {
            return {
                node: this.setStyle(node, style, options, geometry),
                complete: drawn
            };
        } else {
            return false;
        }
    },
    
    /**
     * Method: postDraw
     * Things that have do be done after the geometry node is appended
     *     to its parent node. To be overridden by subclasses.
     * 
     * Parameters:
     * node - {DOMElement}
     */
    postDraw: function(node) {},
    
    /**
     * Method: drawPoint
     * Virtual function for drawing Point Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the point
     */ 
    drawPoint: function(node, geometry) {},

    /**
     * Method: drawLineString
     * Virtual function for drawing LineString Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components of
     *     the linestring, or false if nothing could be drawn
     */ 
    drawLineString: function(node, geometry) {},

    /**
     * Method: drawLinearRing
     * Virtual function for drawing LinearRing Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the linear ring, or false if nothing could be drawn
     */ 
    drawLinearRing: function(node, geometry) {},

    /**
     * Method: drawPolygon
     * Virtual function for drawing Polygon Geometry. 
     *    Should be implemented by subclasses.
     *    This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the polygon, or false if nothing could be drawn
     */ 
    drawPolygon: function(node, geometry) {},

    /**
     * Method: drawRectangle
     * Virtual function for drawing Rectangle Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the rectangle
     */ 
    drawRectangle: function(node, geometry) {},

    /**
     * Method: drawCircle
     * Virtual function for drawing Circle Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the circle
     */ 
    drawCircle: function(node, geometry) {},

    /**
     * Method: drawSurface
     * Virtual function for drawing Surface Geometry. 
     *     Should be implemented by subclasses.
     *     This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the surface
     */ 
    drawSurface: function(node, geometry) {},

    /**
     * Method: removeText
     * Removes a label
     * 
     * Parameters:
     * featureId - {String}
     */
    removeText: function(featureId) {
        var label = document.getElementById(featureId + this.LABEL_ID_SUFFIX);
        if (label) {
            this.textRoot.removeChild(label);
        }
    },

    /**
     * Method: getFeatureIdFromEvent
     * 
     * Parameters:
     * evt - {Object} An <OpenLayers.Event> object
     *
     * Returns:
     * {<OpenLayers.Geometry>} A geometry from an event that 
     *     happened on a layer.
     */
    getFeatureIdFromEvent: function(evt) {
        var target = evt.target;
        var useElement = target && target.correspondingUseElement;
        var node = useElement ? useElement : (target || evt.srcElement);
        var featureId = node._featureId;
        return featureId;
    },

    /** 
     * Method: eraseGeometry
     * Erase a geometry from the renderer. In the case of a multi-geometry, 
     *     we cycle through and recurse on ourselves. Otherwise, we look for a 
     *     node with the geometry.id, destroy its geometry, and remove it from
     *     the DOM.
     * 
     * Parameters:
     * geometry - {<OpenLayers.Geometry>}
     * featureId - {String}
     */
    eraseGeometry: function(geometry, featureId) {
        if ((geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPoint") ||
            (geometry.CLASS_NAME == "OpenLayers.Geometry.MultiLineString") ||
            (geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPolygon") ||
            (geometry.CLASS_NAME == "OpenLayers.Geometry.Collection")) {
            for (var i=0, len=geometry.components.length; i<len; i++) {
                this.eraseGeometry(geometry.components[i], featureId);
            }
        } else {    
            var element = OpenLayers.Util.getElement(geometry.id);
            if (element && element.parentNode) {
                if (element.geometry) {
                    element.geometry.destroy();
                    element.geometry = null;
                }
                element.parentNode.removeChild(element);

                if (this.indexer) {
                    this.indexer.remove(element);
                }
                
                if (element._style.backgroundGraphic) {
                    var backgroundId = geometry.id + this.BACKGROUND_ID_SUFFIX;
                    var bElem = OpenLayers.Util.getElement(backgroundId);
                    if (bElem && bElem.parentNode) {
                        // No need to destroy the geometry since the element and the background
                        // node share the same geometry.
                        bElem.parentNode.removeChild(bElem);
                    }
                }
            }
        }
    },

    /** 
     * Method: nodeFactory
     * Create new node of the specified type, with the (optional) specified id.
     * 
     * If node already exists with same ID and a different type, we remove it
     *     and then call ourselves again to recreate it.
     * 
     * Parameters:
     * id - {String}
     * type - {String} type Kind of node to draw.
     * 
     * Returns:
     * {DOMElement} A new node of the given type and id.
     */
    nodeFactory: function(id, type) {
        var node = OpenLayers.Util.getElement(id);
        if (node) {
            if (!this.nodeTypeCompare(node, type)) {
                node.parentNode.removeChild(node);
                node = this.nodeFactory(id, type);
            }
        } else {
            node = this.createNode(type, id);
        }
        return node;
    },
    
    /** 
     * Method: nodeTypeCompare
     * 
     * Parameters:
     * node - {DOMElement}
     * type - {String} Kind of node
     * 
     * Returns:
     * {Boolean} Whether or not the specified node is of the specified type
     *     This function must be overridden by subclasses.
     */
    nodeTypeCompare: function(node, type) {},
    
    /** 
     * Method: createNode
     * 
     * Parameters:
     * type - {String} Kind of node to draw.
     * id - {String} Id for node.
     * 
     * Returns:
     * {DOMElement} A new node of the given type and id.
     *     This function must be overridden by subclasses.
     */
    createNode: function(type, id) {},

    /**
     * Method: moveRoot
     * moves this renderer's root to a different renderer.
     * 
     * Parameters:
     * renderer - {<OpenLayers.Renderer>} target renderer for the moved root
     */
    moveRoot: function(renderer) {
        var root = this.root;
        if(renderer.root.parentNode == this.rendererRoot) {
            root = renderer.root;
        }
        root.parentNode.removeChild(root);
        renderer.rendererRoot.appendChild(root);
    },
    
    /**
     * Method: getRenderLayerId
     * Gets the layer that this renderer's output appears on. If moveRoot was
     * used, this will be different from the id of the layer containing the
     * features rendered by this renderer.
     * 
     * Returns:
     * {String} the id of the output layer.
     */
    getRenderLayerId: function() {
        return this.root.parentNode.parentNode.id;
    },
    
    /**
     * Method: isComplexSymbol
     * Determines if a symbol cannot be rendered using drawCircle
     * 
     * Parameters:
     * graphicName - {String}
     * 
     * Returns
     * {Boolean} true if the symbol is complex, false if not
     */
    isComplexSymbol: function(graphicName) {
        return (graphicName != "circle") && !!graphicName;
    },

    CLASS_NAME: "OpenLayers.Renderer.Elements"
});


/**
 * Constant: OpenLayers.Renderer.symbol
 * Coordinate arrays for well known (named) symbols.
 */
OpenLayers.Renderer.symbol = {
    "star": [350,75, 379,161, 469,161, 397,215, 423,301, 350,250, 277,301,
            303,215, 231,161, 321,161, 350,75],
    "cross": [4,0, 6,0, 6,4, 10,4, 10,6, 6,6, 6,10, 4,10, 4,6, 0,6, 0,4, 4,4,
            4,0],
    "x": [0,0, 25,0, 50,35, 75,0, 100,0, 65,50, 100,100, 75,100, 50,65, 25,100, 0,100, 35,50, 0,0],
    "square": [0,0, 0,1, 1,1, 1,0, 0,0],
    "triangle": [0,10, 10,10, 5,0, 0,10]
};
/* ======================================================================
    OpenLayers/Renderer/SVG.js
   ====================================================================== */

/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Renderer/Elements.js
 */

/**
 * Class: OpenLayers.Renderer.SVG
 * 
 * Inherits:
 *  - <OpenLayers.Renderer.Elements>
 */
OpenLayers.Renderer.SVG = OpenLayers.Class(OpenLayers.Renderer.Elements, {

    /** 
     * Property: xmlns
     * {String}
     */
    xmlns: "http://www.w3.org/2000/svg",
    
    /**
     * Property: xlinkns
     * {String}
     */
    xlinkns: "http://www.w3.org/1999/xlink",

    /**
     * Constant: MAX_PIXEL
     * {Integer} Firefox has a limitation where values larger or smaller than  
     *           about 15000 in an SVG document lock the browser up. This 
     *           works around it.
     */
    MAX_PIXEL: 15000,

    /**
     * Property: translationParameters
     * {Object} Hash with "x" and "y" properties
     */
    translationParameters: null,
    
    /**
     * Property: symbolMetrics
     * {Object} Cache for symbol metrics according to their svg coordinate
     *     space. This is an object keyed by the symbol's id, and values are
     *     an array of [width, centerX, centerY].
     */
    symbolMetrics: null,
    
    /**
     * Constructor: OpenLayers.Renderer.SVG
     * 
     * Parameters:
     * containerID - {String}
     */
    initialize: function(containerID) {
        if (!this.supported()) { 
            return; 
        }
        OpenLayers.Renderer.Elements.prototype.initialize.apply(this, 
                                                                arguments);
        this.translationParameters = {x: 0, y: 0};
        
        this.symbolMetrics = {};
    },

    /**
     * APIMethod: supported
     * 
     * Returns:
     * {Boolean} Whether or not the browser supports the SVG renderer
     */
    supported: function() {
        var svgFeature = "http://www.w3.org/TR/SVG11/feature#";
        return (document.implementation && 
           (document.implementation.hasFeature("org.w3c.svg", "1.0") || 
            document.implementation.hasFeature(svgFeature + "SVG", "1.1") || 
            document.implementation.hasFeature(svgFeature + "BasicStructure", "1.1") ));
    },    

    /**
     * Method: inValidRange
     * See #669 for more information
     *
     * Parameters:
     * x      - {Integer}
     * y      - {Integer}
     * xyOnly - {Boolean} whether or not to just check for x and y, which means
     *     to not take the current translation parameters into account if true.
     * 
     * Returns:
     * {Boolean} Whether or not the 'x' and 'y' coordinates are in the  
     *           valid range.
     */ 
    inValidRange: function(x, y, xyOnly) {
        var left = x + (xyOnly ? 0 : this.translationParameters.x);
        var top = y + (xyOnly ? 0 : this.translationParameters.y);
        return (left >= -this.MAX_PIXEL && left <= this.MAX_PIXEL &&
                top >= -this.MAX_PIXEL && top <= this.MAX_PIXEL);
    },

    /**
     * Method: setExtent
     * 
     * Parameters:
     * extent - {<OpenLayers.Bounds>}
     * resolutionChanged - {Boolean}
     * 
     * Returns:
     * {Boolean} true to notify the layer that the new extent does not exceed
     *     the coordinate range, and the features will not need to be redrawn.
     *     False otherwise.
     */
    setExtent: function(extent, resolutionChanged) {
        OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, 
                                                               arguments);
        
        var resolution = this.getResolution();
        var left = -extent.left / resolution;
        var top = extent.top / resolution;

        // If the resolution has changed, start over changing the corner, because
        // the features will redraw.
        if (resolutionChanged) {
            this.left = left;
            this.top = top;
            // Set the viewbox
            var extentString = "0 0 " + this.size.w + " " + this.size.h;

            this.rendererRoot.setAttributeNS(null, "viewBox", extentString);
            this.translate(0, 0);
            return true;
        } else {
            var inRange = this.translate(left - this.left, top - this.top);
            if (!inRange) {
                // recenter the coordinate system
                this.setExtent(extent, true);
            }
            return inRange;
        }
    },
    
    /**
     * Method: translate
     * Transforms the SVG coordinate system
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * 
     * Returns:
     * {Boolean} true if the translation parameters are in the valid coordinates
     *     range, false otherwise.
     */
    translate: function(x, y) {
        if (!this.inValidRange(x, y, true)) {
            return false;
        } else {
            var transformString = "";
            if (x || y) {
                transformString = "translate(" + x + "," + y + ")";
            }
            this.root.setAttributeNS(null, "transform", transformString);
            this.translationParameters = {x: x, y: y};
            return true;
        }
    },

    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     * 
     * Parameters:
     * size - {<OpenLayers.Size>} The size of the drawing surface
     */
    setSize: function(size) {
        OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
        
        this.rendererRoot.setAttributeNS(null, "width", this.size.w);
        this.rendererRoot.setAttributeNS(null, "height", this.size.h);
    },

    /** 
     * Method: getNodeType 
     * 
     * Parameters:
     * geometry - {<OpenLayers.Geometry>}
     * style - {Object}
     * 
     * Returns:
     * {String} The corresponding node type for the specified geometry
     */
    getNodeType: function(geometry, style) {
        var nodeType = null;
        switch (geometry.CLASS_NAME) {
            case "OpenLayers.Geometry.Point":
                if (style.externalGraphic) {
                    nodeType = "image";
                } else if (this.isComplexSymbol(style.graphicName)) {
                    nodeType = "svg";
                } else {
                    nodeType = "circle";
                }
                break;
            case "OpenLayers.Geometry.Rectangle":
                nodeType = "rect";
                break;
            case "OpenLayers.Geometry.LineString":
                nodeType = "polyline";
                break;
            case "OpenLayers.Geometry.LinearRing":
                nodeType = "polygon";
                break;
            case "OpenLayers.Geometry.Polygon":
            case "OpenLayers.Geometry.Curve":
            case "OpenLayers.Geometry.Surface":
                nodeType = "path";
                break;
            default:
                break;
        }
        return nodeType;
    },

    /** 
     * Method: setStyle
     * Use to set all the style attributes to a SVG node.
     * 
     * Takes care to adjust stroke width and point radius to be
     * resolution-relative
     *
     * Parameters:
     * node - {SVGDomElement} An SVG element to decorate
     * style - {Object}
     * options - {Object} Currently supported options include 
     *                              'isFilled' {Boolean} and
     *                              'isStroked' {Boolean}
     */
    setStyle: function(node, style, options) {
        style = style  || node._style;
        options = options || node._options;
        var r = parseFloat(node.getAttributeNS(null, "r"));
        var widthFactor = 1;
        var pos;
        if (node._geometryClass == "OpenLayers.Geometry.Point" && r) {
            node.style.visibility = "";
            if (style.graphic === false) {
                node.style.visibility = "hidden";
            } else if (style.externalGraphic) {
                pos = this.getPosition(node);
                
                if (style.graphicTitle) {
                    node.setAttributeNS(null, "title", style.graphicTitle);
                    //Standards-conformant SVG
                    var label = this.nodeFactory(null, "title");
                    label.textContent = style.graphicTitle;
                    node.appendChild(label);
                }
                if (style.graphicWidth && style.graphicHeight) {
                  node.setAttributeNS(null, "preserveAspectRatio", "none");
                }
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = width ? width : style.pointRadius*2;
                height = height ? height : style.pointRadius*2;
                var xOffset = (style.graphicXOffset != undefined) ?
                    style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ?
                    style.graphicYOffset : -(0.5 * height);

                var opacity = style.graphicOpacity || style.fillOpacity;
                
                node.setAttributeNS(null, "x", (pos.x + xOffset).toFixed());
                node.setAttributeNS(null, "y", (pos.y + yOffset).toFixed());
                node.setAttributeNS(null, "width", width);
                node.setAttributeNS(null, "height", height);
                node.setAttributeNS(this.xlinkns, "href", style.externalGraphic);
                node.setAttributeNS(null, "style", "opacity: "+opacity);
                node.onclick = OpenLayers.Renderer.SVG.preventDefault;
            } else if (this.isComplexSymbol(style.graphicName)) {
                // the symbol viewBox is three times as large as the symbol
                var offset = style.pointRadius * 3;
                var size = offset * 2;
                var src = this.importSymbol(style.graphicName);
                pos = this.getPosition(node);
                widthFactor = this.symbolMetrics[src.id][0] * 3 / size;
                
                // remove the node from the dom before we modify it. This
                // prevents various rendering issues in Safari and FF
                var parent = node.parentNode;
                var nextSibling = node.nextSibling;
                if(parent) {
                    parent.removeChild(node);
                }
                
                // The more appropriate way to implement this would be use/defs,
                // but due to various issues in several browsers, it is safer to
                // copy the symbols instead of referencing them. 
                // See e.g. ticket http://trac.osgeo.org/openlayers/ticket/2985 
                // and this email thread
                // http://osgeo-org.1803224.n2.nabble.com/Select-Control-Ctrl-click-on-Feature-with-a-graphicName-opens-new-browser-window-tc5846039.html
                node.firstChild && node.removeChild(node.firstChild);
                node.appendChild(src.firstChild.cloneNode(true));
                node.setAttributeNS(null, "viewBox", src.getAttributeNS(null, "viewBox"));
                
                node.setAttributeNS(null, "width", size);
                node.setAttributeNS(null, "height", size);
                node.setAttributeNS(null, "x", pos.x - offset);
                node.setAttributeNS(null, "y", pos.y - offset);
                
                // now that the node has all its new properties, insert it
                // back into the dom where it was
                if(nextSibling) {
                    parent.insertBefore(node, nextSibling);
                } else if(parent) {
                    parent.appendChild(node);
                }
            } else {
                node.setAttributeNS(null, "r", style.pointRadius);
            }

            var rotation = style.rotation;
            
            if ((rotation !== undefined || node._rotation !== undefined) && pos) {
                node._rotation = rotation;
                rotation |= 0;
                if (node.nodeName !== "svg") { 
                    node.setAttributeNS(null, "transform", 
                        "rotate(" + rotation + " " + pos.x + " " + 
                        pos.y + ")"); 
                } else {
                    var metrics = this.symbolMetrics[src.id];
                    node.firstChild.setAttributeNS(null, "transform", "rotate(" 
                        + rotation + " " 
                        + metrics[1] + " "
                        + metrics[2] + ")");
                }
            }
        }
        
        if (options.isFilled) {
            node.setAttributeNS(null, "fill", style.fillColor);
            node.setAttributeNS(null, "fill-opacity", style.fillOpacity);
        } else {
            node.setAttributeNS(null, "fill", "none");
        }

        if (options.isStroked) {
            node.setAttributeNS(null, "stroke", style.strokeColor);
            node.setAttributeNS(null, "stroke-opacity", style.strokeOpacity);
            node.setAttributeNS(null, "stroke-width", style.strokeWidth * widthFactor);
            node.setAttributeNS(null, "stroke-linecap", style.strokeLinecap || "round");
            // Hard-coded linejoin for now, to make it look the same as in VML.
            // There is no strokeLinejoin property yet for symbolizers.
            node.setAttributeNS(null, "stroke-linejoin", "round");
            style.strokeDashstyle && node.setAttributeNS(null,
                "stroke-dasharray", this.dashStyle(style, widthFactor));
        } else {
            node.setAttributeNS(null, "stroke", "none");
        }
        
        if (style.pointerEvents) {
            node.setAttributeNS(null, "pointer-events", style.pointerEvents);
        }
                
        if (style.cursor != null) {
            node.setAttributeNS(null, "cursor", style.cursor);
        }
        
        return node;
    },

    /** 
     * Method: dashStyle
     * 
     * Parameters:
     * style - {Object}
     * widthFactor - {Number}
     * 
     * Returns:
     * {String} A SVG compliant 'stroke-dasharray' value
     */
    dashStyle: function(style, widthFactor) {
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle;
        switch (str) {
            case 'solid':
                return 'none';
            case 'dot':
                return [1, 4 * w].join();
            case 'dash':
                return [4 * w, 4 * w].join();
            case 'dashdot':
                return [4 * w, 4 * w, 1, 4 * w].join();
            case 'longdash':
                return [8 * w, 4 * w].join();
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w].join();
            default:
                return OpenLayers.String.trim(str).replace(/\s+/g, ",");
        }
    },
    
    /** 
     * Method: createNode
     * 
     * Parameters:
     * type - {String} Kind of node to draw
     * id - {String} Id for node
     * 
     * Returns:
     * {DOMElement} A new node of the given type and id
     */
    createNode: function(type, id) {
        var node = document.createElementNS(this.xmlns, type);
        if (id) {
            node.setAttributeNS(null, "id", id);
        }
        return node;    
    },
    
    /** 
     * Method: nodeTypeCompare
     * 
     * Parameters:
     * node - {SVGDomElement} An SVG element
     * type - {String} Kind of node
     * 
     * Returns:
     * {Boolean} Whether or not the specified node is of the specified type
     */
    nodeTypeCompare: function(node, type) {
        return (type == node.nodeName);
    },
   
    /**
     * Method: createRenderRoot
     * 
     * Returns:
     * {DOMElement} The specific render engine's root element
     */
    createRenderRoot: function() {
        return this.nodeFactory(this.container.id + "_svgRoot", "svg");
    },

    /**
     * Method: createRoot
     * 
     * Parameter:
     * suffix - {String} suffix to append to the id
     * 
     * Returns:
     * {DOMElement}
     */
    createRoot: function(suffix) {
        return this.nodeFactory(this.container.id + suffix, "g");
    },

    /**
     * Method: createDefs
     *
     * Returns:
     * {DOMElement} The element to which we'll add the symbol definitions
     */
    createDefs: function() {
        var defs = this.nodeFactory(this.container.id + "_defs", "defs");
        this.rendererRoot.appendChild(defs);
        return defs;
    },

    /**************************************
     *                                    *
     *     GEOMETRY DRAWING FUNCTIONS     *
     *                                    *
     **************************************/

    /**
     * Method: drawPoint
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the point
     */ 
    drawPoint: function(node, geometry) {
        return this.drawCircle(node, geometry, 1);
    },

    /**
     * Method: drawCircle
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * radius - {Float}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the circle
     */
    drawCircle: function(node, geometry, radius) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);

        if (this.inValidRange(x, y)) { 
            node.setAttributeNS(null, "cx", x);
            node.setAttributeNS(null, "cy", y);
            node.setAttributeNS(null, "r", radius);
            return node;
        } else {
            return false;
        }    
            
    },
    
    /**
     * Method: drawLineString
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components of
     *     the linestring, or false if nothing could be drawn
     */ 
    drawLineString: function(node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);  
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawLinearRing
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the linear ring, or false if nothing could be drawn
     */ 
    drawLinearRing: function(node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);  
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawPolygon
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the polygon, or false if nothing could be drawn
     */ 
    drawPolygon: function(node, geometry) {
        var d = "";
        var draw = true;
        var complete = true;
        var linearRingResult, path;
        for (var j=0, len=geometry.components.length; j<len; j++) {
            d += " M";
            linearRingResult = this.getComponentsString(
                geometry.components[j].components, " ");
            path = linearRingResult.path;
            if (path) {
                d += " " + path;
                complete = linearRingResult.complete && complete;
            } else {
                draw = false;
            }
        }
        d += " z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            node.setAttributeNS(null, "fill-rule", "evenodd");
            return complete ? node : null;
        } else {
            return false;
        }    
    },
    
    /**
     * Method: drawRectangle
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the rectangle
     */ 
    drawRectangle: function(node, geometry) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);

        if (this.inValidRange(x, y)) { 
            node.setAttributeNS(null, "x", x);
            node.setAttributeNS(null, "y", y);
            node.setAttributeNS(null, "width", geometry.width / resolution);
            node.setAttributeNS(null, "height", geometry.height / resolution);
            return node;
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawSurface
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<OpenLayers.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the surface
     */ 
    drawSurface: function(node, geometry) {

        // create the svg path string representation
        var d = null;
        var draw = true;
        for (var i=0, len=geometry.components.length; i<len; i++) {
            if ((i%3) == 0 && (i/3) == 0) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d = "M " + component;
            } else if ((i%3) == 1) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d += " C " + component;
            } else {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d += " " + component;
            }
        }
        d += " Z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            return node;
        } else {
            return false;
        }    
    },
    
    /**
     * Method: drawText
     * This method is only called by the renderer itself.
     *
     * Parameters:
     * featureId - {String}
     * style -
     * location - {<OpenLayers.Geometry.Point>}
     */
    drawText: function(featureId, style, location) {
        var resolution = this.getResolution();

        var x = (location.x / resolution + this.left);
        var y = (location.y / resolution - this.top);

        var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "text");

        label.setAttributeNS(null, "x", x);
        label.setAttributeNS(null, "y", -y);

        if (style.fontColor) {
            label.setAttributeNS(null, "fill", style.fontColor);
        }
        if (style.fontOpacity) {
            label.setAttributeNS(null, "opacity", style.fontOpacity);
        }
        if (style.fontFamily) {
            label.setAttributeNS(null, "font-family", style.fontFamily);
        }
        if (style.fontSize) {
            label.setAttributeNS(null, "font-size", style.fontSize);
        }
        if (style.fontWeight) {
            label.setAttributeNS(null, "font-weight", style.fontWeight);
        }
        if (style.fontStyle) {
            label.setAttributeNS(null, "font-style", style.fontStyle);
        }
        if (style.labelSelect === true) {
            label.setAttributeNS(null, "pointer-events", "visible");
            label._featureId = featureId;
        } else {
            label.setAttributeNS(null, "pointer-events", "none");
        }
        var align = style.labelAlign || "cm";
        label.setAttributeNS(null, "text-anchor",
            OpenLayers.Renderer.SVG.LABEL_ALIGN[align[0]] || "middle");

        if (OpenLayers.IS_GECKO === true) {
            label.setAttributeNS(null, "dominant-baseline",
                OpenLayers.Renderer.SVG.LABEL_ALIGN[align[1]] || "central");
        }

        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        while (label.childNodes.length > numRows) {
            label.removeChild(label.lastChild);
        }
        for (var i = 0; i < numRows; i++) {
            var tspan = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX + "_tspan_" + i, "tspan");
            if (style.labelSelect === true) {
                tspan._featureId = featureId;
                tspan._geometry = location;
                tspan._geometryClass = location.CLASS_NAME;
            }
            if (OpenLayers.IS_GECKO === false) {
                tspan.setAttributeNS(null, "baseline-shift",
                    OpenLayers.Renderer.SVG.LABEL_VSHIFT[align[1]] || "-35%");
            }
            tspan.setAttribute("x", x);
            if (i == 0) {
                var vfactor = OpenLayers.Renderer.SVG.LABEL_VFACTOR[align[1]];
                if (vfactor == null) {
                     vfactor = -.5;
                }
                tspan.setAttribute("dy", (vfactor*(numRows-1)) + "em");
            } else {
                tspan.setAttribute("dy", "1em");
            }
            tspan.textContent = (labelRows[i] === '') ? ' ' : labelRows[i];
            if (!tspan.parentNode) {
                label.appendChild(tspan);
            }
        }

        if (!label.parentNode) {
            this.textRoot.appendChild(label);
        }
    },
    
    /** 
     * Method: getComponentString
     * 
     * Parameters:
     * components - {Array(<OpenLayers.Geometry.Point>)} Array of points
     * separator - {String} character between coordinate pairs. Defaults to ","
     * 
     * Returns:
     * {Object} hash with properties "path" (the string created from the
     *     components and "complete" (false if the renderer was unable to
     *     draw all components)
     */
    getComponentsString: function(components, separator) {
        var renderCmp = [];
        var complete = true;
        var len = components.length;
        var strings = [];
        var str, component;
        for(var i=0; i<len; i++) {
            component = components[i];
            renderCmp.push(component);
            str = this.getShortString(component);
            if (str) {
                strings.push(str);
            } else {
                // The current component is outside the valid range. Let's
                // see if the previous or next component is inside the range.
                // If so, add the coordinate of the intersection with the
                // valid range bounds.
                if (i > 0) {
                    if (this.getShortString(components[i - 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i-1]));
                    }
                }
                if (i < len - 1) {
                    if (this.getShortString(components[i + 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i+1]));
                    }
                }
                complete = false;
            }
        }

        return {
            path: strings.join(separator || ","),
            complete: complete
        };
    },
    
    /**
     * Method: clipLine
     * Given two points (one inside the valid range, and one outside),
     * clips the line betweeen the two points so that the new points are both
     * inside the valid range.
     * 
     * Parameters:
     * badComponent - {<OpenLayers.Geometry.Point>} original geometry of the
     *     invalid point
     * goodComponent - {<OpenLayers.Geometry.Point>} original geometry of the
     *     valid point
     * Returns
     * {String} the SVG coordinate pair of the clipped point (like
     *     getShortString), or an empty string if both passed componets are at
     *     the same point.
     */
    clipLine: function(badComponent, goodComponent) {
        if (goodComponent.equals(badComponent)) {
            return "";
        }
        var resolution = this.getResolution();
        var maxX = this.MAX_PIXEL - this.translationParameters.x;
        var maxY = this.MAX_PIXEL - this.translationParameters.y;
        var x1 = goodComponent.x / resolution + this.left;
        var y1 = this.top - goodComponent.y / resolution;
        var x2 = badComponent.x / resolution + this.left;
        var y2 = this.top - badComponent.y / resolution;
        var k;
        if (x2 < -maxX || x2 > maxX) {
            k = (y2 - y1) / (x2 - x1);
            x2 = x2 < 0 ? -maxX : maxX;
            y2 = y1 + (x2 - x1) * k;
        }
        if (y2 < -maxY || y2 > maxY) {
            k = (x2 - x1) / (y2 - y1);
            y2 = y2 < 0 ? -maxY : maxY;
            x2 = x1 + (y2 - y1) * k;
        }
        return x2 + "," + y2;
    },

    /** 
     * Method: getShortString
     * 
     * Parameters:
     * point - {<OpenLayers.Geometry.Point>}
     * 
     * Returns:
     * {String} or false if point is outside the valid range
     */
    getShortString: function(point) {
        var resolution = this.getResolution();
        var x = (point.x / resolution + this.left);
        var y = (this.top - point.y / resolution);

        if (this.inValidRange(x, y)) { 
            return x + "," + y;
        } else {
            return false;
        }
    },
    
    /**
     * Method: getPosition
     * Finds the position of an svg node.
     * 
     * Parameters:
     * node - {DOMElement}
     * 
     * Returns:
     * {Object} hash with x and y properties, representing the coordinates
     *     within the svg coordinate system
     */
    getPosition: function(node) {
        return({
            x: parseFloat(node.getAttributeNS(null, "cx")),
            y: parseFloat(node.getAttributeNS(null, "cy"))
        });
    },

    /**
     * Method: importSymbol
     * add a new symbol definition from the rendererer's symbol hash
     * 
     * Parameters:
     * graphicName - {String} name of the symbol to import
     * 
     * Returns:
     * {DOMElement} - the imported symbol
     */      
    importSymbol: function (graphicName)  {
        if (!this.defs) {
            // create svg defs tag
            this.defs = this.createDefs();
        }
        var id = this.container.id + "-" + graphicName;
        
        // check if symbol already exists in the defs
        var existing = document.getElementById(id)
        if (existing != null) {
            return existing;
        }
        
        var symbol = OpenLayers.Renderer.symbol[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
        }

        var symbolNode = this.nodeFactory(id, "symbol");
        var node = this.nodeFactory(null, "polygon");
        symbolNode.appendChild(node);
        var symbolExtent = new OpenLayers.Bounds(
                                    Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);

        var points = [];
        var x,y;
        for (var i=0; i<symbol.length; i=i+2) {
            x = symbol[i];
            y = symbol[i+1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            points.push(x, ",", y);
        }
        
        node.setAttributeNS(null, "points", points.join(" "));
        
        var width = symbolExtent.getWidth();
        var height = symbolExtent.getHeight();
        // create a viewBox three times as large as the symbol itself,
        // to allow for strokeWidth being displayed correctly at the corners.
        var viewBox = [symbolExtent.left - width,
                        symbolExtent.bottom - height, width * 3, height * 3];
        symbolNode.setAttributeNS(null, "viewBox", viewBox.join(" "));
        this.symbolMetrics[id] = [
            Math.max(width, height),
            symbolExtent.getCenterLonLat().lon,
            symbolExtent.getCenterLonLat().lat
        ];
        
        this.defs.appendChild(symbolNode);
        return symbolNode;
    },
    
    /**
     * Method: getFeatureIdFromEvent
     * 
     * Parameters:
     * evt - {Object} An <OpenLayers.Event> object
     *
     * Returns:
     * {<OpenLayers.Geometry>} A geometry from an event that 
     *     happened on a layer.
     */
    getFeatureIdFromEvent: function(evt) {
        var featureId = OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this, arguments);
        if(!featureId) {
            var target = evt.target;
            featureId = target.parentNode && target != this.rendererRoot &&
                target.parentNode._featureId;
        }
        return featureId;
    },

    CLASS_NAME: "OpenLayers.Renderer.SVG"
});

/**
 * Constant: OpenLayers.Renderer.SVG.LABEL_ALIGN
 * {Object}
 */
OpenLayers.Renderer.SVG.LABEL_ALIGN = {
    "l": "start",
    "r": "end",
    "b": "bottom",
    "t": "hanging"
};

/**
 * Constant: OpenLayers.Renderer.SVG.LABEL_VSHIFT
 * {Object}
 */
OpenLayers.Renderer.SVG.LABEL_VSHIFT = {
    // according to
    // http://www.w3.org/Graphics/SVG/Test/20061213/htmlObjectHarness/full-text-align-02-b.html
    // a baseline-shift of -70% shifts the text exactly from the
    // bottom to the top of the baseline, so -35% moves the text to
    // the center of the baseline.
    "t": "-70%",
    "b": "0"    
};

/**
 * Constant: OpenLayers.Renderer.SVG.LABEL_VFACTOR
 * {Object}
 */
OpenLayers.Renderer.SVG.LABEL_VFACTOR = {
    "t": 0,
    "b": -1
};

/**
 * Function: OpenLayers.Renderer.SVG.preventDefault
 * Used to prevent default events (especially opening images in a new tab on
 * ctrl-click) from being executed for externalGraphic symbols
 */
OpenLayers.Renderer.SVG.preventDefault = function(e) {
    e.preventDefault && e.preventDefault();
};
