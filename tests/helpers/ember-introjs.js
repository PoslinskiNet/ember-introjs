import { on } from '@ember/object/evented';

import IntroJSComponent from 'ember-introjs/components/intro-js';
import { click } from '@ember/test-helpers';
import { wait } from './support'

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
  const overlay = document.querySelector('.introjs-overlay');

  if (overlay !== null) {
    return await wait();
  }
}

/**
 * Goes to the next step of the intro
 */
const introJSNext = async() => {
  const button = document.querySelector('.introjs-nextbutton');

  await click(button);
  return await _checkNextCompleted();
};

/**
 * Goes to the previous step of the intro
 */
const introJSPrevious = async() => {
  const button = document.querySelector('.introjs-prevbutton');

  await click(button);
  return await _checkNextCompleted();
};

/**
 * Exits the intro
 */
const introJSExit = async() => {
  const button = document.querySelector('.introjs-skipbutton');

  await click(button);
  return await _checkExitCompleted();
};

/**
 * Force exit of the intro
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
