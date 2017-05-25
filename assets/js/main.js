---
---
/*get data from liquid*/
var SITE_DATA_SETTINGS = {{site.data.settings | jsonify}};

{% include_relative scroll.js %}
{% include_relative header.js %}
{% include_relative gallery.js %}
{% include_relative map.js %}
{% include_relative contact.js %}
{% include_relative footer.js %}

$(document)
  .ready(function() {
    map.load();
    scroll.init();
    header.init();
    gallery.init();
    contact.init();
    footer.init();
  });