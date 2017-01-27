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

function initBodyEvents() {
  $(window).scroll(function() {
    /*Account for negative event margin*/
    var limit = $('#eventos .event-container').offset().top;
    if ($(this).scrollTop() >= limit) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  $('#back-to-top').click(function(event) {
    event.preventDefault();
    $('.site-header .nav.navbar-nav .active').removeClass('active');
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
  });
};

function initHeaderEvents() {
  $('.site-header .nav.navbar-nav li').on('click', function(event) {
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
    var target = $($(this).find('a').attr('href'));
    if (target.length) {
      event.preventDefault();
      var topCoord = target.offset().top;

      /*Account for the event negative margin*/
      if (target.attr('id') == 'eventos') {
        topCoord = target.find('.event-container').offset().top;
      }
      $('html, body').stop().animate({
        scrollTop: topCoord
      }, 1000);
    }
  });
};

function setModalImage(galleryModal, galleryImage) {
  var imageElem = galleryImage.find('img')[0];
  var caption = galleryImage.find('.caption')[0].innerHTML;
  var modalImageElem = galleryModal.find('img')[0];
  var modalCaptionElem = galleryModal.find('.modal-caption')[0];
  modalImageElem.src = imageElem.src;
  modalImageElem.alt = imageElem.alt;
  modalCaptionElem.innerHTML = caption;
}

function initGallerySectionEvents() {
  $('.section-gallery .gallery-img').on('click', function() {
    var galleryModal = $('#galleryModal');
    setModalImage(galleryModal, $(this));
    galleryModal.find('.nav-left').toggle($(this).prev().length != 0);
    galleryModal.find('.nav-right').toggle($(this).next().length != 0);
    galleryInfo.currentModalImage = $(this);
    galleryModal.modal();
  });

  $('.nav-left').on('click', function() {
    var previous = galleryInfo.currentModalImage.prev();
    if (previous.length !== 0) {
      var galleryModal = $('#galleryModal');
      setModalImage(galleryModal, previous);
      galleryModal.find('.nav-left').toggle(previous.prev().length != 0);
      galleryModal.find('.nav-right').toggle(true);
      galleryInfo.currentModalImage = previous;
    }
  });

  $('.nav-right').on('click', function() {
    var next = galleryInfo.currentModalImage.next();
    if (next.length !== 0) {
      var galleryModal = $('#galleryModal');
      setModalImage(galleryModal, next);
      galleryModal.find('.nav-left').toggle(true);
      galleryModal.find('.nav-right').toggle(next.next().length != 0);
      galleryInfo.currentModalImage = next;
    }
  });
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

function initContactSectionEvents() {
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

function initEvents() {
  initBodyEvents();
  initHeaderEvents();
  initGallerySectionEvents();
  initContactSectionEvents();
};

$(document)
  .ready(function() {
    loadGoogleAPI(googleMapsInfo.apiKey, googleMapsInfo.callback);
    initEvents();
  });
