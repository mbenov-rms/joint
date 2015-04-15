
//      JointJS library.
//      (c) 2011-2013 client IO


(function (root, factory){

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["JointJS", "lodash"], factory);
    } else if (typeof exports === 'object') {
        // CommonJS module
        var joint = require('JointJS');
        var _ = require('lodash');
        
        factory(joint, _);
    } else {
        // Browser globals.
        var joint = root.joint;
        var _ = root._;
        
        factory(joint, _);
    }
})(this, function(joint, _, Backbone, V, g, $){
    joint.connectors.normal = function(sourcePoint, targetPoint, vertices) {

        // Construct the `d` attribute of the `<path>` element.
        var d = ['M', sourcePoint.x, sourcePoint.y];

        _.each(vertices, function(vertex) {

            d.push(vertex.x, vertex.y);
        });

        d.push(targetPoint.x, targetPoint.y);

        return d.join(' ');
    };
});
