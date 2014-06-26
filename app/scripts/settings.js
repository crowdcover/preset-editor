define([
    'underscore',
    'local_settings'
],

    function (_, localSettings) {
        var devAPI = 'http://dev.osm.moabi.org/api/0.6/';
        var prodAPI = 'http://osm.moabi.org/api/0.6/';
        var localAPI = 'http://localhost:3000/api/0.6/';
        var authURL = 'http://dev.osm.moabi.org';
        var environ = window.appGlobalConfig.environ;
        if (environ === 'prod') {
            var apiBase = prodAPI;
        } else  if (environ === 'dev') {
            var apiBase = devAPI;
        }
        else {
            apiBase = localAPI;
        }
        return _.extend({
            'apiBase': apiBase,
            'oauthConsumer': 'H2QjYl5yoTz4kOcFxnoGLVbS0h5zJfrlA3IA6bcY',
            'oauthSecret': 'dCmGLi7sje8en1b9UrS6w634qH7qLMKgOAYrn9uX',
            'authURL': authURL,
            'singleTag': false,
            'tagLabel': 'Tag',
            'fieldLabel': 'Field'
        }, localSettings);
});
