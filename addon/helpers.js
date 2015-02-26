import IntroJSComponent from 'ember-introjs/components/intro-js';
import Ember from 'ember';

if (typeof Ember.Test !== 'undefined') {
  Ember.runInDebug(function(){
    var nextCompleted = false;
    var currentStep;
    var introJS;

    IntroJSComponent.reopen({
      _setIntroJS: function(_introJS) {
        introJS = _introJS;
        this._super(introJS);
      },
      _onExit: function(){
        this._super();
      },

      _onAfterChange: function(targetElement){
        nextCompleted = true;
        this._super(targetElement);
      },

      _setCurrentStep: function(step){
        this._super(step);
        currentStep = this.get('currentStep');
      },

      stopWatchingTestVars: Ember.on('willDestroyElement', function(){
        introJS = null;
      })
    });

    function checkNextCompleted() {
      if (!nextCompleted) {
        return wait().then(checkNextCompleted);
      } else {
        nextCompleted = false;
      }
    }

    function checkExitCompleted() {
      if ($('.introjs-overlay').length !== 0) {
        return wait().then(checkExitCompleted);
      }
    }

    Ember.Test.registerAsyncHelper('introJSNext', function(app, context){
      click($('.introjs-nextbutton'));
      return wait().then(checkNextCompleted);
    });

    Ember.Test.registerAsyncHelper('introJSExit', function(app, context){
      click($('.introjs-skipbutton'));
      return wait().then(checkExitCompleted);
    });

    Ember.Test.registerAsyncHelper('introJSEnsureClosed', function(){
      if (!introJS) {
        return wait();
      }
      introJS.exit();
      return wait().then(checkExitCompleted);
    });

    Ember.Test.registerAsyncHelper('introJSPrevious', function(){
      click($('.introjs-prevbutton'));
      return wait().then(checkNextCompleted);
    });

    Ember.Test.registerHelper('introJSCurrentStep', function(app) {
      return currentStep;
    });
  });
}
