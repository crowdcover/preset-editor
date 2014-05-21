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
        	require(['views/searchView', 'models/preset', 'app'], function (SearchView, Preset, app) {
                var preset = new Preset();
        		var view = new SearchView({model: preset});
        		app.mainRegion.show(view);
        	});
        }

    });
});
