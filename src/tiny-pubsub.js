/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {

  var o = $({});

  $.sub = function() {
    o.on.apply(o, arguments);
  };

  $.unsub = function() {
    o.off.apply(o, arguments);
  };

  $.pub = function() {
    o.trigger.apply(o, arguments);
  };

}));