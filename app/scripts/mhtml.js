(function($) {
    $.widget('m.mhtml', {

        options: {},
        
        _create: function() {
            this.element.removeClass('mongol');
            this.element.addClass('mdiv');

            this._container = $('<div class="mdiv-container"></div>');
            this._container.insertAfter(this.element);
            this._container.append(this.element);

            this._container.css('width', this.element.css('width'));
            this._container.css('height', this.element.css('height'));
            
        },

        _destroy: function() {},

        _setOption: function() {}
        });
    
            })(jQuery);
