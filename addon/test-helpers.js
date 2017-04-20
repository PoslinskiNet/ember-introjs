/* global click wait */
import IntroJSComponent from 'ember-introjs/components/intro-js';
import Ember from 'ember';

const { $, Test } = Ember;

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

/**
 * Goes to the next step of the intro
 * @returns {Promise}
 */
Test.registerAsyncHelper('introJSNext', function(){
  click($('.introjs-nextbutton'));
  return wait().then(_checkNextCompleted);
});

/**
 * Goes to the previous step of the intro
 * @returns {Promise}
 */
Test.registerAsyncHelper('introJSPrevious', function(){
  click($('.introjs-prevbutton'));
  return wait().then(_checkNextCompleted);
});

/**
 * Exits the intro
 * @returns {Promise}
 */
Test.registerAsyncHelper('introJSExit', function(){
  click($('.introjs-skipbutton'));
  return wait().then(_checkExitCompleted);
});

/**
 * Force exit of the intro
 * @returns {Promise}
 */
Test.registerAsyncHelper('introJSEnsureClosed', function(){
  if (!introJS) {
    return wait();
  }
  introJS.exit();
  return wait().then(_checkExitCompleted);
});

/**
 * Current step of the intro
 * @returns {Number}
 */
Test.registerHelper('introJSCurrentStep', function() {
  return currentStep;
});

function _checkNextCompleted() {
  if (!nextCompleted) {
    return wait().then(_checkNextCompleted);
  } else {
    nextCompleted = false;
  }
}

function _checkExitCompleted() {
  if ($('.introjs-overlay').length !== 0) {
    return wait().then(_checkExitCompleted);
  }
}
