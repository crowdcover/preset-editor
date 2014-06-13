define([
    'backbone',
    'models/field'
],

function (Backbone, Field) {
    var Fields = Backbone.Collection.extend({
        model: Field
    });
    return Fields;
});
