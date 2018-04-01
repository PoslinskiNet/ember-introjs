import { on } from '@ember/object/evented';

import $ from 'jquery';
import IntroJSComponent from 'ember-introjs/components/intro-js';
import { click } from '@ember/test-helpers';

let nextCompleted = false;
let currentStep;
let introJS;

const _checkNextCompleted = async() => {
  if (!nextCompleted) {
    return await _checkNextCompleted();
  } else {
    nextCompleted = false;
  }
}

const _checkExitCompleted = async() => {
  if ($('.introjs-overlay').length !== 0) {
    return await _checkExitCompleted();
  }
}

/**
 * Goes to the next step of the intro
 * @returns {Promise}
 */
const introJSNext = async() => {
  await click($('.introjs-nextbutton'));
  return await _checkNextCompleted();
};

/**
 * Goes to the previous step of the intro
 * @returns {Promise}
 */
const introJSPrevious = async() => {
  await click($('.introjs-prevbutton'));
  return await _checkNextCompleted();
};

/**
 * Exits the intro
 * @returns {Promise}
 */
const introJSExit = async() => {
  await click($('.introjs-skipbutton'));
  return await _checkExitCompleted();
};

/**
 * Force exit of the intro
 * @returns {Promise}
 */
const introJSEnsureClosed = async() => {
  if (introJS) {
    introJS.exit();
    return await _checkExitCompleted();
  }

  return;
};

/**
 * Current step of the intro
 * @returns {Number}
 */
const introJSCurrentStep = function() {
  return currentStep;
};

IntroJSComponent.reopen({
  _setIntroJS(_introJS) {
    introJS = _introJS;
    this._super(introJS);
  },

  _onExit(){
    this._super();
  },

  _onAfterChange(targetElement){
    nextCompleted = true;
    this._super(targetElement);
  },

  _setCurrentStep(step){
    this._super(step);
    currentStep = this.get('currentStep');
  },

  stopWatchingTestVars: on('willDestroyElement', function(){
    introJS = null;
  })
});

export {
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep,
  IntroJSComponent
};
