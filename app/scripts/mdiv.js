(function(window, $) {
  $.widget('mongol.mdiv', {
    version: '@VERSION',
    _elClassName: 'mdiv',
    _containerClassName: 'mdiv-container',
    
    options: {
      _minheight: 350,
      height: -1
    },

    _create: function() {
      var self = this;

      if (checkMongolDivs(self)) {
        return;
      }

      resetSelfClass(self);

      this.element.wrap('<div class="' + this._containerClassName + '"></div>');
      this._container = this.element.parent('div.' + this._containerClassName);

      var html = this.element.html();
      this.element.empty();

      $('<span class="mongolfont"></span')
        .append(html)
        .appendTo(this.element);

      this.element.css('transform-origin', 'left top');
      this.element.css('transform', 'rotate(-90deg) rotateY(180deg)');

      setElementSize(self);

      setEvents(self);
    },

    _destroy: function() {},

    _setOption: function(key, value) {
      var self = this,
          fnMap = {
            height: function() {
              setSelfHeight(value, self);
            }
          };

      this._super(key, value);

      if (key in fnMap) {
        fnMap[key]();

        // Fire event
        // this._triggerOptionChanged(key, value);
      }
    }
  });

  function resetSelfClass(self) {
    var cl = (self._elClassName + ' ' +
              self.element.prop('class')
              .replace(/mongol/gi, '')
              .replace(/\s{2,}/g, ' ')
             ).trim();
    
    self.element.prop('class', cl);
  }


  function checkMongolDivs(self) {
    var el = self.element;
    // Only div can has class 'mongol'
    if (!el.is('div')) {
      console.error('Only div element can has \'mongol\' class.');

      // not allowed
      return true;
    }

    // Nested divs each has same class 'mongol' are not allowed.
    if (el.find('.mongol, .' + self._elClassName).is('div') ||
        el.parents('.mongol, .' + self._elClassName).is('div')) {
      console.error('Don\'t nest DIVs with \'mongol\' class or \'' + self._elClassName + '\' class.');

      // not allowed.
      return true;
    }

    // mdiv allowed
    return false;
  }

  function setElementSize(self) {
    var innerwheight;
    // Check if in other div or window
    var parDiv = self._container.parents('div');
    if (parDiv.length) {
      innerwheight = parDiv.first().innerHeight();
    } else {
      var wheight = $(window).height();

      innerwheight = wheight -
        parseInt($('body').css('margin-top'), 10) -
        parseInt($('body').css('margin-bottom'), 10);
      if (innerwheight < self.options._minheight) {
        innerwheight = self.options._minheight;
      }
    }

    self._setOptions({
      height: innerwheight
    });
  }

  function setSelfHeight(height, self) {
    self.element.outerWidth(height);

    setContainerSize(self);
  }

  function setContainerSize(self) {
    self._container.css('width', self.element.outerWidth());
    self._container.css('height', self.element.outerHeight());
  }

  function setEvents(self) {
    $(window).resize(function() {
      setElementSize(self);
    });

    $(window).on('load', function() {
      setElementSize(self);
    });
  }

  // $('div.mongol').mdiv();
})(window, jQuery);
