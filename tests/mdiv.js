define([
    'intern!object',
    'intern/chai!assert',
    'intern/order!libs/jquery',
    'intern/order!libs/jquery-ui',
    'intern/order!todo/mdiv'
], function (registerSuite, assert) {
	  registerSuite({
		  name: 'mdiv',

        setup: function() {
          element = $('<div class="mongol"></div>').mdiv();
        },
              
        'test div class': function(){
            assert.isTrue(element.hasClass('mdiv'), 'Make sure after build the DIV which has corresponding class will has correct changed class name.');
        },

        'test div height': function() {
            var ih = $(window).innerHeight() - parseInt($('body').css('margin-top')) - parseInt($('body').css('margin-bottom')); 
            assert.equal(element.outerWidth(), ih);
                                                                                               }
            
	      });
})
