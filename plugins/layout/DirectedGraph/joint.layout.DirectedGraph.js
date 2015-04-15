
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

    joint.layout.DirectedGraph = {

        layout: function(graph, opt) {

            opt = opt || {};

            var inputGraph = this._prepareData(graph);
            var runner = dagre.layout();

            if (opt.debugLevel) { runner.debugLevel(opt.debugLevel); }
            if (opt.rankDir) { runner.rankDir(opt.rankDir); }
            if (opt.rankSep) { runner.rankSep(opt.rankSep); }
            if (opt.edgeSep) { runner.edgeSep(opt.edgeSep); }
            if (opt.nodeSep) { runner.nodeSep(opt.nodeSep); }

            var layoutGraph = runner.run(inputGraph);
            
            layoutGraph.eachNode(function(u, value) {
                if (!value.dummy) {

            var cell = graph.getCell(u);
            opt.setPosition 
                ? opt.setPosition(cell, value)
                : graph.get('cells').get(u).set('position', {
                x: value.x - value.width/2,
                y: value.y - value.height/2
                        });
                }
            });

            if (opt.setLinkVertices) {

                layoutGraph.eachEdge(function(e, u, v, value) {
                    var link = graph.getCell(e);
                    if (link) {
                opt.setVertices
                ? opt.setVertices(link, value.points)
                : link.set('vertices', value.points);
                    }
                });
            }

            return { width: layoutGraph.graph().width, height: layoutGraph.graph().height };
        },
        
        _prepareData: function(graph) {

            var dagreGraph = new dagre.Digraph();

            // For each element.
            _.each(graph.getElements(), function(cell) {

                if (dagreGraph.hasNode(cell.id)) return;

                dagreGraph.addNode(cell.id, {
                    width: cell.get('size').width,
                    height: cell.get('size').height,
                    rank: cell.get('rank')
                });
            });

            // For each link.
            _.each(graph.getLinks(), function(cell) {

                if (dagreGraph.hasEdge(cell.id)) return;

                var sourceId = cell.get('source').id;
                var targetId = cell.get('target').id;

                dagreGraph.addEdge(cell.id, sourceId, targetId, { minLen: cell.get('minLen') || 1 });
            });

            return dagreGraph;
        }
    };
});