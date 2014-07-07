define([
    'backbone',
    'underscore',
    'osmauth',
    'settings'
],

    function (Backbone, _, osmAuth, settings) {
        var osmauth = osmAuth({
            url: settings.hostname,
            land: 'land.html',
            oauth_secret: settings.oauthSecret,
            oauth_consumer_key: settings.oauthConsumer,
            auto: true,
            done: function () {
                var app = require('app');
                app.vent.trigger('authDone');
            }
        });

        var auth = {
            'oauth': osmauth,
            userDetails: function () {
                function done(err, details) {
                    var u = details.getElementsByTagName('user')[0],
                    img = u.getElementsByTagName('img'),
                    image_url = '';

                    if (img && img[0] && img[0].getAttribute('href')) {
                        image_url = img[0].getAttribute('href');
                    }

                    var user = {
                        display_name: u.attributes.display_name.nodeValue,
                        image_url: image_url,
                        id: u.attributes.id.nodeValue
                    };

                    var app = require('app');
                    app.vent.trigger('gotUserDetails', user);
                }
                osmauth.xhr({ method: 'GET', path: '/api/0.6/user/details' }, done);
            }
        };
        return auth;
    });