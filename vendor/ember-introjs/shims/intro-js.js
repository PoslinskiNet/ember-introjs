(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['introJs'] };
  }

  define('intro-js', [], vendorModule);
})();
