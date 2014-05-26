define(
    function () {
        var devAPI = 'http://dev.osm.moabi.org/api/0.6/';
        var prodAPI = 'http://osm.moabi.org/api/0.6/';
        var localAPI = 'http://localhost:3000/api/0.6/';
        var environ = window.appGlobalConfig.environ;
        if (environ === 'prod') {
            var apiBase = prodAPI;
        } else  if (environ === 'dev') {
            var apiBase = devAPI;
        }
        else {
            apiBase = localAPI;
        }
        return {
            'api_base': apiBase,
            'oauth_consumer': '',
            'oauth_secret': ''
        };
});
