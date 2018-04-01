import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | Step', function() {
  setupRenderingTest();

  it('renders', async function() {
    await render(hbs`{{intro-js/step}}`);
    expect(this.$()).to.have.length(1);
  });

  it('renders step as a block', async function() {
    await render(hbs`
      {{#intro-js/step}}
        Step content
      {{/intro-js/step}}
    `);

    expect(this.$()).to.have.length(1);
  });
});
