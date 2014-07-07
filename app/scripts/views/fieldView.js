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
                'click #save': 'save',
                'click .optionsClose': 'removeOption'
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
                var $optionsRow = $('<div>').addClass('row')
                    .appendTo(this.ui.options);

                var $optionColumn = $('<div>').addClass('col-md-10')
                    .appendTo($optionsRow);

                var $input = $('<input />').addClass('form-control')
                    .addClass('fieldOption')
                    .attr('placeholder', 'Option')
                    .val(name)
                    .appendTo($optionColumn);

                var $optionsClose = $('<div>').addClass('col-md-1').appendTo($optionsRow)

                var $close = $('<button />').addClass('optionsClose close')
                    .attr('type', 'button')
                    .attr('aria-hidden', 'true')
                    .html('&times;')
                    .appendTo($optionsClose);
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

                this.ui.saveButton.button('loading');
                var that = this;

                this.model.save({}, {success: function (model, response, options) {
                    that.model.set('name', String(response.id));
                    app.collections.fields.set(that.model, {'remove': false});
                    that.presetModel.addField(that.model, previousAttributes);
                    that.ui.saveButton.button('reset');
                    app.modalRegion.close();
                }
                });

            },
            removeOption: function (event) {
                $(event.target).parent().parent().remove();
            }
        });
    });