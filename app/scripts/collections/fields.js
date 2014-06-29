define([
    'backbone',
    'models/field',
    'settings'
],

function (Backbone, Field, settings) {
    var Fields = Backbone.Collection.extend({
        model: Field,
        url: function() {
            return '/api/0.6/fields.json';
        },
        parse: function (response) {
            var array = _.toArray(response);
            _(response).keys().forEach(function (o, i) {
                // Split the 'moabi/<id>' and get the id.
                array[i].name = o;
            });
            return array;

        }
    });
    return Fields;
});
