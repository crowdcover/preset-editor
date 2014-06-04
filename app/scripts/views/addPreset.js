define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/addPreset._',
    'app',
    'models/field',
    'views/fieldView',
    'views/radioView',
    'views/rawTagView'
],

function (Backbone, Marionette, _, addPresetTemplate, app, Field, FieldView, RadioView, RawTagView) {

    return Backbone.Marionette.Layout.extend({

        template: _.template(addPresetTemplate),

        regions: {
            fields: '#fields'
        },

        events: {
            'change #tagSelect': 'tagSelected'
        },

        ui: {
            'tagSelect': '#tagSelect'
        },

        initialize: function () {
            console.log('add preset view');
        },

        tagSelected: function () {
            var value = this.ui.tagSelect.val();
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
            var newFieldView = new RadioView({model: newFieldModel, presetModel: this.model});

            // var fieldView = new FieldView({model: newField});
            app.modalRegion.show(newFieldView);

            // console.log(newField);
        },

        doSomething: function () {
            console.log('Something changed!');
        }

    });
});
