import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Component | Step', function(hooks) {
  setupRenderingTest(hooks);

  test('renders', async function(assert) {
    await render(hbs`{{intro-js/step}}`);

    assert.equal(find('div[data-step]').getAttribute('data-step'), '0');
  });

  test('renders step as a block', async function(assert) {
    await render(hbs`
          {{#intro-js/step}}
            Step content
          {{/intro-js/step}}
          `);
    assert.equal(find('div[data-step]').getAttribute('data-step'), '0');
  });
})
