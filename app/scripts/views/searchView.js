define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/searchView._',
    'app',
    'typeahead',
    'core/connection'
],

    function (Backbone, Marionette, _, searchViewTemplate, app, typeahead, connection) {

        return Backbone.Marionette.ItemView.extend({

            template: _.template(searchViewTemplate),

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
                    local: $.map(app.collections.presets.models, function(preset) { return {value: preset.attributes.name}; })
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

                this.ui.searchPreset.on('typeahead:selected', function (event, datum) {
                    var selectedPreset = app.collections.presets.findWhere({'name': datum.value});
                    var editURL = 'edit/'+selectedPreset.get('id');
                    Backbone.history.navigate(editURL, {'trigger': true});
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
                // connection.oauth.xhr({
                //     method: 'GET',
                //     path: '/api/0.6/user/details'
                // });

                Backbone.history.navigate('add', {trigger: true});
            }
        });
});
