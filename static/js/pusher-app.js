angular.module('gemStore',[]).controller('StoreController', ['$scope',
function($scope) {
      var pusher = new Pusher('c7bc422dd5eda7e850d1');
      var channel = pusher.subscribe('real_time_channel');
      channel.bind('real_time_event', function(data) {
      alert(data.message);
      });
}]);