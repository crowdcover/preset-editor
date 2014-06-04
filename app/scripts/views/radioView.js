define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/radioField._',
    'app',
    'core/connection'
],

    function (Backbone, Marionette, _, radioFieldTemplate, app) {
        
        return Marionette.ItemView.extend({

            template: _.template(radioFieldTemplate),

            events: {
                'click #addOption': 'addOption',
                'click #save': 'save'
            },

            ui: {
                'options': '#options',
                'key': '#fieldKey'
            },

            initialize: function (options) {
                this.presetModel = options.presetModel;
            },

            addOption: function () {

                $('<input />').addClass('form-control')
                    .attr('placeholder', 'Option')
                    .appendTo(this.ui.options);
            },

            save: function () {
                console.log('save');

                var fieldName = this.ui.key.val();
                this.presetModel.addField(fieldName);
                console.log(this.presetModel);
                app.modalRegion.close();
            }
        });
    });