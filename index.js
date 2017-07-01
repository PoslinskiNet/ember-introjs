/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-introjs',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-introjs/intro.js');
    app.import('vendor/ember-introjs/introjs.css');

    app.import('vendor/ember-introjs/shims/intro-js.js');
  },

  introJsPath() {
    return path.join(this.app.project.nodeModulesPath, 'intro.js');
  },

  treeForVendor(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.introJsPath(), {
      destDir: 'ember-introjs',
      files: ['intro.js', 'introjs.css']
    }));

    return mergeTrees(trees);
  },
};
