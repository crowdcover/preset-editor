define([
    'marionette',
    'core/controller'
],

function (Marionette, Controller) {

    return Marionette.AppRouter.extend({

    // Format is "route": "methodName" where the router's controller
    // must have the method methodName
        appRoutes: {

            // Search, add and import buttons
            '': 'index'

            // Add new Preset
            // '/add': 'addPreset',

            // Edit Preset
            // '/edit/:name': 'editPreset'

        },

        controller: new Controller()

    });

});
