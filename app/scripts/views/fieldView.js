define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/radioField._',
    'app',
    'typeahead',
    'core/connection'
],

    function (Backbone, Marionette, _, radioFieldTemplate, app) {
        
        return Marionette.ItemView.extend({

            getTemplate: function () {
                var type = this.model.get('type');
                
                // Switch Case for the type of template and return.
                return _.template(radioFieldTemplate);
            },
            initialize: function () {
            }
        })
    });