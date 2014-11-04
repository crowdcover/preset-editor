define([
    'backbone',
    'marionette',
    'underscore',
    'text!templates/searchView._',
    'app',
    'typeahead',
    'core/connection'
],

    function (Backbone, Marionette, _, searchViewTemplate, app, typeahead, connection) {

        return Backbone.Marionette.ItemView.extend({

            template: _.template(searchViewTemplate),

            events: {
                'click #add': 'addPreset',
                'click .deletePreset': 'deletePreset'
            },

            initialize: function () {
                this.confirmMessage = 'Are you sure? This cannot be undone.';
            },

            templateHelpers: function () {
                var presets = app.collections.presets;
                return {
                    'presets': presets
                };
            },

            ui: {
                'searchPreset': '#searchPreset'
            },

            onRender: function () {
                
                // Make jQuery contains selector case insensitive.
                jQuery.expr[':'].contains = function (a, i, m) {
                    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
                };

                var oldSearchValue = '';
                this.ui.searchPreset.keyup(function (event) {
                    var query = this.value;
                    if (query !== '') {
                        if (oldSearchValue !== query) {
                            oldSearchValue = query;
                        }
                        $('tr').addClass('hide');
                        $('tr:contains("' + query + '")').toggleClass('hide');
                    }
                    else {
                        $('tr').removeClass('hide');
                    }
                });
            },
            onClose: function () {
                // clear stuff like typeahead.
            },

            addPreset: function () {
                // connection.oauth.xhr({
                //     method: 'GET',
                //     path: '/api/0.6/user/details'
                // });

                Backbone.history.navigate('add', {trigger: true});
            },

            getPreset: function (target) {
                var $row = $(target).parents('tr');
                var presetID = $row.data('presetid');
                return app.collections.presets.findWhere({'id': String(presetID)});
            },

            deletePreset: function (event) {
                if (confirm(this.confirmMessage)) {
                    var target = event.target;
                    var presetModel = this.getPreset(target);
                    presetModel.destroy({success: function (model, response) {
                            $(target).parents('tr').addClass('hide');
                        }});
                }
            }
        });
});
