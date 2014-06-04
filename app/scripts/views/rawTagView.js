define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/rawTag._',
    'app',
    'core/connection'
],

    function (Backbone, Marionette, _, rawTagTemplate, app) {
        
        return Marionette.ItemView.extend({

            template: _.template(rawTagTemplate),

            events: {
                'click #save': 'save'
            },

            ui: {
                'key': '#tagKey',
                'value': '#tagValue',
                'options': '#options'
            },

            initialize: function () {
            },

            save: function () {
                console.log('save');

                var key = this.ui.key.val();
                var value = this.ui.value.val();

                this.model.addTag(key, value);

                console.log(this.model);

                var preset = this.model;
                app.modalRegion.close();
            }
        });
    });