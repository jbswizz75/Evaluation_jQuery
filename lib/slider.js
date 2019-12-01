'use strict';

(function ($) {
  $.fn.MySlider = function (options) {
    this.settings = $.extend({
      'el': $(this) || [],
      'image': [],
    }, options);

    var el = this.settings.el;
    var img = this.settings.image;
    var priv = {};
    var count = 0;

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * Display pictures
       */

      'setImgs': function () {

        var slide = $('.slider');
        slide.append('<ul class="picture"></ul>');
        var pic = $('.picture');
        var total = count-1;
        var prev = $('#prev');
        var next = $('#next');
        var a = $('.ariane');
        var image = $('img');
        var l = $('li');
        var i = 0;
        var j = -1;

        //add picture
        img.forEach(() => {
          pic.append('<li id="'+img['id']+'><img src="'+img['link']+'" alt="" width="500" height="500"></li>');
          count++;
        });

        //display buttons
        slide.append('<div id="prev"><span><i class="fas fa-arrow-circle-left"></i></span></div>');
        slide.append('<div id="next"><span><i class="fas fa-arrow-circle-right"></i></span></div>');

        //click on previous button
        prev.on('click', () => {
          count --;

          a.remove();
          if (count < 0) {
            count = total;
          }

          for (i; i < image.length; i++ ){
            l.hide();
          }

          $('#'+ count).show();

          for(j; j < count; j++) {
            slide.append('<span class="ariane"><i class="far fa-dot-circle"></i></span>');
          }
        });

        //click on next button
        next.on('click', () => {
          count++;

          a.remove();
          if (count > total) {
            count = 0;
          }

          for (i; i < image.length; i++ ){
            l.hide();
          }

          $('#'+ count).show();

          for(j; j < count; j++) {
            slide.append('<span class="ariane"><i class="far fa-dot-circle"></i></span>');
          }
        });

      }

    });

    // Private Methods - Internal Methods
    Object.assign(priv, {
      'init': function () {
        el.append('<div class="slider"></div>');
        this.setImgs();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();
    return this;

  };
}(jQuery));