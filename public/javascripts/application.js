// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var Agustin = {
  clear_form : function(id) {
    id = $(id) ? id : '';

    var css_iden = id + 'textarea, ';
    css_iden += id + 'input:not([type=submit]):not([type=hidden])';
    Array.each(
      $$(css_iden),
      function(el) { el.value = '';}
    );
  },

  update_inner_html: function (elem_id, content) {
    var my_el;
    if(my_el = $(elem_id)) {
      my_el.innerHTML = content;
      window.rails.applyEvents();
    }
  },

  make_headers_persistent : function (outer_identifier, inner_identifier) {
    
    var unique_class_name = 'floating_header';
    var update_persistent_headers = function () {
      $$(outer_identifier).each(function(persistent_area) {
        // Position of our window
        var window_y = window.getScroll().y;

        // grab original and cloned header
        var static_css = inner_identifier + ':not(.' + unique_class_name + ')';
        var static_header = persistent_area.getElement(static_css);
        var persistent_header = persistent_area.getElement('.' + unique_class_name);
        if(!persistent_header) {
          create_clones();
          persistent_header = persistent_area.getElement('.' + unique_class_name);
        }

        // Find top of the persistent area
        var persistent_area_y_top = persistent_area.getPosition().y;

        // Find Bottom of persistent area
        var persistent_area_height = persistent_area.getSize().y;
        var persistent_area_y_bottom = persistent_area_y_top + persistent_area_height;

        // Find offset of the actual height of the header
        var offset = persistent_header.getSize().y;

        // See if window is currently between bottom of header div
        // and bottom of persistent area
        var below_persistent_top = window_y >= persistent_area_y_top;
        var above_persistent_bottom = window_y <= persistent_area_y_bottom - (offset + 45);

        // Original header
        if( below_persistent_top && above_persistent_bottom) {
          // We are within this persistent area, so find the
          // cloned persistent header and display it
            static_header.setStyle('visibility', 'hidden');
            persistent_header.setStyle('left', static_header.getPosition().x);
            persistent_header.setStyle('width', static_header.getStyle('width'));
            persistent_header.setStyle('visibility', 'visible');
        } else {
            static_header.setStyle('visibility', 'visible');
            persistent_header.setStyle('visibility', 'hidden');
        }
      });
    };

    function create_clones () {
      $$(outer_identifier).each(function(persistent_area) {
        var persistent_header = persistent_area.getElement(inner_identifier);
        var copy_of_header = persistent_header.clone();
        copy_of_header.inject(persistent_header, 'before');
        copy_of_header.addClass(unique_class_name);
      });
    };

    create_clones();
    update_persistent_headers.periodical(50);
  }

}

window.addEvent('domready', function() {

  /*
* The following line ensures that any element with the
* class 'persistent_header' inside an element of class 'persistent_area'
* will persist as you scroll through the 'persistent_area' element
*/
  Agustin.make_headers_persistent('.persistent_area', '.persistent_header');
});
