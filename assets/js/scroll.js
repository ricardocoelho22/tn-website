(function (scroll, $, undefined) {

  var _scrollSpeed = 1000;

  scroll.scrollToAnchor = function(anchor) {
    var target = $(anchor.attr('href'));
    if (target.length) {
      var topCoord = target.offset().top;

      /*Account for the event negative margin*/
      if (target.attr('id') == 'eventos') {
        topCoord = target.find('.event-container').offset().top;
      }
      $('html, body').stop().animate({
        scrollTop: topCoord
      }, _scrollSpeed);
    }
  }

   scroll.init = function() {
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
      }, _scrollSpeed);
    });
  };
}(window.scroll = window.scroll || {}, jQuery));