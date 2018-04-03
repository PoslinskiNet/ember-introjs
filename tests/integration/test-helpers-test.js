import {
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep } from './../helpers/ember-introjs';
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';

describe('test helpers', function() {
  setupApplicationTest();

  beforeEach(async function(){
    await visit('/');
  });

  afterEach(async function(){
    return await introJSEnsureClosed();
  });

  it('can use the next helper', async function(){
    await introJSNext();

    expect(introJSCurrentStep().intro).to.equal('Step 2!');
  });

  it('can use the exit helper', async function(){
    await introJSExit();

    expect(document.querySelector('.introjs-overlay')).to.equal(null);
  });

  it('can use the previous helper', async function(){
    await introJSNext();
    await introJSPrevious();

    expect(introJSCurrentStep().intro).to.equal('Step 1!');
  });
});
