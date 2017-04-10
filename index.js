/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-introjs',

  included: function(app) {
    this._super.included(app);

    var shim = isFastBoot() ? 'intro-js-fastboot.js' : 'intro-js.js';

    app.import('vendor/ember-introjs/intro.js');
    app.import('vendor/ember-introjs/shims/' + shim);
  },

  introJsPath() {
    return path.join(this.app.project.nodeModulesPath, 'intro.js');
  },

  treeForVendor(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.introJsPath(), {
      destDir: 'ember-introjs',
      files: ['intro.js']
    }));

    return mergeTrees(trees);
  },
};

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
