var googleMapsInfo = {
  apiKey: 'AIzaSyCTYZoDbk3_Vc5t8uBKRMGR6UhjkjKgpWY',
  callback: 'initMap',
  coordSCA: { lat: 39.056272, lng: -9.006574 },
  coordTitle: 'Sporting Clube de Alenquer'
};

var emailServiceInfo = {
  address: 'ricardocoelho22@gmail.com'
}

var galleryInfo = {
  currentModalImage: ''
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

function setLeftNav(modal, bool) {
  if (bool)
    modal.find('.nav-left').css('display', 'initial');
  else
    modal.find('.nav-left').css('display', 'none');
}

function setRightNav(modal, bool) {
  if (bool)
    modal.find('.nav-right').css('display', 'initial');
  else
    modal.find('.nav-right').css('display', 'none');
}

function setModalImage(galleryModal, imgContainer) {
  var imageElem = imgContainer.find('img')[0];
  var caption = imgContainer.find('.caption')[0].innerHTML;
  var modalImageElem = galleryModal.find('img')[0];
  var modalCaptionElem = galleryModal.find('.modal-caption')[0];
  modalImageElem.src = imageElem.src;
  modalImageElem.alt = imageElem.alt;
  modalCaptionElem.innerHTML = caption;
}

function initializeGallerySection() {
  $('.section-gallery .img-container').on('click', function() {
    var galleryModal = $('#galleryModal');
    setModalImage(galleryModal, $(this));
    setLeftNav(galleryModal, $(this).parent().prev().length !== 0);
    setRightNav(galleryModal, $(this).parent().next().length !== 0);
    galleryInfo.currentModalImage = $(this);
    galleryModal.modal();
  });

  $('.nav-left').on('click', function() {
    var previous = galleryInfo.currentModalImage.parent().prev();
    if (previous.length !== 0) {
      var imgContainer = previous.find('.img-container')
      var galleryModal = $('#galleryModal');
      setModalImage(galleryModal, imgContainer);
      setLeftNav(galleryModal, previous.prev().length !== 0);
      setRightNav(galleryModal, true);
      galleryInfo.currentModalImage = imgContainer;
    }
  });

  $('.nav-right').on('click', function() {
    var next = galleryInfo.currentModalImage.parent().next();
    if (next.length !== 0) {
      var imgContainer = next.find('.img-container')
      var galleryModal = $('#galleryModal');
      setModalImage(galleryModal, imgContainer);
      setLeftNav(galleryModal, true);
      setRightNav(galleryModal, next.next().length !== 0);
      galleryInfo.currentModalImage = imgContainer;
    }
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
