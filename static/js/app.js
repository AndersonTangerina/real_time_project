angular.module('CiulApp', ['facebook'])

  .config([
    'FacebookProvider',
    function(FacebookProvider) {
     var myAppId = '1603731856535966';

     // You can set appId with setApp method
     // FacebookProvider.setAppId('myAppId');

     /**
      * After setting appId you need to initialize the module.
      * You can pass the appId on the init method as a shortcut too.
      */
     FacebookProvider.init(myAppId);

    }
  ])

  .controller('MainController', [
    '$scope',
    '$timeout',
    'Facebook',
    function($scope, $timeout, Facebook) {

      // Define tagged_places empty data
      $scope.locations = [];

      // Define user empty data
      $scope.user = {};

      // Defining user logged status
      $scope.logged = false;

      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;

      /**
       * Connect and Receiver to Pusher Notifications.
       *
      */
      $scope.pusher = function(){
        var pusher = new Pusher('c7bc422dd5eda7e850d1');
        var channel = pusher.subscribe('real_time_channel');
        channel.bind('real_time_event', function(response) {
          if ($scope.logged == true){
            idUserPusher = response.message[0].id;
            $scope.userUpdateLocation(idUserPusher);
          }
        });
      };

      // Call Pusher Connection
      $scope.pusher();

      /**
       * Check if user coming from pusher are logged
       * and update your locations.
      */
      $scope.userUpdateLocation = function(idUserPusher){
        if (idUserPusher == $scope.user.id) {
            // call feedLocation WHATEVER changes on feed
            $scope.feedLocation();
        }
      };

      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal)
            $scope.facebookReady = true;
        }
      );

      var userIsConnected = false;

      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          $scope.me();
          $scope.feedLocation();
          $scope.logged = true;
          userIsConnected = true;

        }
      });

      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        if(!userIsConnected) {
          $scope.login();
        }
      };

      /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.getCompleteInfo();
          }
        }, {
          scope:'public_profile,email,user_likes, user_posts,user_tagged_places,user_status',
          return_scopes: true
          });
       };

       /**
        * me
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.user = response;
              console.log($scope.user);
            });

          });
        };

       /**
        * Get feed with location
        */
        $scope.feedLocation = function() {
          Facebook.api('me/feed?with=location&limit=10', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.locations = response.data; //List of locations
              console.log($scope.locations);
            });

          });
        };

      /**
      * Get User and Tagged information.
      */
      $scope.getCompleteInfo = function(){
        $scope.me();
        $scope.feedLocation();
      };

      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.locations = [];
            $scope.logged = false;
            userIsConnected = false;
          });
        });
      }

      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;

            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }

      });
    }
  ])

  /**
   * Just for debugging purposes.
   * Shows objects in a pretty way
   */
  .directive('debug', function() {
    return {
      restrict:	'E',
      scope: {
      expression: '=val'
    },
    template:	'<pre>{{debug(expression)}}</pre>',
    link:	function(scope) {
      // pretty-prints
      scope.debug = function(exp) {
      return angular.toJson(exp, true);
      };
    }
    }
	});

