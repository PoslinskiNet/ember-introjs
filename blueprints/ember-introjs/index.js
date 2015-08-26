module.exports = {
  name: 'ember-introjs',

  afterInstall: function(options) {
    return this.addBowerPackageToProject('intro.js', '1.0.0');
  }
};
