import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | Step', function(hooks) {
  setupTest(hooks);

  module('Step', function(){
    test('does render with 0 as default', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create();
      assert.equal(component['data-step'], '0');
    });

    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ step: 4 });
      assert.equal(component['data-step'], '4');
    });
  });

  module('Intro', function() {
    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ intro: 'My text' });
      assert.equal(component['data-intro'], 'My text');
    });
  });

  module('Tooltip class', function() {
    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ tooltipClass: 'my-class' });
      assert.equal(component['data-tooltipClass'], 'my-class');
    });
  });

  module('Highlight class', function() {
    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ highlightClass: 'my-class' });
      assert.equal(component['data-highlightClass'], 'my-class');
    });
  });

  module('Position', function() {
    test('does render with bottom as default', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create();
      assert.equal(component['data-position'], 'bottom');
    });

    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ position: 'top' });
      assert.equal(component['data-position'], 'top');
    });
  });

  module('Hint', function() {
    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ hint: 'My text' });
      assert.equal(component['data-hint'], 'My text');
    });
  });

  module('Hint position', function() {
    test('does render with top-middle as default', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create();
      assert.equal(component['data-hintPosition'], 'top-middle');
    });

    test('does render with a custom value', function(assert) {
      let component = this.owner.factoryFor('component:intro-js/step').create({ hintPosition: 'top' });
      assert.equal(component['data-hintPosition'], 'top');
    });
  });
});
