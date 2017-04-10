(function() {
  function vendorModule() {
    'use strict';

    return { 'default': FastBoot.require('introJs') };
  }

  define('intro-js', [], vendorModule);
})();
