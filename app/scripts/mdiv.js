(function(window, $) {
  $.widget('mongol.mdiv', {
    version: '@VERSION',

    options: {
      _minheight: 350,
      height: 0,
      width: 0
    },

    _create: function() {
      var self = this;

      if (this._checkMongolDivs()) {
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
      
      //$('body').css('overflow-y', 'hidden');

      var wheight = 0;
      var innerwheight = 0;
      // Check if in other div
      var parDiv = this._container.parents('div');
      if (parDiv.length > 0) {
        wheight = parDiv.first().innerHeight();
        innerwheight = wheight;
        
      }else{
        wheight = $(window).height();

        innerwheight = wheight -
          parseInt($('body').css('margin-top'), 10) -
          parseInt($('body').css('margin-bottom'), 10);
        
        innerwheight = (wheight > this.options._minheight) ?
          innerwheight : this.options._minheight;
      }
      
      this.element.outerWidth(innerwheight);

      var iw = this.element.outerWidth();
      
      this._resizeContainer(iw, innerwheight);
    },

    _resizeContainer: function(iw, ih) {
      this._container.css('width', iw);
      this._container.css('height', ih);
    },

    _checkMongolDivs: function() {

      // Only div can has class 'mongol'
      if (!this.element.is('div')) {
        console.error('Only div element can has \'mongol\' class.');

        // not allowed
        return true;
      }
      
      // Nested divs each has same class 'mongol' are not allowed.
      if (this.element.find('.mongol, .mdiv').is('div') ||
          this.element.parents('.mongol, .mdiv').is('div')) {
        console.error('Don\'t nest DIVs with \'mongol\' class or \'mdiv\' class.');

        // not allowed.
        return true;
      }

      // mdiv allowed
      return false;
    }
  });

  // $('.mongol').mdiv();
})(window, jQuery);
