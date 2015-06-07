//---------------------------------------------------------------
// Pusher
//---------------------------------------------------------------
var pusher = new Pusher('c7bc422dd5eda7e850d1');
var channel = pusher.subscribe('real_time_channel');
channel.bind('real_time_event', function(data) {
  alert(data.message);
});

//----------------------------------------------------------------
// Facebook App
//----------------------------------------------------------------
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1603731856535966',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));