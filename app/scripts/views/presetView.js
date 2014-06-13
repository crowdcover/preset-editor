define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/presetTemplate._',
    'app',
    'models/field',
    'views/fieldView',
    'views/rawTagView'
],

function (Backbone, Marionette, _, addPresetTemplate, app, Field, FieldView, RawTagView) {

    return Backbone.Marionette.Layout.extend({

        template: _.template(addPresetTemplate),

        regions: {
            fields: '#fields'
        },

        events: {
            'change #tagSelect': 'tagSelected',
            'click .editField': 'editField'
        },

        ui: {
            'tagSelect': '#tagSelect'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            console.log('add preset view');
        },

        tagSelected: function () {
            var value = this.ui.tagSelect.val(),
                fieldViewType;

            if (value === 'tag') {

                // Create a new raw tag view with the existing preset model.
                var newRawTagView = new RawTagView({model: this.model});
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
                // fieldViewType: fieldViewType
            });

            // var fieldView = new FieldView({model: newField});
            app.modalRegion.show(newFieldView);

            // console.log(newField);
        },

        onRender: function() {
            console.log("re-rendered", this.model);
        },
        editField: function (event) {
            var fieldName = $(event.target).data('fieldname');
            var fieldModel = app.collections.fields.findWhere({'name': fieldName});
            console.log(fieldModel);
            var fieldView = new FieldView({
                model: fieldModel, 
                presetModel: this.model,
            });
            app.modalRegion.show(fieldView);
        },

        doSomething: function () {
            // console.log('Something changed!');
        }

    });
});
