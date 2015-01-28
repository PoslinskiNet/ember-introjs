module.exports = {
  name: 'ember-introjs'

  afterInstall: function(options) {
    return this.addBowerPackageToProject('introjs', '1.0.0');
  }
};
