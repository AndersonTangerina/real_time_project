angular.module('realTimeApp', ['facebook', 'ngMap', 'realTimeServices', 'realTimeControllers', ])

.config([
    'FacebookProvider',
    function(FacebookProvider) {
        var myAppId = '1603731856535966';
        FacebookProvider.init(myAppId);
    }
]);