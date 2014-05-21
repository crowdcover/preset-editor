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

      var presetsCollection = new Presets();
      
        // Ajax for Presets.
        var fetchPresets = $.get('http://localhost:3000/api/0.6/presets.json');
        fetchPresets.done(function(data) {
          loadData(data);
          console.log(presetsCollection);
        });

        fetchPresets.fail(function() {
            // Failure.
          });

        var loadData = function loadData(data) {
          _.each(data, function (item) {
            var preset = new Preset(item);
            presetsCollection.push(preset);
          });

        };

        // Ajax for Fields.
        // Use jQuery.when()

        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start({ pushState: true, root: App.root });

      });

    // Return the instantiated app (there should only be one)
    return App;

  });
