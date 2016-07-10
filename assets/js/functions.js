$( document ).ready(function() {

  var leftMenu = $("header.site-header nav a");
  leftMenu.slice(0, Math.floor(leftMenu.length/2)).css("order", "2");

});