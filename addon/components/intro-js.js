import { A } from '@ember/array';
import { camelize, underscore } from '@ember/string';
import { scheduleOnce, bind } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import introJS from 'intro-js'

let INTRO_JS_OPTIONS = [
  'next-label',
  'prev-label',
  'skip-label',
  'done-label',
  'tooltip-position',
  'tooltip-class',
  'highlightClass',
  'exit-on-esc',
  'exit-on-overlay-click',
  'show-step-numbers',
  'show-step-numbers',
  'keyboard-navigation',
  'show-buttons',
  'show-bullets',
  'show-progress',
  'scroll-to-element',
  'overlay-opacity',
  'disable-interaction'
];

export default Component.extend({

  setupIntroJS: on('didInsertElement', observer('start-if', function() {
    scheduleOnce('afterRender', this, this.startIntroJS);
  })),

  /**
   * Options passed to IntroJS. You can specify the options when using the
   * Handlebars helper:
   *
   * ```handlebars
   * {{intro-js steps=steps show-bullets=true}}
   * ```
   *
   * Or you could extend your own base class to override defaults
   * instead of specifying them every time in the Handlebars helper:
   *
   * ```javascript
   * myapp/app/components/my-intro-js.js
   *
   * import IntroJSComponent from 'ember-introjs/components/intro-js';
   *
   * export default IntroJSComponent.extend({
   *   'exit-on-esc': true
   * });
   * ```
   *
   * You can also reopen the class:
   *
   * ```javascript
   * import IntroJSComponent from 'ember-introjs/components/intro-js';
   *
   * IntroJSComponent.reopen({
   *   'exit-on-esc': true
   * });
   * ```
   *
   * @property
  */
  introJSOptions: computed(
    'next-label',
    'prev-label',
    'skip-label',
    'done-label',
    'tooltip-position',
    'tooltip-class',
    'highlightClass',
    'exit-on-esc',
    'exit-on-overlay-click',
    'show-step-numbers',
    'keyboard-navigation',
    'show-buttons',
    'show-bullets',
    'show-progress',
    'scroll-to-element',
    'overlay-opacity',
    'disable-interaction',
    'steps',

    function(){
      let option, normalizedName, value, options = {};

      for(let i = 0; i < INTRO_JS_OPTIONS.length; i++){
        option = INTRO_JS_OPTIONS[i];
        normalizedName = camelize(underscore(option));
        value = this.get(option);

        if (value !== null && value !== undefined) {
          options[normalizedName] = value;
        }
      }

      options.steps = this.get('steps');

      return options;
    }
  ),

  willDestroyElement() {
    let intro = this.get('introJS');
    if (intro) {
      intro.exit();
    }

    this._super(...arguments);
  },

  startIntroJS(){
    if (!this.get('introJS')) {
      this._setIntroJS(introJS());
    }
    let intro = this.get('introJS');
    let options = this.get('introJSOptions');

    if (this.get('start-if')){
      intro.setOptions(options);
      this.registerCallbacksWithIntroJS();
      this._setCurrentStep(0);

      intro.start();
    } else {
      intro.exit();
      this._setIntroJS(null);
    }
  },

  registerCallbacksWithIntroJS(){
    let intro = this.get('introJS');

    intro.onbeforechange(bind(this, this._onBeforeChange));
    intro.onchange(bind(this, this._onChange));
    intro.onafterchange(bind(this, this._onAfterChange));
    intro.oncomplete(bind(this, this._onComplete));
    intro.onexit(bind(this, this._onExit));
    intro.onskip(bind(this, this._onSkip));
  },

  _setIntroJS(introJS){
    this.set('introJS', introJS);
  },

  _sendAction(action, args) {
    if (this.get(action)) {
      this.get(action)(...args);
    }
  },

  _onBeforeChange(elementOfNewStep) {
    let prevStep = this.get('currentStep');
    let currentStepIndex = this.get('introJS._currentStep');
    this._setCurrentStep(currentStepIndex);
    let nextStep = this._getStep(++currentStepIndex);

    this._sendAction('on-before-change', [prevStep, nextStep, this, elementOfNewStep]);
  },

  _onChange(targetElement) {
    this._sendAction('on-change', [this._getNextStep(), this, targetElement]);
  },

  _onAfterChange(targetElement){
    this._sendAction('on-after-change', [this._getNextStep(), this, targetElement]);
  },

  _onExit(){
    this._sendAction('on-exit', [this.get('currentStep'), this]);
  },

  _onSkip(){
    this._sendAction('on-skip', [this.get('currentStep'), this]);
  },

  _onComplete() {
    this._sendAction('on-complete', [this.get('currentStep')]);
  },

  _setCurrentStep(step){
    this.set('currentStep', this._getStep(step));
  },

  _getNextStep() {
    return this._getStep(this.get('introJS._currentStep') + 1);
  },

  _getStep(step) {
    return A(this.get('steps')).objectAt(step);
  }
});
