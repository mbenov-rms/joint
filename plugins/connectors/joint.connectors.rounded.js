
//      JointJS library.
//      (c) 2011-2013 client IO


(function (root, factory){

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["JointJS", "lodash", "Geometry"], factory);
    } else if (typeof exports === 'object') {
        // CommonJS module
        var joint = require('JointJS');
        var _ = require('lodash');
        var Geometry = require('G') || require('Geometry') || require('g');
        
        factory(joint, _, Geometry);
    } else {
        // Browser globals.
        var joint = root.joint;
        var _ = root._;
        var Geometry = root.G || root.Geometry || root.g;
        
        factory(joint, _, Geometry);
    }
})(this, function(joint, _, g){

    joint.connectors.rounded = function(sourcePoint, targetPoint, vertices, opts) {

        var offset = opts.radius || 10;

        var c1, c2, d1, d2, prev, next;

        // Construct the `d` attribute of the `<path>` element.
        var d = ['M', sourcePoint.x, sourcePoint.y];

        _.each(vertices, function(vertex, index) {

            // the closest vertices
            prev = vertices[index-1] || sourcePoint;
            next = vertices[index+1] || targetPoint;

            // a half distance to the closest vertex
            d1 = d2 || g.point(vertex).distance(prev) / 2;
            d2 = g.point(vertex).distance(next) / 2;

            // control points
            c1 = g.point(vertex).move(prev, -Math.min(offset, d1)).round();
            c2 = g.point(vertex).move(next, -Math.min(offset, d2)).round();

            d.push(c1.x, c1.y, 'S', vertex.x, vertex.y, c2.x, c2.y, 'L');
        });

        d.push(targetPoint.x, targetPoint.y);

        return d.join(' ');
    };
});
