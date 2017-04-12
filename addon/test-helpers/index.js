import IntroJSComponent from 'ember-introjs/components/intro-js';
import Ember from 'ember';
import { wait, click } from 'mocha';

const { $ } = Ember;

var nextCompleted = false;
var currentStep;
var introJS;

export function introJSNext(){
  click($('.introjs-nextbutton'));
  return wait().then(checkNextCompleted);
}

export function introJSExit(){
  click($('.introjs-skipbutton'));
  return wait().then(checkExitCompleted);
}

export function introJSEnsureClosed() {
  if (!introJS) {
    return wait();
  }

  introJS.exit();
  return wait().then(checkExitCompleted);
}

export function introJSPrevious(){
  click($('.introjs-prevbutton'));
  return wait().then(checkNextCompleted);
}

export function introJSCurrentStep() {
  return currentStep;
}

export function checkNextCompleted() {
  if (!nextCompleted) {
    return wait().then(checkNextCompleted);
  } else {
    nextCompleted = false;
  }
}

export function checkExitCompleted() {
  if ($('.introjs-overlay').length !== 0) {
    return wait().then(checkExitCompleted);
  }
}

Ember.runInDebug(function(){
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
});
