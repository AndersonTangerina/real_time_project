angular.module('realTimeControllers', [])

.controller('MainController', [
    '$scope',
    '$timeout',
    'faceFactory',
    'logicFactory',
    function($scope, $timeout, faceFactory, logicFactory) {

        // Define locations for Google Maps
        $scope.mapLocations = [
            [],
        ];

        // Define feeds with locations from facebook api call
        $scope.feedsWithLocation = [];

        // Define user empty data
        $scope.user = {};

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        // Encapsulates faceFactory and logicFactory
        var face = faceFactory;
        var logic = logicFactory;

        /* Connect and Receiver to Pusher Notifications. */
        $scope.pusher = function() {
            var pusher = new Pusher('c7bc422dd5eda7e850d1');
            var channel = pusher.subscribe('real_time_channel');
            channel.bind('real_time_event', function(response) {
                if ($scope.logged == true) {
                    idPusherUser = response.message[0].id;
                    idScopeUser = $scope.user.id;
                    // if user id equals user pusher id get feed location
                    logic.userUpdateFeed(idPusherUser, $scope.user.id, $scope.getFeedLocation);
                }
            });
        };

        // Call Pusher Connection
        $scope.pusher();

        /* Watch for Facebook to be ready */
        $scope.$watch(
            function() {
                return face.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        /* Get user infos */
        $scope.me = function() {
            face.api('/me', function(response) {
                $scope.$apply(function() {
                    $scope.user = response;
                });

            });
        };

        /* Get feed with location from facebook */
        $scope.getFeedLocation = function() {
            face.api('me/feed?with=location&limit=10', function(response) {
                $scope.$apply(function() {
                    $scope.feedsWithLocation = response.data;
                    $scope.mapLocations = logic.getLocations($scope.feedsWithLocation);
                });
            });
        };


        var listFuncInfo = [$scope.me, $scope.getFeedLocation];


        /* Call login status on refresh and update information */
        face.getLoginStatus(function(response) {
            $scope.logged = logic.updateFaceStatus(response, logic.getCompleteInfo, listFuncInfo);
            $scope.salutation = $scope.logged;
        });

        /* IntentLogin for index view */
        $scope.IntentLogin = logic.intentLogin

        /* Do login */
        $scope.login = function() {
            face.login(function(response) {
                $scope.logged = logic.updateFaceStatus(response, logic.getCompleteInfo, listFuncInfo);
                $scope.salutation = $scope.logged;
            }, {
                scope: 'public_profile,email,user_likes, user_posts,user_tagged_places,user_status',
                return_scopes: true
            });
        };

        /* Logout */
        $scope.logout = function() {
            face.logout(function() {
                $scope.$apply(function() {
                    $scope.user = {};
                    $scope.feedsWithLocation = [];
                    $scope.mapLocations = [
                        [],
                    ];
                    $scope.logged = false;
                    $scope.salutation = false;
                });
            });
        }

        /* Taking approach of Events */
        $scope.$on('faceFactory:statusChange', function(ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                });
            }
        });
    }
]);