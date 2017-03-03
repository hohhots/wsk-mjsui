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

    'test is div': function() {
       assert.isTrue($('<span class="mongol"></span>').
                     mdiv().hasClass('mongol'), 'Only div html element\'s class \'mongol\' has effect!');
    },

    'test wrap div of nested divs with mongol class': function() {
      assert.isTrue($('<div class="mongol"><div class="mongol"></div></div>').
                    first().mdiv().hasClass('mongol'), 'Can\'t nest divs with mongol class.');
    },

    'test wrapped div of nested divs with mongol class': function() {
      assert.isTrue($('<div class="mongol"><div class="mongol"></div></div>').
                    find('.mongol').mdiv().hasClass('mongol'), 'Can\'t nest divs with mongol class.');
    },
    
    'test nested divs that mongol in mdiv.': function() {
       assert.isTrue($('<div class="mdiv"><div class="mongol"></div></div>').
                     find('.mongol').mdiv().hasClass('mongol'), 'Can\'t insert mongol div into mdiv div.');
    },

    'test wrap div with \'mdiv\' class into div which has \'mongol\' class dont work.': function() {
       assert.isTrue($('<div class="mongol"><div class="mdiv"></div></div>').
                     first().mdiv().hasClass('mongol'));
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
