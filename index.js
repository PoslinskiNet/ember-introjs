/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-introjs',

  blueprintsPath: function(){
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    app.import({
      development: app.bowerDirectory + '/intro.js/intro.js',
      production: app.bowerDirectory + '/intro.js/intro.min.js'
    });
    app.import(app.bowerDirectory + '/intro.js/introjs.css');
  }
};
