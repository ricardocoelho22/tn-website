---
---
/*get data from liquid*/
var siteDataSettings = {{site.data.settings | jsonify}}

var googleMapsInfo = {
  apiKey: siteDataSettings.googleMapsAPIKey,
  callback: 'initMap',
  coordSCA: { lat: 39.056272, lng: -9.006574 },
  coordTitle: 'Sporting Clube de Alenquer'
};

var galleryInfo = {
  currentModalImageIndex: ''
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: googleMapsInfo.coordSCA,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: googleMapsInfo.coordSCA,
    map: map,
    title: googleMapsInfo.title
  });
};

function loadGoogleAPI() {
  var head = document.getElementsByTagName('head').item(0);
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' +
    googleMapsInfo.apiKey + '&callback=' + googleMapsInfo.callback);
  head.appendChild(script);
};

function scrollToAnchor(anchor) {
  var target = $(anchor.attr('href'));
  if (target.length) {
    var topCoord = target.offset().top;

    /*Account for the event negative margin*/
    if (target.attr('id') == 'eventos') {
      topCoord = target.find('.event-container').offset().top;
    }
    $('html, body').stop().animate({
      scrollTop: topCoord
    }, 1000);
  }
}

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
    event.preventDefault();
    scrollToAnchor($(this).find('a'));
  });
};

function setModalImage(galleryModal, imageData) {
  var modalImageElem = galleryModal.find('img')[0];
  var modalCaptionElem = galleryModal.find('.modal-caption')[0];
  modalImageElem.src = imageData.full;
  modalImageElem.alt = imageData.caption;
  modalCaptionElem.innerHTML = imageData.caption;
};

function getImageIndex(imageElem){
  return parseInt(imageElem.attr('id').split('-')[1]);
}

function initGallerySectionEvents() {
  $('.section-gallery *[id^=gallery_img-]').on('click', function() {
    var galleryModal = $('#galleryModal');
    var imgIndex = getImageIndex($(this));
    var imageData = siteDataSettings.galleryImages[imgIndex];
    setModalImage(galleryModal, imageData);
    galleryModal.find('.nav-left').toggle(imgIndex > 0);
    galleryModal.find('.nav-right').toggle(imgIndex < siteDataSettings.galleryImages.length-1);
    galleryInfo.currentModalImageIndex = imgIndex;
    galleryModal.modal();
  });

  $('.nav-left').on('click', function() {
    var currentImgIndex = galleryInfo.currentModalImageIndex;
    if (currentImgIndex > 0) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex - 1;
      var imageData = siteDataSettings.galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').toggle(newImgIndex > 0);
      galleryModal.find('.nav-right').toggle(true);
      galleryInfo.currentModalImageIndex = newImgIndex;
    }
  });

  $('.nav-right').on('click', function() {
    var currentImgIndex = galleryInfo.currentModalImageIndex;
    if (currentImgIndex < siteDataSettings.galleryImages.length-1) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex + 1;
      var imageData = siteDataSettings.galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').toggle(true);
      galleryModal.find('.nav-right').toggle(newImgIndex < siteDataSettings.galleryImages.length-1);
      galleryInfo.currentModalImageIndex = newImgIndex;
    }
  });
};

function showSendingEmailAlert(form){
  $(form).find('.sending-alert').animate({maxHeight: '100px', padding: '15px'}, {queue: false});
  $(form).find('*[type="submit"]').animate({marginTop: '15px'}, {queue: false});
};

function hideSendingEmailAlert(form){
  $(form).find('.sending-alert').animate({maxHeight: '0px', padding: '0px'}, {queue: false});
  $(form).find('*[type="submit"]').animate({marginTop: '0px'}, {queue: false});
}

function sendEmail(emailToken, message, success, fail) {
  // $.ajax({
  //   method: 'POST',
  //   url: 'https://www.enformed.io/' + emailToken,
  //   data: message,
  //   datatype: 'json',
  //   success: function(){
  //     $('#contact-form').get(0).reset();
  //     $('#sendSuccessModal').modal();
  //   },
  //   error: function(){
  //     $('#sendFailModal').modal();
  //   }
  // });
  console.log('sent email to ' + 'https://www.enformed.io/' + emailToken + ' with message ' + message);

  success.call();
};

function initContactSectionEvents() {
  $('#contact-form').validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      "*subject": "required",
      message: "required"
    },
    messages: {
      name: "Por favor, insira o seu nome.",
      email: {
        required: "Por favor, insira o seu email.",
        email: "Por favor, introduza um endereço de email válido."
      },
      "*subject": "Por favor, indique o assunto da sua mensagem.",
      message: "Por favor, insira uma mensagem a enviar."
    },
    submitHandler: function(form, event){
      event.preventDefault();
      showSendingEmailAlert(form);
      $(form).find('*[type="submit"]').prop('disabled', true);
      sendEmail(siteDataSettings.emailToken, $(form).serialize(), 
        function(){
          hideSendingEmailAlert(form);
          $('#sendSuccessModal').modal();
          $(form).get(0).reset();
          $(form).find('.valid').removeClass('valid');
          $(form).find('*[type="submit"]').prop('disabled', false);
      },
        function(){
          $('#sendFailModal').modal();
        });
    }
  })

};

function initFooterEvents() {
  $('.site-footer .site-links a').on('click', function(event) {
    event.preventDefault();
    scrollToAnchor($(this));
  });
}

function initEvents() {
  initBodyEvents();
  initHeaderEvents();
  initGallerySectionEvents();
  initContactSectionEvents();
  initFooterEvents();
};

$(document)
  .ready(function() {
    // loadGoogleAPI();
    initEvents();
  });