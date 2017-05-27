(function (map, $, undefined) {
  var googleMapsInfo = {
    apiKey: SITE_DATA_SETTINGS.googleMapsAPIKey,
    coordSCA: { 
      lat: SITE_DATA_SETTINGS.coordinates.latitude, 
      lng: SITE_DATA_SETTINGS.coordinates.longitude
    },
    title: 'Sporting Clube de Alenquer',
    zoom: 17,
    scrollwheel: false
  };

  map.init = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: googleMapsInfo.zoom,
      center: googleMapsInfo.coordSCA,
      scrollwheel: googleMapsInfo.scrollwheel
    });
    var marker = new google.maps.Marker({
      position: googleMapsInfo.coordSCA,
      map: map,
      title: googleMapsInfo.title,
      icon: {
        url: SITE_DATA_SETTINGS.logos[1].src,
        scaledSize: new google.maps.Size(38, 50)
      }
    });
  };

  map.load = function() {
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' +
      googleMapsInfo.apiKey + '&callback=map.init');
    head.appendChild(script);
  };
}(window.map = window.map || {}, jQuery));