import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find } from '@ember/test-helpers';
import { expect } from 'chai';

describe('Integration | Component | Step', function() {
  setupRenderingTest();

  it('renders', async function() {
    await render(hbs`{{intro-js/step}}`);

    expect(find('div[data-step]').getAttribute('data-step')).to.equal("0");
  });

  it('renders step as a block', async function() {
    await render(hbs`
      {{#intro-js/step}}
        Step content
      {{/intro-js/step}}
    `);

    expect(find('div[data-step]').getAttribute('data-step')).to.equal("0");
  });
});
