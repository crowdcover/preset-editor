define([
    'backbone',
    'marionette',
    'underscore',
    'core/connection'
],
    
    function (Backbone, Marionette, _, connection) {
        return Marionette.ItemView.extend({

            el: '#nav',

            initialize: function () {
                var app = require('app');
                this.listenTo(app.vent, 'authDone', this.authDone);
                this.listenTo(app.vent, 'gotUserDetails', this.setUser);
                this.listenTo(app.vent, 'loggedOut', this.removeUser);
                this.bindUIElements();
            },

            ui: {
                'login': '#login',
                'logout': '#logout',
                'usernameLi': '#username',
                'usernameLink': '#username a'
            },

            events: {
                'click #logout': 'logoutUser',
                'click #login': 'loginUser'
            },

            onRender: function () {

            },

            authDone: function () {

                // WHY ON EARTH IS JAVASCRIPT LIKE THIS?!
                setTimeout(function() {
                    if (connection.oauth.authenticated()) {
                        console.log('authenticated');
                        connection.userDetails();
                    }
                }, 1);
            },

            setUser: function (user) {
                this.ui.login.addClass('hide');
                this.ui.logout.removeClass('hide');
                this.ui.usernameLi.removeClass('hide');
                this.ui.usernameLink.text(user.display_name);
            },

            logoutUser: function () {
                connection.oauth.logout();
                var app = require('app');
                app.vent.trigger('loggedOut');
                return false;
            },

            removeUser: function () {
                this.ui.login.removeClass('hide');
                this.ui.logout.addClass('hide');
                this.ui.usernameLi.addClass('hide');
                this.ui.usernameLink.text('');
            },

            loginUser: function () {
                var app = require('app');
                connection.oauth.authenticate(function () {
                    app.vent.trigger('authDone');
                    connection.userDetails();
                });
                return false;
            }
        })
    });