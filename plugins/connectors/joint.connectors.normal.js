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
