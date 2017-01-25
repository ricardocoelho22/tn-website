var googleMapsInfo = {
  apiKey: 'AIzaSyCTYZoDbk3_Vc5t8uBKRMGR6UhjkjKgpWY',
  callback: 'initMap',
  coordSCA: { lat: 39.056272, lng: -9.006574 },
  coordTitle: 'Sporting Clube de Alenquer'
};

var emailServiceInfo = {
  address: 'ricardocoelho22@gmail.com'
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
  return name.val() != "" && email.val() != "" && subject.val() != "" &&
    message.val() != "";
};

function sendEmail(address, message) {
  $.ajax({
    method: 'POST',
    url: 'https://formspree.io/' + address,
    data: message,
    datatype: 'json',
    complete: function(jqXHR) {
      if (jqXHR.readyState == 0 && jqXHR.status == 0) {
        $('#contact-form').get(0).reset();
        $('#sendSuccessModal').modal();
      } else {
        $('#sendFailModal').modal();
      }
    }
  });
};

function initializeGallerySection() {
  $('.img-container').on('click', function() {
    var galleryModal = $('#galleryModal');
    var imageElem = $(this).find('img')[0];
    var caption = $(this).find('.caption')[0].innerHTML;
    var modalImageElem = galleryModal.find('img')[0];
    var modalCaptionElem = galleryModal.find('.modal-caption')[0];
    modalImageElem.src = imageElem.src;
    modalImageElem.alt = imageElem.alt;
    modalCaptionElem.innerHTML = caption;
    galleryModal.modal();
  });
};

function initializeContactSection() {
  $('#contact-form').submit(function(event) {
    var name = $('#contact-name');
    var email = $('#contact-email');
    var subject = $('#contact-subject');
    var message = $('#contact-message');
    event.preventDefault();
    if (isMessageValid(name, email, subject, message)) {
      sendEmail(emailServiceInfo.address, $('#contact-form').serialize());
    } else {
      $('#message-invalid-alert').show();
    }
  });

  $('.alert-close').on('click', function() {
    $(this).parent().hide();
  });
};

$(document)
  .ready(function() {
    loadGoogleAPI(googleMapsInfo.apiKey, googleMapsInfo.callback);
    initializeGallerySection();
    initializeContactSection();
  });
