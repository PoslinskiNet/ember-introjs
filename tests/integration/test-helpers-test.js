import {
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep } from './../helpers/ember-introjs';
import $ from 'jquery';
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { visit } from '@ember/test-helpers';

describe('test helpers', function(){
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

    expect($('.introjs-overlay').length).to.equal(0);
  });

  it('can use the previous helper', async function(){
    await introJSNext();
    await introJSPrevious();

    expect(introJSCurrentStep().intro).to.equal('Step 1!');
  });
});
