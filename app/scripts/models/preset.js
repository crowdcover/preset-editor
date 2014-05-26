define([
    'backbone'
],

function (Backbone) {
    var Preset = Backbone.Model.extend({
        defaults: {
            geometry: ['point', 'line', 'area']
        },
        name: '',
        geometry: [],
        tags: {}

    });

    return Preset;
});
