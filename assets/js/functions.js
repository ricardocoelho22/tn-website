function initMap() {
  var coordSCA = { lat: 39.056272, lng: -9.006574 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: coordSCA
  });
  var marker = new google.maps.Marker({
    position: coordSCA,
    map: map,
    title: "Sporting Clube de Alenquer"
  });
}

$(document)
  .ready(function() {

  });
