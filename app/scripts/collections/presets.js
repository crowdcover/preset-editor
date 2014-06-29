define([
    'backbone',
    'models/preset',
    'settings'
],

function (Backbone, Preset, settings) {
    var Presets = Backbone.Collection.extend({
        model: Preset,
        url: function () {
            return '/api/0.6/presets.json';
        },
        parse: function (response) {
            var array = _.toArray(response);
                _(response).keys().forEach(function(o, i) {
                    // Split the 'moabi/<id>' and get the id.
                    array[i].id = o.split('/')[1];
            });
            return array;
        }
    });
    return Presets;
});
