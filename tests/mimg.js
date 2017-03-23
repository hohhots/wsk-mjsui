define([
  'intern!object',
  'intern/chai!assert',
  'require',
  'intern/order!libs/jquery',
  'intern/order!libs/jquery-ui',
  'intern/order!todo/mdiv',
  'intern/order!todo/mimg'
], function (registerSuite, assert, require) {
  var containerClassName = 'mimg-container';

  registerSuite({
    name: 'mongol image in mongol div',

    setup: function() {
      element = $('<div class="mongol"><img></img></div>').mdiv().find('img');
      parent = element.parent('div');
    },

    'test has container div': function() {
      assert.equal(parent.length, 1,
                   'Mongol image must has a container of div.');
    },
    
    'test container has class': function() {
      assert.isTrue(parent.hasClass(containerClassName),
                    'Mongol image must has a container of div with specified class.');
    },

    'test container size same to image size': function() {
      assert.equal(parent.innerHeight(), element.outerHeight());
      assert.equal(parent.innerWidth(), element.outerWidth());
    }
  });
});
