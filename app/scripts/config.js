requirejs.config({
    deps: ['main'],
    paths: {
        backbone: '../bower_components/backbone/backbone',
        jquery: '../bower_components/jquery/jquery',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        underscore: '../bower_components/lodash/lodash',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        text: '../bower_components/requirejs-text/text',
        typeahead: '../bower_components/typeahead.js/dist/typeahead.bundle',
        osmauth: '../bower_components/osmauth/osmauth.min',
        'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        // templates: 'templates/compiled',
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$'
        },
        typeahead: {
            deps: ['bootstrap'],
            exports: '$'
        },
        osmauth: {
            exports: 'osmauth'
        }
    }
});
