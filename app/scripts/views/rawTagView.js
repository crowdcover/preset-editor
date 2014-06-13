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

            initialize: function (options) {
                this.presetModel = options.presetModel;
            },

            save: function () {

                var key = this.ui.key.val();
                var value = this.ui.value.val();

                var previousAttributes = _.clone(this.model.attributes);

                // FIXME: Use a single set operation. 
                this.model.set('key', key);
                this.model.set('value', value);

                this.presetModel.addTag(this.model, previousAttributes);

                // var preset = this.model;
                app.modalRegion.close();
            }
        });
    });