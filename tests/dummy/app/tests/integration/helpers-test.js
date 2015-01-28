import startApp from 'dummy/tests/helpers/start-app';
import 'ember-introjs/helpers';
import Ember from 'ember';

var App;
describe('test helpers', function(){

  beforeEach(function(){
    App = startApp();
    visit('/');
  });

  afterEach(function(){
    introJSEnsureClosed();
    return andThen(() =>{
      Ember.run(App, 'destroy');
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
