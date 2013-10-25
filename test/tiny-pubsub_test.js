(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery Tiny Pub/Sub', {
    setup: function() {
      var result = this.result = [];
      this.createHandler = function(id) {
        return function() {
          result.push([id].concat([].slice.call(arguments, 1)));
        };
      };
    }
  });

  test('order', function() {
    $.sub('order', this.createHandler('order1'));
    $.sub('order', this.createHandler('order2'));
    $.sub('order.xyz', this.createHandler('order3'));
    $.sub('order.abc', this.createHandler('order4'));
    $.pub('order');
    deepEqual(this.result, [
      ['order1'],
      ['order2'],
      ['order3'],
      ['order4']
    ], 'handlers should fire in the order in which they were bound.');
  });

  test('arguments', function() {
    $.sub('arguments', this.createHandler('arguments1'));
    $.sub('arguments.xyz', this.createHandler('arguments2'));
    $.sub('arguments.abc', this.createHandler('arguments3'));
    $.pub('arguments', [null, 'test 1 2 3', undefined, 9]);
    deepEqual(this.result, [
      ['arguments1', null, 'test 1 2 3', undefined, 9],
      ['arguments2', null, 'test 1 2 3', undefined, 9],
      ['arguments3', null, 'test 1 2 3', undefined, 9]
    ], 'handlers should receive all passed arguments.');
  });

  test('namespaces', function() {
    $.sub('namespaces', this.createHandler('namespaces1'));
    $.sub('namespaces.xyz', this.createHandler('namespaces2'));
    $.sub('namespaces.abc', this.createHandler('namespaces3'));
    $.pub('namespaces.xyz', [8, 9]);
    deepEqual(this.result, [
      ['namespaces2', 8, 9]
    ], 'publishing should support jquery event namespaces.');
  });

  test('unsubscribe', function() {
    $.sub('unsubscribe', this.createHandler('unsubscribe1'));
    $.sub('unsubscribe.xyz', this.createHandler('unsubscribe2'));
    $.sub('unsubscribe.abc', this.createHandler('unsubscribe3'));
    $.unsub('unsubscribe.xyz');
    $.pub('unsubscribe', [8, 9]);
    deepEqual(this.result, [
      ['unsubscribe1', 8, 9],
      ['unsubscribe3', 8, 9]
    ], 'unsubscribing should work.');
  });

}(jQuery));
