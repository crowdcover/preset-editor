define([
    'backbone',
    'settings',
    'core/connection'
],

    function (Backbone, settings, connection) {
        var Preset = Backbone.Model.extend({
            defaults: {
                geometry: ['point', 'line', 'area'],
                name: '',
                tags: {},
                fields: [],
            },
            urlRoot: '/api/0.6/presets',
            addTag: function (tag, previous) {
                var existingTags = this.get('tags');
                var key = tag.get('key');

                if (previous.hasOwnProperty('key')) {
                    existingTags = _.omit(existingTags, previous.key);
                }
                existingTags[key] = tag.get('value');

                this.set('tags', existingTags);

                // Fire the change on the model so that view can pick up.
                this.trigger('change');
            },

            addField: function (field, previous) {
                var existingFields = this.get('fields');
                var name = field.get('name');
                
                if (previous.hasOwnProperty('name')) {
                    existingFields = _.without(existingFields, previous.name);
                }
                existingFields.push(name);
                this.set('fields', existingFields);
                // Fire the change on the model so that view can pick up.
                this.trigger('change');
            },

            removeTag: function (tag) {
                var existingTags = this.get('tags');
                existingTags = _.omit(existingTags, tag.get('key'));
                this.set('tags', existingTags);
            },

            removeField: function (field) {
                var existingFields = this.get('fields');
                existingFields = _.without(existingFields, field.get('name'));
                this.set('fields', existingFields);
            }
        });

        return Preset;
    });
