define([
    'backbone',
    'underscore',
    'osmauth',
    'settings'
],

    function (Backbone, _, osmAuth, settings) {
        var osmauth = osmAuth({

            // Get the root URL from apiBase.
            // url: settings.apiBase.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[0],
            url: settings.authURL,
            land: 'index.html',
            oauth_secret: settings.oauthSecret,
            oauth_consumer_key: settings.oauthConsumer,
            auto: true
        });
        // return auth;
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

                    // console.log(user);
                    // return user;
                    var app = require('app');
                    app.vent.trigger('gotUserDetails', user);
                }
                osmauth.xhr({ method: 'GET', path: '/api/0.6/user/details' }, done);
            }
        };
        return auth;
    });