import { run } from '@ember/runloop';
import $ from 'jquery';
import startApp from 'dummy/tests/helpers/start-app';
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';

let App;

describe('test helpers', function(){
  beforeEach(function(){
    App = startApp();
    visit('/');
  });

  afterEach(function(){
    introJSEnsureClosed();

    return andThen(() =>{
      run(App, 'destroy');
      App = null;
    });
  });

  it('can use the next helper', function(){
    introJSNext();

    return andThen(() => {
      expect(introJSCurrentStep().intro).to.equal('Step 2!');
    });
  });

  it('can use the exit helper', function(){
    introJSExit();

    return andThen(() => {
      expect($('.introjs-overlay').length).to.equal(0);
    });
  });

  it('can use the previous helper', function(){
    introJSNext();
    introJSPrevious();

    return andThen(() =>{
      expect(introJSCurrentStep().intro).to.equal('Step 1!');
    });
  });
});
