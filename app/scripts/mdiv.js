(function($) {
  $.widget('mongol.mdiv', {
    version: '@VERSION',
    _elClassName: 'mdiv',
    _containerClassName: 'mdiv-container',
    _container: null,
    _containerParent: null,
    
    options: {
      _minheight: 350,
      width: -1
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
      setEvents(self);
    },

    _destroy: function() {},

    _setOption: function(key, value) {
      var self = this,
          fnMap = {
            width: function() {
              setWidth(self, value);
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
    self.element.wrapInner('<span class="mongolfont"></span');
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
      return true;
    }

    // Nested divs each has same class 'mongol' are not allowed.
    if (el.find('.mongol, .' + self._elClassName).is('div') ||
        el.parents('.mongol, .' + self._elClassName).is('div')) {
      console.error('Don\'t nest DIVs with \'mongol\' class or \'' + self._elClassName + '\' class.');
      return true;
    }

    return false;
  }

  function setContainerHeight(self) {
    var innerwheight = self._containerParent.innerHeight();

    if ($.isWindow(self._containerParent.get(0))) {
      innerwheight = innerwheight -
        parseInt($('body').css('margin-top'), 10) -
        parseInt($('body').css('margin-bottom'), 10);

      if (innerwheight < self.options._minheight) {
        innerwheight = self.options._minheight;
      }
    }

    self._container.outerHeight(innerwheight);
    
    self._setOptions({
      width: innerwheight
    });
  }

  function setContainerWidth(self) {
    self._container.innerWidth(self.element.outerWidth());
  }


  function setContainer(self) {
    self.element.wrap('<div class="' + self._containerClassName + '"></div>');
    self._container = self.element.parent('div.' + self._containerClassName);

    setContainerParent(self);

    setContainerHeight(self);
  }

  // function setHeight(self) {
  //  self.element.css('width', self._container.innerWidth()); 
  //}

  function setWidth(self) {
    self.element.css('width', self._container.innerHeight());
    setContainerWidth(self);
  }

  function setContainerParent(self) {
    var parDiv = self._container.parent('div');

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

  function setEvents(self) {
    var callback = function () {
      setContainerHeight(self);
    };

    if (containerParentIsDiv(self)) {

    }
    
    if ($.isWindow(self._containerParent.get(0))) {
      self._containerParent.resize(callback);
    }
    
    $(window).on('load', callback);
  }

  // $('div.mongol').mdiv();
})(jQuery);

