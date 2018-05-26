import {
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep } from './../helpers/ember-introjs';
import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('test helpers', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/');
  });

  hooks.afterEach(async function() {
    return await introJSEnsureClosed();
  })

  test('can use the next helper', async function(assert) {
    await introJSNext();

    assert.equal(introJSCurrentStep().intro, 'Step 2!');
  });

  test('can use the exit helper', async function(assert){
    await introJSExit();

    assert.equal(document.querySelector('.introjs-overlay'), null);
  });

  test('can use the previous helper', async function(assert){
    await introJSNext();
    await introJSPrevious();

    assert.equal(introJSCurrentStep().intro, 'Step 1!');
  });
})
