define([
    'underscore',
    'backbone',
    'marionette',
    'bootstrap',
    'core/router',
    'core/connection',
    'models/preset',
    'models/field',
    'collections/presets',
    'collections/fields',
    'views/headerView',
    'settings',
    'regions/modal'
],

function (_, Backbone, Marionette, $, Router, connection, Preset, Field, Presets, Fields, HeaderView, settings, modal) {

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
        }
    });


    App.addInitializer(function () {
        //Backbone.original_sync = Backbone.sync;
        var oauth = connection.oauth;
        Backbone.sync = function (method, model, options) {
            var methods = {
                'read': 'GET',
                'create': 'POST',
                'update': 'PUT',
                'delete': 'DELETE'
            };
            var xhrOptions = {
                'method': methods[method],
                'path': options.url || model.url(),
                'options': {header: {'Content-Type': 'text/xml'}},
                'content': JSON.stringify(options.attrs || model.toJSON(options))
            };
            oauth.xhr(xhrOptions, function (err, details) {
                options.success(JSON.parse(details));
            });
        };
    });

    App.addInitializer(function () {

        App.collections.presets = new Presets([]);
        App.collections.presets.fetch({
            'success': function (response) {
                App.collections.fields = new Fields([]);
                App.collections.fields.fetch({
                    'success': function (response) {
                        Backbone.history.start({ pushState: false, root: App.root });
                    }
                });
            }
        });
    });

    // Return the instantiated app (there should only be one)
    return App;

});
