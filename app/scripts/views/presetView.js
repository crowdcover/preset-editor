define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/presetTemplate._',
    'app',
    'models/field',
    'models/tag',
    'views/fieldView',
    'views/rawTagView',
    'core/connection',
    'settings'
],

    function (Backbone, Marionette, _, addPresetTemplate, app, Field, Tag, FieldView, RawTagView, connection, settings) {

        return Backbone.Marionette.Layout.extend({

            template: _.template(addPresetTemplate),

            regions: {
                fields: '#fields'
            },

            events: {
                'change #tagSelect': 'tagSelected',
                'click .editField': 'editField',
                'click .editTag': 'editTag',
                'click .removeTag': 'removeTag',
                'click .removeField': 'removeField',
                'click .addTag': 'addTag',
                'click .savePreset': 'savePreset',
                'blur .presetName': 'setName'
            },

            ui: {
                'tagSelect': '#tagSelect',
                'presetName': '.presetName',
                'addTagPanel': '.addTagPanel',
                'addTagButton': '.addTag',
                'saveButton': '.savePreset'
            },

            initialize: function () {
                this.listenTo(app.vent, 'authDone', this.authDone);
                this.listenTo(this.model, 'change', this.render);
                this.confirmMessage = 'Are you sure? This cannot be undone.';
                this.savePending = false;
            },

            templateHelpers: function () {
                var fields = this.model.get('fields').map(function (fieldID) {
                    return app.collections.fields.findWhere({'name': String(fieldID)});
                });
                return {
                    'settings': settings,
                    'fieldModels': fields
                };
            },

            tagSelected: function () {
                var value = this.ui.tagSelect.val();

                if (value === '') {
                    return;
                }
                
                // Create a model based on the type of field.
                var newFieldModel = new Field({type: value});

                // Make this view listen to the model.
                this.listenTo(newFieldModel, 'all', this.doSomething);

                // Create a view
                var newFieldView = new FieldView({
                    model: newFieldModel,
                    presetModel: this.model,
                });

                app.modalRegion.show(newFieldView);
            },

            onRender: function () {
                var hasTag = _.isEmpty(this.model.get('tags'));
                if (settings.singleTag === true) {
                    if (hasTag === false) {
                        // console.log(haveTags);
                        this.ui.addTagPanel.addClass('hide');
                    }
                }
            },

            getTag: function (target) {
                var $row = $(target).parents('tr');
                var tagKey = $row.data('key');
                var tagValue = $row.data('value');
                return new Tag({'key': tagKey, 'value': tagValue});
            },

            getField: function (target) {
                var $row = $(target).parents('tr');
                var fieldName = $row.data('fieldname');
                return app.collections.fields.findWhere({'name': String(fieldName)});
            },
            
            editField: function (event) {
                var fieldModel = this.getField(event.target);
                var fieldView = new FieldView({
                    model: fieldModel,
                    presetModel: this.model,
                });
                app.modalRegion.show(fieldView);
            },

            editTag: function (event) {
                var tagModel = this.getTag(event.target);
                var rawTagView = new RawTagView({
                    model: tagModel,
                    presetModel: this.model
                });
                app.modalRegion.show(rawTagView);
            },

            removeTag: function (event) {
                if (confirm(this.confirmMessage)) {
                    var tagModel = this.getTag(event.target);
                    this.model.removeTag(tagModel);
                }
            },

            removeField: function (event) {
                if (confirm(this.confirmMessage)) {
                    var fieldModel = this.getField(event.target);
                    this.model.removeField(fieldModel);
                }
            },

            addTag: function () {
                // Create a new raw tag model.
                var newRawTagModel = new Tag();

                // Create a new raw tag view.
                // var newRawTagView = new RawTagView({model: this.model});
                var newRawTagView = new RawTagView({
                    model: newRawTagModel,
                    presetModel: this.model
                });

                app.modalRegion.show(newRawTagView);
            },

            setName: function () {
                this.model.set({'name': this.ui.presetName.val()});
            },

            authDone: function () {
                console.log('authDONE!');
                if (this.savePending && connection.oauth.authenticated()) {
                    this.savePreset();
                }
            },

            authenticate: function () {
                    connection.oauth.authenticate(function () {
                        app.vent.trigger('authDone');
                    });
            },

            savePreset: function () {
                var that = this;
                this.ui.saveButton.button('loading');
                if (connection.oauth.authenticated()) {
                    this.model.save({}, {success: function (model, response, options) {
                        model.set({'id': String(response.id)});
                        app.collections.presets.set(model, {remove: false});
                        that.ui.saveButton.button('reset');
                    }});
                }
                else {
                    this.savePending = true;
                    this.authenticate();
                }
            },

            doSomething: function (e) {
                console.log(e);
            }

    });
});
