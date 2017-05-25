(function(footer, $, undefined) {
  footer.init = function() {
    $('.site-footer .site-links a').on('click', function(event) {
      event.preventDefault();
      scroll.scrollToAnchor($(this));
    });
  };
}( window.footer = window.footer || {}, jQuery ));