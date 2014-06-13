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

            addField: function (field, previous) {
                var existingFields = this.get('fields');
                var name = field.get('name');
                
                if (previous.hasOwnProperty('name')) {
                    existingFields = _.without(existingFields, previous.name);
                }
                console.log("existing fields", existingFields);
                existingFields.push(name);
                console.log("existing fields are push", existingFields);
                this.set('fields', existingFields);                                  
            
                // Fire the change on the model so that view can pick up.
                //this.trigger('change');
            }
        });

        return Preset;
    });
