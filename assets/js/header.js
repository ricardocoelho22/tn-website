(function(header, $, undefined) {
  header.init = function() {
    $('.site-header .nav.navbar-nav li').on('click', function(event) {
      $(this).parent().find('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
      scroll.scrollToAnchor($(this).find('a'));
    });
  };
}( window.header = window.header || {}, jQuery ));