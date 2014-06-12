define([
    'backbone'
],

function (Backbone) {
    var Field = Backbone.Model.extend({
        defaults: {
            key: '',
            label: ''
        }
    });
    return Field;
});
