define([
    'backbone'
    ],

    function (Backbone) {
        var Preset = Backbone.Model.extend({
            defaults: {
                geometry: ['point', 'line', 'area'],
                name: '',
                tags: {}
            },

            // FIXME: All the following functions need validation 
            // and duplicate check.
            
            addTag: function (key, value) {
                var existingTags = this.get('tags');
                existingTags[key] = value;
                this.set('tags', existingTags);
            },

            addField: function (name) {
                var existingFields = this.get('fields');
                if (existingFields) {
                    existingFields.push(name);
                    this.set('fields', existingFields);
                }
                else {
                    this.set('fields', [name]);
                }
            }
        });

        return Preset;
    });
