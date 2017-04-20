(function() {
  function vendorModule() {
    'use strict';

    var intro = self.introJs;
    delete self.introJs;

    return { 'default': intro };
  }

  define('intro-js', [], vendorModule);
})();
