var googleMapsInfo = {
  apiKey: 'AIzaSyCTYZoDbk3_Vc5t8uBKRMGR6UhjkjKgpWY',
  callback: 'initMap',
  coordSCA: { lat: 39.056272, lng: -9.006574 },
  coordTitle: 'Sporting Clube de Alenquer'
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: googleMapsInfo.coordSCA
  });
  var marker = new google.maps.Marker({
    position: googleMapsInfo.coordSCA,
    map: map,
    title: googleMapsInfo.title
  });
}

function loadGoogleAPI() {
  var head = document.getElementsByTagName('head')
    .item(0);
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' +
    googleMapsInfo.apiKey + '&callback=' + googleMapsInfo.callback);
  head.appendChild(script);
}

$(document)
  .ready(function() {
    loadGoogleAPI();

    $('#contact-form').submit(function(e) {
      var name = $('#contact-name');
      var email = $('#contact-email');
      var subject = $('#contact-subject');
      var message = $('#contact-message');

      if (name.val() == "" || email.val() == "" || subject.val() == "" ||
        message.val() == "") {
        // $('.submit-fail')
        //   .fadeToggle(400);
        return false;
      } else {
        $.ajax({
          method: 'POST',
          url: 'https://formspree.io/ricardocoelho22@gmail.com',
          data: $('#contact-form').serialize(),
          datatype: 'json'
        });
        e.preventDefault();
        $(this).get(0).reset();
        // $('.submit-success').fadeToggle(400);
      }
    });
  });
