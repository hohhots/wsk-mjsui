(function(window, $) {
  $.widget('mongol.mdiv', {
    version: '@VERSION',
    _elClassName: 'mdiv',
    _containerClassName: 'mdiv-container',
    _container: null,
    _containerParent: null,
    
    options: {
      _minheight: 350,
      height: -1
    },

    _create: function() {
      var self = this;

      if (checkMongolDivs(self)) {
        return;
      }

      setClass(self);

      setInnerHtml(self);

      rotateElement(self);
     
      setContainer(self);

      setContainerParent(self);
      
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

  function setClass(self) {
    var cl = (self._elClassName + ' ' +
              self.element.prop('class')
              .replace(/mongol/gi, '')
              .replace(/\s{2,}/g, ' ')
             ).trim();
    
    self.element.prop('class', cl);
  }

  function setInnerHtml(self) {
    var html = self.element.html();
    self.element.empty();

    $('<span class="mongolfont"></span')
      .append(html)
      .appendTo(self.element);
  }

  function rotateElement(self) {
    self.element.css('transform-origin', 'left top');
    self.element.css('transform', 'rotate(-90deg) rotateY(180deg)');

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
    var innerwheight = self._containerParent.innerHeight();

    if (!containerParentIsDiv(self)) {
      innerwheight = innerwheight -
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

  function setContainer(self) {
    self.element.wrap('<div class="' + self._containerClassName + '"></div>');
    self._container = self.element.parent('div.' + self._containerClassName);
  }

  function setContainerParent(self) {
    var parDiv = self._container.parents('div').first();

    if (parDiv.length) {
      self._containerParent = parDiv;
    } else {
      self._containerParent = $(window);
    }
  }

  function containerParentIsDiv(self) {
    if (self._containerParent &&
        self._containerParent.is('div')) {
      return true;
    }
    return false;
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
