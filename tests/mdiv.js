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

    'test only div\'s mongol class has effect': function() {
      assert.isFalse($('<span class="mongol"></span>').mdiv().hasClass('mdiv'), 'Only div html element\'s class \'mongol\' has effect!');
    },

    'test nested mongol divs are not allowed!': function() {
      assert.isFalse($('<div class="mongol"><div class="mongol"></div></div>').mdiv().hasClass('mdiv'));
    },

    'test insert div with \'mongol\' class into div which has \'mdiv\' class dont work.': function() {
      assert.isTrue($('<div class="mdiv"><div class="mongol"></div></div>').mdiv().hasClass('mongol'));
    },

    'test wrap div with \'mdiv\' class into div which has \'mongol\' class dont work.': function() {
      assert.isTrue($('<div class="mongol"><div class="mdiv"></div></div>').mdiv().hasClass('mongol'));
    },
    
    'test mdiv class': function(){
      assert.isTrue(element.hasClass('mdiv'), 'Make sure after build the DIV which has corresponding class will has correct changed class name.');
    },

    'test div height': function() {
      var ih = $(window).innerHeight() - parseInt($('body').css('margin-top')) - parseInt($('body').css('margin-bottom')); 
      assert.equal(element.outerWidth(), ih);
    }
    
	  });
})
