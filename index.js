'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-introjs',

  included(app) {
    this._super.included(app);

    app.import('vendor/ember-introjs/intro.min.js', {
      using: [
        { transformation: 'amd', as: 'intro-js' }
      ]
    });
    app.import('vendor/ember-introjs/introjs.min.css');
  },

  introJsPath() {
    return path.dirname(resolve.sync('intro.js', { basedir: __dirname }))
  },

  treeForVendor(tree) {
    console.log(this.introJsPath());
    const introJsTree = new Funnel(this.introJsPath(), {
      srcDir: 'minified',
      destDir: 'ember-introjs',
      files: ['intro.min.js', 'introjs.min.css']
    });

    return tree ? new mergeTrees([tree, introJsTree]) : introJsTree;
  },
};
