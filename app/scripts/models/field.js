define([
    'backbone'
],

function (Backbone) {
    var Field = Backbone.Model.extend({
        defaults: {
            name: '',
            key: '',
            label: ''
        },
        idAttribute: 'name'
    });
    return Field;
});
