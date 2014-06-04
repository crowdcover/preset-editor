define([
    'backbone',
    'underscore',
    'osmauth',
    'settings'
],

    function (Backbone, _, osmAuth, settings) {
        var auth = osmAuth({

            // Get the root URL from apiBase.
            // url: settings.apiBase.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[0],
            url: settings.authURL,
            land: 'index.html',
            oauth_secret: settings.oauthSecret,
            oauth_consumer_key: settings.oauthConsumer,
            auto: true

        });
        return auth;
    });