define([
    'underscore',
    'backbone',
    'marionette',
    'bootstrap',
    'core/router',
    'models/preset',
    'collections/presets',
    'settings',
    'regions/modal'
],

function (_, Backbone, Marionette, $, Router, Preset, Presets, settings, modal) {

    var App = new Backbone.Marionette.Application();
    App.collections = {};

    // An init function for your main application object
    App.addInitializer(function () {
        this.router = new Router();
        this.root = '/';
        this.addRegions({
            mainRegion: '#content',
            modalRegion: modal
        });
    });

    // Add as many of these as you like
    App.addInitializer(function () {

        // Ajax for Presets.
        var fetchPresetsUrl = settings.apiBase + 'presets.json';
        var fetchPresets = $.get(fetchPresetsUrl);
        fetchPresets.done(function (data) {

            // Fill up id into the object.
            var array = _.toArray(data);
            _(data).keys().forEach(function(o, i) {

                // Split the 'moabi/<id>' and get the id.
                array[i]['id'] = o.split('/')[1];
            });

            var presetsCollection = new Presets(array);
            App.collections.presets = presetsCollection;

            // Trigger the initial route and enable HTML5 History API support
            Backbone.history.start({ pushState: false, root: App.root });
        });

        fetchPresets.fail(function () {
            // Failure.
        });
        // Ajax for Fields.
        // Use jQuery.when()
    });

    // Return the instantiated app (there should only be one)
    return App;

});
