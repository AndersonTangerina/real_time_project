//---------------------------------------------------------------
// Pusher
//---------------------------------------------------------------
var pusher = new Pusher('c7bc422dd5eda7e850d1');
var channel = pusher.subscribe('real_time_channel');
channel.bind('real_time_event', function(data) {
  alert(data.message);
});


// ----------------------------------------------------------------
// Enable Google Maps
// ----------------------------------------------------------------
function initialize() {
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(-8.050867, -34.979186),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var flightPlanCoordinates = [
    new google.maps.LatLng(33.811010191787, -117.92008435365),
    new google.maps.LatLng(-8.061496, -34.871887),
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);



