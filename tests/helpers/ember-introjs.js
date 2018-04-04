import { on } from '@ember/object/evented';

import IntroJSComponent from 'ember-introjs/components/intro-js';
import { click, waitUntil } from '@ember/test-helpers';

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
    return await waitUntil(() => document.querySelectorAll('.introjs-overlay').length === 0);
  }
}

/**
* Skip the intro
*/
const introJSSkip = () => {
  return click(document.querySelector('.introjs-skipbutton'));
};

/**
 * Goes to the next step of the intro
 */
const introJSNext = async() => {
  await click(document.querySelector('.introjs-nextbutton'));
  return _checkNextCompleted();
};

/**
 * Goes to the previous step of the intro
 */
const introJSPrevious = async() => {
  await click(document.querySelector('.introjs-prevbutton'));
  return _checkNextCompleted();
};

/**
 * Exits the intro
 */
const introJSExit = async() => {
  await click(document.querySelector('.introjs-skipbutton'));
  return _checkExitCompleted();
};

/**
 * Force exit of the intro
 */
const introJSEnsureClosed = () => {
  if (introJS) {
    introJS.exit();
    return _checkExitCompleted();
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
  introJSSkip,
  introJSNext,
  introJSPrevious,
  introJSExit,
  introJSEnsureClosed,
  introJSCurrentStep,
  IntroJSComponent
};
