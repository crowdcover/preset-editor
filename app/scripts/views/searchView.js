define([
    'backbone',
    'marionette',
    'text!templates/searchView._',
    'app',
    'typeahead'
    ],

    function (Backbone, Marionette, searchViewTemplate, app, typeahead) {

        return Backbone.Marionette.ItemView.extend({

            template: _.template(searchViewTemplate),

            templateHelpers: function () {
                return this.model.get('geometry');
            },

            events: {
                'click #add': 'addPreset'
            },

            initialize: function () {
            },

            ui: {
                'searchPreset': '#searchPreset'
            },

            onRender: function () {

                // Instantiate Bloodhound.
                var preset = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: $.map(app.collections.presets.models, function(preset) { return { value: preset.attributes.name }; })
                });

                preset.initialize();

                this.ui.searchPreset.typeahead({
                    hint: 'true',
                    minLenght: 1
                },
                {
                    name: 'preset',
                    displayKey: 'value',
                    source: preset.ttAdapter()
                });
            },

            onClose: function () {
                // clear stuff like typeahead.
            },

            addPreset: function () {
                console.log('adding a preset');
                console.log(app.collections.presets);
            }

        });
});
