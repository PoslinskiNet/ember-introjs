import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | Step', function() {
  setupRenderingTest();

  it('renders', function() {
    this.render(hbs`{{intro-js/step}}`);
    expect(this.$()).to.have.length(1);
  });

  it('renders step as a block', function() {
    this.render(hbs`
      {{#intro-js/step}}
        Step content
      {{/intro-js/step}}
    `);

    expect(this.$()).to.have.length(1);
  });
});
