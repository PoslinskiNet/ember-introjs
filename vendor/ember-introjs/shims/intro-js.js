/* eslint-env node */
define('intro-js', [], function() {
  'use strict';

  var introJs;

  if (typeof FastBoot != 'undefined') {
    introJs = FastBoot.require('introJs');
  } else {
    introJs = self.introJs;
    delete self.introJs;
  }

  return {
    'default': introJs
  };
});
