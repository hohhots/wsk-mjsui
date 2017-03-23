(function($) {
  $.widget('mongol.mimg', {
    version: '@VERSION',

    _create: function () {
      var self = this;

      if (checkMongolImage(self)) {
        return;
      }

      rotateElement(self);
      setContainer(self);
    }
  });

  function checkMongolImage(self) {
    var el = self.element;
    // Only div can has class 'mongol'
    if (!el.is('img')) {
      console.error('Only image element can converted to mongol image.');
      return true;
    }

    // Only images in mongol div can converted to mongol image.
    if (el.parents('span.mongolfont').length === 0) {
      console.error('Only images in mongol div can converted to mongol image.');
      return true;
    }

    return false;
  }
  
  function rotateElement(self) {
    self.element.css('transform-origin', 'left top');
    self.element.css('transform', 'rotate(-90deg) rotateY(180deg)');

  }

  function setContainer(self) {
    self.element.wrap('<div class="mimg-container" style="border: 1px solid red"></div>');
    self._container = self.element.parent('div');

    //setContainerParent(self);

    setContainerSize(self);
  }

  function setContainerSize(self) {
    self._container.innerWidth(self.element.outerHeight());
    self._container.innerHeight(self.element.outerWidth());    
  }
})(jQuery);
