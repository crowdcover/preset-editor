define([
  'backbone'
  ],

  function (backbone) {
    var Preset = Backbone.Model.extend({
      defaults: {
        geometry: ["point", "line", "area"]
      },
      name: '',
      geometry: [],
      tags: {}

    })

    return Preset;
  });