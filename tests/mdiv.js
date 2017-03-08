define([
  'intern!object',
  'intern/chai!assert',
  'intern/order!libs/jquery',
  'intern/order!libs/jquery-ui',
  'intern/order!todo/mdiv'
], function (registerSuite, assert) {
	registerSuite({
		name: 'mongol div in window',

    setup: function() {
      element = $('<div class="mongol"></div>').mdiv();
    },

    'test mdiv class': function(){
      assert.isTrue(element.hasClass('mdiv'), 'Make sure after build the DIV which has corresponding class will has correct changed class name.');
    },

    'test div height in window': function() {
      var ih = $(window).innerHeight() - parseInt($('body').css('margin-top')) - parseInt($('body').css('margin-bottom')); 
      assert.equal(element.outerWidth(), ih, 'In window mongol div has same height value with window innerHeight.');
    },

    'test _container div height in window': function() {
      assert.equal(element.css('width'), element.parent('div.mdiv-container').innerWidth()+ 'px');
    }
	});
  
  registerSuite({
    name: 'mongol div in other div',
    
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
    
    'test mdiv divs wrap mongol mdiv.': function() {
      assert.isTrue($('<div class="mdiv"><div class="mongol"></div></div>').
                    find('.mongol').mdiv().hasClass('mongol'), 'Can\'t insert mongol div into mdiv div.');
    },

    'test mongol div wrap mdiv div.': function() {
      assert.isTrue($('<div class="mongol"><div class="mdiv"></div></div>').
                    first().mdiv().hasClass('mongol'), 'mongol div can\'t wrap other div with mdiv class');
    },
    
    'test wrap mongol div correct.': function() {
      assert.isTrue($('<div><div class="mongol"></div></div>').
                    find('.mongol').mdiv().hasClass('mdiv'), 'mongol div can used in other div which is not mongol or mdiv class div');
    },

    'test mongol div width in other div.': function() {
      var el = $('<div style="height: 100px;width: 200px"><div class="mongol"></div></div>');
      var h = el.find('.mongol').mdiv().outerWidth();
      assert.equal(h, el.innerHeight(), 'mongol div must has same width value with outer container div height value.');
    }
    

  });
})
