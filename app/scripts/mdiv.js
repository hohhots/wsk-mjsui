(function(window, $) {
  $.widget('mongol.mdiv', {
    version: '@VERSION',

    options: {
      height: 0,
      width: 0
    },

    _minheight: 350,

    _initMouseover: false,

    _create: function() {
      var self = this;

      if (this._detectMongolDivs()) {
        return;
      }

      this.element.removeClass('mongol');
      this.element.addClass('mdiv');

      this._container = $('<div class="mdiv-container"></div>');
      this._container.insertAfter(this.element);
      this._container.append(this.element);

      var html = this.element.html();
      this.element.empty();

      $('<span class="mongolfont"></span')
        .append(html)
        .appendTo(this.element);

      this.element.css('transform-origin', 'left top');
      this.element.css('transform', 'rotate(-90deg) rotateY(180deg)');

      $(window).resize(function() {
        self._resize();
      });

      $(window).on('load', function() {
        self._resize();
      });

      this._resize();
    },

    _destroy: function() {},

    _setOption: function() {},

    _resize: function() {
      var wheight = $(window).height();
      var innerwheight = wheight -
          parseInt($('body').css('margin-top'), 10) -
          parseInt($('body').css('margin-bottom'), 10);

      innerwheight = (wheight > this._minheight) ?
        innerwheight : this._minheight;

      $('body').css('overflow-y', 'hidden');

      this.element.outerWidth(innerwheight);

      var iw = this.element.outerWidth();

      this._resizeContainer(iw, innerwheight);
    },

    _resizeContainer: function(iw, ih) {
      this._container.css('width', iw);
      this._container.css('height', ih);
    },

    _detectMongolDivs: function() {
      if (!$(this.element).is('div')) {
        // not allowed
        return true;
      }

      // Nested divs each has same class 'mongol' are not allowed.
      if ($(this.element).find('.mongol').is('div') ||
          $(this.element).parent('.mongol').is('div')) {
        console.error('Don\'t nest DIVs with \'mongol\' class name.');

        // not allowed.
        return true;
      }

      // mdiv allowed
      return false;
    }
  });

  // $('.mongol').mdiv();
})(window, jQuery);
