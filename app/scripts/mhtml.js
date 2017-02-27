(function($) {
    $.widget('m.mhtml', {

        options: {
            height: 0,
            width: 0
        },

        _minheight: 350,
        
        _create: function() {
            var self = this;
            
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

            $(window).resize(function() {
                self._resize();
            });

            
            this._resize();
            
        },

        _destroy: function() {},

        _setOption: function() {},

        _resize: function() {
            this.element.css('transform-origin', 'left top');
            this.element.css('transform', 'rotate(-90deg) rotateY(180deg)');
            
            var wheight = $(window).height();
            var innerwheight = wheight - parseInt($('body').css('margin-top')) - parseInt($('body').css('margin-bottom'));

            innerwheight = (wheight > this._minheight) ? innerwheight : this._minheight;

            this.element.outerWidth(innerwheight);
            
            var iw = this.element.outerWidth();
                        
            this._resizeContainer(iw, innerwheight);

        },

        _resizeContainer: function(iw, ih) {

            this._container.css('width', iw);
            this._container.css('height', ih);

        }
    });

    $('.mongol').mhtml();    
})(jQuery);


