define([
  "underscore",
  "backbone",
  "marionette",
  "bootstrap",
  "core/router",
  "models/preset",
  "collections/presets"
  ],

  function (_, Backbone, Marionette, $, Router, Preset, Presets) {

    var App = new Backbone.Marionette.Application();
    App.collections = {};

    // An init function for your main application object
    App.addInitializer(function () {
      this.router = new Router()
      this.root = '/';
      this.addRegions({
        mainRegion: '#content'
      });
    });

    // Add as many of these as you like
    App.addInitializer(function () {

        // Ajax for Presets.
        var fetchPresets = $.get('http://localhost:3000/api/0.6/presets.json');
        fetchPresets.done(function(data) {
          var presetsCollection = new Presets(_.toArray(data));
          App.collections.presets = presetsCollection;

          // Trigger the initial route and enable HTML5 History API support
          Backbone.history.start({ pushState: true, root: App.root });
        });

        fetchPresets.fail(function() {
            // Failure.
          });
        // Ajax for Fields.
        // Use jQuery.when()


      });

    // Return the instantiated app (there should only be one)
    return App;

  }
  );
