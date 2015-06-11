angular.module('realTimeServices', [])

.factory('faceFactory', ['Facebook', function(Facebook) {

    // Returns Facebook Factory from angular-facebook
    return Facebook;

}])

.factory('logicFactory', [function() {

    factory = {};

    factory.getLocations = function(feedsWithLocation) {
        var locations = [];
        var feeds = feedsWithLocation;
        for (i = 0; i < feeds.length; i++) {
            latitude = feeds[i].place.location.latitude;
            longitude = feeds[i].place.location.longitude;
            cords = [latitude, longitude];
            locations.push(cords);
        }
        return locations;
    };

    factory.checkUser = function(idPusherUser, idScopeUser) {
        if (idPusherUser == idScopeUser) {
            return true
        } else {
            return false
        }
    };

    factory.userUpdateFeed = function(idPusherUser, idScopeUser, updateFunc) {
        console.log(idPusherUser);
        console.log(idScopeUser);
        if (factory.checkUser(idPusherUser, idScopeUser)) {
            updateFunc();
        }
    };

    /* IntentLogin */
    factory.intentLogin = function(logged, loginFunc) {
        if (!logged) {
            loginFunc();
        }
    };

    factory.updateFaceStatus = function(response, updateFunc, paramsFunc) {
        if (response.status == 'connected') {
            updateFunc(paramsFunc);
            return true;
        } else {
            return false;
        }
    };

    factory.getCompleteInfo = function(funcList) {
        for (i = 0; i < funcList.length; i++) {
            funcList[i]()
        }
    };

    return factory;

}]);