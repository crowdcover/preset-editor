define([
    'backbone',
    'marionette',
    'text!templates/searchView._'
],

    function (Backbone, Marionette, searchViewTemplate) {

        return Backbone.Marionette.ItemView.extend({

            template: _.template(searchViewTemplate),

            templateHelpers: function () {
                return this.model.get('geometry');
            },

            events: {
                'click #add': 'addPreset'
            },

            initialize: function () {},

            onRender: function () {
                // instantiate typeahead.
            },

            onClose: function () {
                // clear stuff like typeahead.
            },

            addPreset: function () {
                console.log('adding a preset');
                console.log(this.model.get('geometry'));
            }

        });
});
