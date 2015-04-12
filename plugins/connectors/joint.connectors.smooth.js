(function (root, factory){

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["joint", "lodash", "Backbone", "Vectorizer", "Geometry", "jQuery"], factory);
        
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
    joint.connectors.smooth = function(sourcePoint, targetPoint, vertices) {

        var d;

        if (vertices.length) {

            d = g.bezier.curveThroughPoints([sourcePoint].concat(vertices).concat([targetPoint]));

        } else {
            // if we have no vertices use a default cubic bezier curve, cubic bezier requires
            // two control points. The two control points are both defined with X as mid way
            // between the source and target points. SourceControlPoint Y is equal to sourcePoint Y
            // and targetControlPointY being equal to targetPointY. Handle situation were
            // sourcePointX is greater or less then targetPointX.
            var controlPointX = (sourcePoint.x < targetPoint.x) 
                    ? targetPoint.x - ((targetPoint.x - sourcePoint.x) / 2)
                    : sourcePoint.x - ((sourcePoint.x - targetPoint.x) / 2);

            d = [
                'M', sourcePoint.x, sourcePoint.y,
                'C', controlPointX, sourcePoint.y, controlPointX, targetPoint.y,
                targetPoint.x, targetPoint.y
            ];
        }

        return d.join(' ');
    };
});