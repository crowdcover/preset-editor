define([
  'backbone',
  'models/preset'
  ],

  function(Backbone, Preset) {
    var Presets = Backbone.Collection.extend({
      model: Preset
    });

    return Presets;
  });