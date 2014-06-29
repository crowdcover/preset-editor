define([
    'backbone',
    'settings'
],

function (Backbone, settings) {
    var Field = Backbone.Model.extend({
        defaults: {
            key: '',
            label: ''
        },
        idAttribute: 'name',
        urlRoot: '/api/0.6/fields'
    });
    return Field;
});
