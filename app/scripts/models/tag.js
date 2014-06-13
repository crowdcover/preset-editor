define([
    'backbone'
],

function (Backbone) {
    var Tag = Backbone.Model.extend({
        defaults: {
            key: '',
            value: ''
        },
        idAttribute: 'key'
    });
    return Tag;
});
