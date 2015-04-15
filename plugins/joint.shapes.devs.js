
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

    joint.shapes.devs = {};

    joint.shapes.devs.Model = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
        portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

        defaults: joint.util.deepSupplement({

            type: 'devs.Model',
            size: { width: 1, height: 1 },
            
            inPorts: [],
            outPorts: [],

            attrs: {
                '.': { magnet: false },
                '.body': {
                    width: 150, height: 250,
                    stroke: '#000000'
                },
                '.port-body': {
                    r: 10,
                    magnet: true,
                    stroke: '#000000'
                },
                text: {
                    'pointer-events': 'none'
                },
                '.label': { text: 'Model', 'ref-x': .5, 'ref-y': 10, ref: '.body', 'text-anchor': 'middle', fill: '#000000' },
                '.inPorts .port-label': { x:-15, dy: 4, 'text-anchor': 'end', fill: '#000000' },
                '.outPorts .port-label':{ x: 15, dy: 4, fill: '#000000' }
            }

        }, joint.shapes.basic.Generic.prototype.defaults),

        getPortAttrs: function(portName, index, total, selector, type) {

            var attrs = {};

            var portClass = 'port' + index;
            var portSelector = selector + '>.' + portClass;
            var portLabelSelector = portSelector + '>.port-label';
            var portBodySelector = portSelector + '>.port-body';

            attrs[portLabelSelector] = { text: portName };
            attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
            attrs[portSelector] = { ref: '.body', 'ref-y': (index + 0.5) * (1 / total) };

            if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }

            return attrs;
        }
    }));


    joint.shapes.devs.Atomic = joint.shapes.devs.Model.extend({

        defaults: joint.util.deepSupplement({

            type: 'devs.Atomic',
            size: { width: 80, height: 80 },
            attrs: {
                '.body': { fill: 'salmon' },
                '.label': { text: 'Atomic' },
                '.inPorts .port-body': { fill: 'PaleGreen' },
                '.outPorts .port-body': { fill: 'Tomato' }
            }

        }, joint.shapes.devs.Model.prototype.defaults)

    });

    joint.shapes.devs.Coupled = joint.shapes.devs.Model.extend({

        defaults: joint.util.deepSupplement({

            type: 'devs.Coupled',
            size: { width: 200, height: 300 },
            attrs: {
                '.body': { fill: 'seaGreen' },
                '.label': { text: 'Coupled' },
                '.inPorts .port-body': { fill: 'PaleGreen' },
                '.outPorts .port-body': { fill: 'Tomato' }
            }

        }, joint.shapes.devs.Model.prototype.defaults)
    });

    joint.shapes.devs.Link = joint.dia.Link.extend({

        defaults: {
            type: 'devs.Link',
            attrs: { '.connection' : { 'stroke-width' :  2 }}
        }
    });

    joint.shapes.devs.ModelView = joint.dia.ElementView.extend(joint.shapes.basic.PortsViewInterface);
    joint.shapes.devs.AtomicView = joint.shapes.devs.ModelView;
    joint.shapes.devs.CoupledView = joint.shapes.devs.ModelView;

});