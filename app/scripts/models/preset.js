define([
    'backbone'
],

    function (Backbone) {
        var Preset = Backbone.Model.extend({
            defaults: {
                geometry: ['point', 'line', 'area'],
                name: '',
                tags: {},
                fields: []
            },

            // FIXME: All the following functions need validation 
            // and duplicate check.
            
            addTag: function (key, value) {
                var existingTags = this.get('tags');
                existingTags[key] = value;
                this.set('tags', existingTags);

                // Fire the change on the model so that view can pick up.
                this.trigger('change');
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
                
                // Fire the change on the model so that view can pick up.
                this.trigger('change');
            }
        });

        return Preset;
    });
