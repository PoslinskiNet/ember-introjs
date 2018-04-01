/* global click wait */
import { on } from '@ember/object/evented';

import $ from 'jquery';
import IntroJSComponent from 'ember-introjs/components/intro-js';

let nextCompleted = false;
let currentStep;
let introJS;

const _checkNextCompleted = async() => {
  if (!nextCompleted) {
    return await wait().then(_checkNextCompleted);
  } else {
    nextCompleted = false;
  }
}

const _checkExitCompleted = async() => {
  if ($('.introjs-overlay').length !== 0) {
    return await wait().then(_checkExitCompleted);
  }
}

/**
 * Goes to the next step of the intro
 * @returns {Promise}
 */
const introJSNext = async() => {
  await click($('.introjs-nextbutton'));
  return await wait().then(_checkNextCompleted);
};

/**
 * Goes to the previous step of the intro
 * @returns {Promise}
 */
const introJSPrevious = async() => {
  await click($('.introjs-prevbutton'));
  return await wait().then(_checkNextCompleted);
};

/**
 * Exits the intro
 * @returns {Promise}
 */
const introJSExit = async() => {
  await click($('.introjs-skipbutton'));
  return await wait().then(_checkExitCompleted);
};

/**
 * Force exit of the intro
 * @returns {Promise}
 */
const introJSEnsureClosed = async() => {
  if (!introJS) {
    return await wait();
  }
  introJS.exit();
  return await wait().then(_checkExitCompleted);
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

export default {
  IntroJSComponent,
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep
};
