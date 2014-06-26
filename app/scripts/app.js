define([
    'underscore',
    'backbone',
    'marionette',
    'bootstrap',
    'core/router',
    'core/connection',
    'models/preset',
    'collections/presets',
    'collections/fields',
    'views/headerView',
    'settings',
    'regions/modal'
],

function (_, Backbone, Marionette, $, Router, connection, Preset, Presets, Fields, HeaderView, settings, modal) {

    var App = new Backbone.Marionette.Application();
    App.collections = {};
    App.views = {};

    // An init function for your main application object
    App.addInitializer(function () {
        this.router = new Router();
        this.root = '/';
        this.addRegions({
            mainRegion: '#content',
            modalRegion: modal
        });
        this.views.headerView = new HeaderView({});

        if (connection.oauth.authenticated() === true) {
            connection.userDetails();
        };
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

            // FIXME: get the fields from API and populate it here.
            App.collections.fields = new Fields([]);

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
