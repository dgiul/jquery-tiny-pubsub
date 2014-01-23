/*! Tiny Pub/Sub - v0.7.0 - 2014-01-23
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2014 "Cowboy" Ben Alman; Licensed MIT */
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