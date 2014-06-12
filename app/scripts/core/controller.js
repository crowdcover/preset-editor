define([
    'backbone',
    'require',
    'marionette'
],

function (Backbone, require, Marionette) {

    return Marionette.Controller.extend({

        initialize: function () {},

        onClose: function () {},

        index: function () {
            require(['views/searchView', 'app'],
                function (SearchView, app) {
                    var view = new SearchView();
                    app.mainRegion.show(view);
                });
        },

        addPreset: function () {
            require(['views/presetView', 'models/preset', 'app'],
                function (PresetView, Preset, app) {
                    var preset = new Preset();
                    var view = new PresetView({model: preset});
                    app.mainRegion.show(view);
                });
        },

        editPreset: function (id) {
            require(['views/presetView', 'models/preset', 'app'],
                function (PresetView, Preset, app) {
                    var selectedPreset = app.collections.presets.findWhere({'id': id});
                    var view = new PresetView({model: selectedPreset});
                    app.mainRegion.show(view);
                });
        }
    });
});