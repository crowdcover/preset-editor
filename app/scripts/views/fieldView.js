define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/fieldTemplate._',
    'app',
    'core/connection'
],

    function (Backbone, Marionette, _, fieldTemplate, app) {
        
        return Marionette.ItemView.extend({

            template: _.template(fieldTemplate),

            events: {
                'click #addOption': 'clickAddOption',
                'click #save': 'save'
            },

            ui: {
                'options': '#options',
                'key': '#fieldKey',
                'label': '#fieldLabel'
            },

            initialize: function (options) {
                this.presetModel = options.presetModel;
                this.viewType = options.fieldViewType;
            },

            clickAddOption: function (event) {
                var name = ''
                this.addOption(name);
            },

            addOption: function (name) {
                console.log(name);

                var $input = $('<input />').addClass('form-control')
                    .addClass('fieldOption')
                    .attr('placeholder', 'Option')
                    .val(name)
                    .appendTo(this.ui.options);

                var $close = $('<button />').addClass('close')
                    .attr('type', 'button')
                    .attr('aria-hidden', 'true')
                    .html('&times;')
                    .insertAfter($input);
            },

            onRender: function() {
                var that = this;

                if (typeof(this.model.get('options')) !== 'undefined') {
                    
                    this.model.get('options').forEach(function(option) {
                        that.addOption(option);
                    });

                }
            },
            templateHelpers: function() {
        
            },

            save: function () {
                var fieldType = this.model.get('type');
                var fieldName = this.ui.key.val();
                var fieldLabel = this.ui.label.val();
                var props = {};

                // Set the key and label.
                props['key'] = fieldName;
                props['label'] = fieldLabel;

                if (fieldType === 'radio' || fieldType === 'combo') {
                    var options = this.$el.find('.fieldOption').map(function() {
                        return this.value;
                    }).get();

                    // Set the additional stuff.
                    props['options'] = options;
                }

                this.model.set(props);

                //TODO: add if statement for 'check'   
                this.presetModel.addField(fieldName);
                console.log(this.presetModel);
                console.log('Field', this.model);
                app.modalRegion.close();
            }
        });
    });