var googleMapsInfo = {
  apiKey: 'AIzaSyCTYZoDbk3_Vc5t8uBKRMGR6UhjkjKgpWY',
  callback: 'initMap',
  coordSCA: { lat: 39.056272, lng: -9.006574 },
  coordTitle: 'Sporting Clube de Alenquer'
};

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
};

function loadGoogleAPI(apiKey, callback) {
  var head = document.getElementsByTagName('head')
    .item(0);
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' +
    apiKey + '&callback=' + callback);
  head.appendChild(script);
};

function isMessageValid(name, email, subject, message) {
  return name.val() == "" || email.val() == "" || subject.val() == "" ||
    message.val() == "";
};

function sendEmail(address, message) {
  $.ajax({
    method: 'POST',
    url: 'https://formspree.io/' + address,
    data: message,
    datatype: 'json'
  });
};

function showSubmitAlert(successful) {
  if (successful)
    $('.submit-success').fadeToggle(400);
  else
    $('.submit-fail').fadeToggle(400);
};

$(document)
  .ready(function() {
    loadGoogleAPI(googleMapsInfo.apiKey, googleMapsInfo.callback);

    $('#contact-form').submit(function(e) {
      var name = $('#contact-name');
      var email = $('#contact-email');
      var subject = $('#contact-subject');
      var message = $('#contact-message');
      e.preventDefault();
      if (isMessageValid(name, email, subject, message)) {
        sendEmail('ricardocoelho22@gmail.com', $('#contact-form').serialize());
        $(this).get(0).reset();
        // showSubmitAlert(true);
      } else {
        // showSubmitAlert(false);
      }
    });
});
