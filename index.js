'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-introjs',

  included(app) {
    this._super.included(app);

    app.import('vendor/ember-introjs/intro.js', {
      using: [
        { transformation: 'amd', as: 'intro-js' }
      ]
    });
    app.import('vendor/ember-introjs/introjs.css');
  },

  introJsPath() {
    return path.dirname(resolve.sync('intro.js', { basedir: __dirname }))
  },

  treeForVendor(tree) {
    const introJsTree = new Funnel(this.introJsPath(), {
      destDir: 'ember-introjs',
      files: ['intro.js', 'introjs.css']
    });

    return tree ? new mergeTrees([tree, introJsTree]) : introJsTree;
  },
};
