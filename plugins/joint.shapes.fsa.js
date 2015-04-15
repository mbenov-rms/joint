
//      JointJS library.
//      (c) 2011-2013 client IO


(function (root, factory){

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["JointJS", "lodash", "Backbone", "Vectorizer", "Geometry", "jQuery"], factory);
    } else if (typeof exports === 'object') {
        // CommonJS module
        var joint = require('JointJS');
        var $ = require('$') || require('jQuery') ;
        var Backbone = require('Backbone');
        var _ = require('lodash');
        var Vectorizer = require('V') || require('Vectorizer');
        var Geometry = require('G') || require('Geometry') || require('g');
        
        factory(joint, _, Backbone, Vectorizer, Geometry, $);
    } else {
        // Browser globals.
        var joint = root.joint;
        var $ = root.$ || root.jQuery;
        var Backbone = root.Backbone;
        var _ = root._;
        var Vectorizer = root.V || root.Vectorizer;
        var Geometry = root.G || root.Geometry || root.g;
        
        factory(joint, _, Backbone, Vectorizer, Geometry, $);
    }
})(this, function(joint, _, Backbone, V, g, $){

    joint.shapes.fsa = {};

    joint.shapes.fsa.State = joint.shapes.basic.Circle.extend({
        defaults: joint.util.deepSupplement({
            type: 'fsa.State',
            attrs: {
                circle: { 'stroke-width': 3 },
                text: { 'font-weight': '800' }
            }
        }, joint.shapes.basic.Circle.prototype.defaults)
    });

    joint.shapes.fsa.StartState = joint.dia.Element.extend({

        markup: '<g class="rotatable"><g class="scalable"><circle/></g></g>',

        defaults: joint.util.deepSupplement({

            type: 'fsa.StartState',
            size: { width: 20, height: 20 },
            attrs: {
                circle: {
                    transform: 'translate(10, 10)',
                    r: 10,
                    fill: '#000000'
                }
            }

        }, joint.dia.Element.prototype.defaults)
    });

    joint.shapes.fsa.EndState = joint.dia.Element.extend({

        markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',

        defaults: joint.util.deepSupplement({

            type: 'fsa.EndState',
            size: { width: 20, height: 20 },
            attrs: {
                '.outer': {
                    transform: 'translate(10, 10)',
                    r: 10,
                    fill: '#ffffff',
                    stroke: '#000000'
                },

                '.inner': {
                    transform: 'translate(10, 10)',
                    r: 6,
                    fill: '#000000'
                }
            }

        }, joint.dia.Element.prototype.defaults)
    });

    joint.shapes.fsa.Arrow = joint.dia.Link.extend({

        defaults: joint.util.deepSupplement({
        type: 'fsa.Arrow',
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }},
            smooth: true
        }, joint.dia.Link.prototype.defaults)
    });

});