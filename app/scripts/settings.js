define([
    'underscore',
    'local_settings'
],

    function (_, localSettings) {
        var hostname;
        var devHostname = 'http://dev.osm.moabi.org';
        var prodHostname = 'http://osm.moabi.org';
        var localHostname = 'http://localhost:3000';
        var apiURL = localHostname + '/api/0.6/';
        var environ = window.appGlobalConfig.environ;
        if (environ === 'prod') {
            hostname = prodHostname;
        } else  if (environ === 'dev') {
            hostname = devHostname;
        }
        else {
            hostname = localHostname;
        }
        var apiURL = hostname + '/api/0.6/';
        return _.extend({
            'hostname': hostname,
            'apiURL': apiURL,
            'oauthConsumer': 'H2QjYl5yoTz4kOcFxnoGLVbS0h5zJfrlA3IA6bcY',
            'oauthSecret': 'dCmGLi7sje8en1b9UrS6w634qH7qLMKgOAYrn9uX',
            'singleTag': false,
            'tagLabel': 'Tag',
            'fieldLabel': 'Field'
        }, localSettings);
    }
);
