---
---
/*get data from liquid*/
var siteData = {{site.data | jsonify}}

var googleMapsInfo = {
  apiKey: siteData.settings.googleMapsAPIKey,
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
    center: googleMapsInfo.coordSCA
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
    var imageData = siteData.settings.galleryImages[imgIndex];
    setModalImage(galleryModal, imageData);
    galleryModal.find('.nav-left').toggle(imgIndex > 0);
    galleryModal.find('.nav-right').toggle(imgIndex < siteData.settings.galleryImages.length-1);
    galleryInfo.currentModalImageIndex = imgIndex;
    galleryModal.modal();
  });

  $('.nav-left').on('click', function() {
    var currentImgIndex = galleryInfo.currentModalImageIndex;
    if (currentImgIndex > 0) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex - 1;
      var imageData = siteData.settings.galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').toggle(newImgIndex > 0);
      galleryModal.find('.nav-right').toggle(true);
      galleryInfo.currentModalImageIndex = newImgIndex;
    }
  });

  $('.nav-right').on('click', function() {
    var currentImgIndex = galleryInfo.currentModalImageIndex;
    if (currentImgIndex < siteData.settings.galleryImages.length-1) {
      var galleryModal = $('#galleryModal');
      var newImgIndex = currentImgIndex + 1;
      var imageData = siteData.settings.galleryImages[newImgIndex];
      setModalImage(galleryModal, imageData);
      galleryModal.find('.nav-left').toggle(true);
      galleryModal.find('.nav-right').toggle(newImgIndex < siteData.settings.galleryImages.length-1);
      galleryInfo.currentModalImageIndex = newImgIndex;
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
      sendEmail(siteData.settings.address, $('#contact-form').serialize());
    } else {
      $('#message-invalid-alert').show();
    }
  });

  $('.alert-close').on('click', function() {
    $(this).parent().hide();
  });
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
    loadGoogleAPI();
    initEvents();
  });


// var googleMapsInfo = {
//   apiKey: 'AIzaSyCTYZoDbk3_Vc5t8uBKRMGR6UhjkjKgpWY',
//   callback: 'initMap',
//   coordSCA: { lat: 39.056272, lng: -9.006574 },
//   coordTitle: 'Sporting Clube de Alenquer'
// };

// var emailServiceInfo = {
//   address: 'ricardocoelho22@gmail.com'
// }

// var galleryInfo = {
//   currentModalImage: ''
// };

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 17,
//     center: googleMapsInfo.coordSCA
//   });
//   var marker = new google.maps.Marker({
//     position: googleMapsInfo.coordSCA,
//     map: map,
//     title: googleMapsInfo.title
//   });
// };

// function loadGoogleAPI(apiKey, callback) {
//   var head = document.getElementsByTagName('head').item(0);
//   var script = document.createElement('script');
//   script.setAttribute('type', 'text/javascript');
//   script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' +
//     apiKey + '&callback=' + callback);
//   head.appendChild(script);
// };

// function scrollToAnchor(anchor) {
//   var target = $(anchor.attr('href'));
//   if (target.length) {
//     var topCoord = target.offset().top;

//     /*Account for the event negative margin*/
//     if (target.attr('id') == 'eventos') {
//       topCoord = target.find('.event-container').offset().top;
//     }
//     $('html, body').stop().animate({
//       scrollTop: topCoord
//     }, 1000);
//   }
// }

// function initBodyEvents() {
//   $(window).scroll(function() {
//     /*Account for negative event margin*/
//     var limit = $('#eventos .event-container').offset().top;
//     if ($(this).scrollTop() >= limit) {
//       $('#back-to-top').fadeIn();
//     } else {
//       $('#back-to-top').fadeOut();
//     }
//   });

//   $('#back-to-top').click(function(event) {
//     event.preventDefault();
//     $('.site-header .nav.navbar-nav .active').removeClass('active');
//     $('body,html').animate({
//       scrollTop: 0
//     }, 1000);
//   });
// };

// function initHeaderEvents() {
//   $('.site-header .nav.navbar-nav li').on('click', function(event) {
//     $(this).parent().find('.active').removeClass('active');
//     $(this).addClass('active');
//     event.preventDefault();
//     scrollToAnchor($(this).find('a'));
//   });
// };

// function setModalImage(galleryModal, galleryImage) {
//   var imageElem = galleryImage.find('img')[0];
//   var caption = galleryImage.find('.caption')[0].innerHTML;
//   var modalImageElem = galleryModal.find('img')[0];
//   var modalCaptionElem = galleryModal.find('.modal-caption')[0];
//   modalImageElem.src = imageElem.src;
//   modalImageElem.alt = imageElem.alt;
//   modalCaptionElem.innerHTML = caption;
// }

// function initGallerySectionEvents() {
//   $('.section-gallery .gallery-img').on('click', function() {
//     var galleryModal = $('#galleryModal');
//     setModalImage(galleryModal, $(this));
//     galleryModal.find('.nav-left').toggle($(this).prev().length != 0);
//     galleryModal.find('.nav-right').toggle($(this).next().length != 0);
//     galleryInfo.currentModalImage = $(this);
//     galleryModal.modal();
//   });

//   $('.nav-left').on('click', function() {
//     var previous = galleryInfo.currentModalImage.prev();
//     if (previous.length !== 0) {
//       var galleryModal = $('#galleryModal');
//       setModalImage(galleryModal, previous);
//       galleryModal.find('.nav-left').toggle(previous.prev().length != 0);
//       galleryModal.find('.nav-right').toggle(true);
//       galleryInfo.currentModalImage = previous;
//     }
//   });

//   $('.nav-right').on('click', function() {
//     var next = galleryInfo.currentModalImage.next();
//     if (next.length !== 0) {
//       var galleryModal = $('#galleryModal');
//       setModalImage(galleryModal, next);
//       galleryModal.find('.nav-left').toggle(true);
//       galleryModal.find('.nav-right').toggle(next.next().length != 0);
//       galleryInfo.currentModalImage = next;
//     }
//   });
// };

// function isMessageValid(name, email, subject, message) {
//   return name.val() != "" && email.val() != "" && subject.val() != "" &&
//     message.val() != "";
// };

// function sendEmail(address, message) {
//   $.ajax({
//     method: 'POST',
//     url: 'https://formspree.io/' + address,
//     data: message,
//     datatype: 'json',
//     complete: function(jqXHR) {
//       if (jqXHR.readyState == 0 && jqXHR.status == 0) {
//         $('#contact-form').get(0).reset();
//         $('#sendSuccessModal').modal();
//       } else {
//         $('#sendFailModal').modal();
//       }
//     }
//   });
// };

// function initContactSectionEvents() {
//   $('#contact-form').submit(function(event) {
//     var name = $('#contact-name');
//     var email = $('#contact-email');
//     var subject = $('#contact-subject');
//     var message = $('#contact-message');
//     event.preventDefault();
//     if (isMessageValid(name, email, subject, message)) {
//       sendEmail(emailServiceInfo.address, $('#contact-form').serialize());
//     } else {
//       $('#message-invalid-alert').show();
//     }
//   });

//   $('.alert-close').on('click', function() {
//     $(this).parent().hide();
//   });
// };

// function initFooterEvents() {
//   $('.site-footer .site-links a').on('click', function(event) {
//     event.preventDefault();
//     scrollToAnchor($(this));
//   });
// }

// function initEvents() {
//   initBodyEvents();
//   initHeaderEvents();
//   initGallerySectionEvents();
//   initContactSectionEvents();
//   initFooterEvents();
// };

// $(document)
//   .ready(function() {
//     loadGoogleAPI(googleMapsInfo.apiKey, googleMapsInfo.callback);
//     initEvents();
//   });

