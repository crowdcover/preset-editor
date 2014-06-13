define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/presetTemplate._',
    'app',
    'models/field',
    'models/tag',
    'views/fieldView',
    'views/rawTagView'
],

    function (Backbone, Marionette, _, addPresetTemplate, app, Field, Tag, FieldView, RawTagView) {

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
                'click .removeField': 'removeField'
            },

            ui: {
                'tagSelect': '#tagSelect'
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.confirmMessage = 'Are you sure? This cannot be undone.';
            },

            tagSelected: function () {
                var value = this.ui.tagSelect.val(),
                fieldViewType;

                if (value === 'tag') {

                    // Create a new raw tag model.
                    var newRawTagModel = new Tag();

                    // Create a new raw tag view.
                    // var newRawTagView = new RawTagView({model: this.model});
                    var newRawTagView = new RawTagView({
                        model: newRawTagModel,
                        presetModel: this.model
                    });
                    app.modalRegion.show(newRawTagView);

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
                return app.collections.fields.findWhere({'name': fieldName});
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

            doSomething: function () {
                // console.log('Something changed!');
            }

    });
});
