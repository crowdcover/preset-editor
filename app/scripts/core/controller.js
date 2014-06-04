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
            require(['views/addPreset', 'models/preset', 'app'],
                function (AddPresetView, Preset, app) {
                    var preset = new Preset();
                    var view = new AddPresetView({model: preset});
                    app.mainRegion.show(view);
                });
        }
    });
});