define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/fieldTemplate._',
    'app'
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
                'name': '#fieldName',
                'key': '#fieldKey',
                'label': '#fieldLabel',
                'saveButton': '#save'
            },

            initialize: function (options) {
                this.presetModel = options.presetModel;
                this.viewType = options.fieldViewType;
            },

            clickAddOption: function (event) {
                var name = '';
                this.addOption(name);
            },

            addOption: function (name) {

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

            onRender: function () {
                var that = this;

                if (typeof(this.model.get('options')) !== 'undefined') {
                    
                    this.model.get('options').forEach(function (option) {
                        that.addOption(option);
                    });

                }
            },
            templateHelpers: function () {
                
                if (this.model.get('name')) {
                    return {'isEdit': true};
                }
                else {
                    return {'isEdit': false};
                }
        
            },

            save: function () {
                var fieldType = this.model.get('type');
                var fieldKey = this.ui.key.val();
                var fieldLabel = this.ui.label.val();
                var props = {};

                // Set the key and label.
                props['key'] = fieldKey;
                props['label'] = fieldLabel;

                if (fieldType === 'radio' || fieldType === 'combo') {
                    var options = this.$el.find('.fieldOption').map(function () {
                        return this.value;
                    }).get();

                    // Set the additional stuff.
                    props['options'] = options;
                }
                var previousAttributes = _.clone(this.model.attributes);

                this.model.set(props);
                //TODO: add if statement for 'check'   
                // this.presetModel.addField(this.model, previousAttributes);

                this.ui.saveButton.button('loading');
                var that = this;

                this.model.save({}, {success: function (model, response, options) {

                    model.set('name', String(response.id));
                    app.collections.fields.set(model, {'remove': false});
                    that.presetModel.addField(model, previousAttributes);
                    that.ui.saveButton.button('reset');
                    app.modalRegion.close();
                }
            });

            }
        });
    });