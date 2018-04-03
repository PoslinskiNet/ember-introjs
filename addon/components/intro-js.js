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

    intro.onbeforechange(bind(this, function(elementOfNewStep){
      let prevStep = this.get('currentStep');
      this._setCurrentStep(this.get('introJS._currentStep'));
      let nextStep = this.get('currentStep');

      this.sendAction('on-before-change', prevStep, nextStep, this, elementOfNewStep);
    }));

    intro.onchange(bind(this, function(targetElement){
      this.sendAction('on-change', this.get('currentStep'), this, targetElement);
    }));

    intro.onafterchange(bind(this, this._onAfterChange));

    intro.oncomplete(bind(this, function(){
      this.sendAction('on-complete', this.get('currentStep'));
    }));

    intro.onexit(bind(this, this._onExit));
  },

  _setIntroJS(introJS){
    this.set('introJS', introJS);
  },

  _onAfterChange(targetElement){
    this.sendAction('on-after-change', this.get('currentStep'), this, targetElement);
  },

  _onExit(){
    this.sendAction('on-exit', this.get('currentStep'), this);
  },

  willDestroyElement() {
    let intro = this.get('introJS');
    if (intro) {
      intro.exit();
    }

    this._super(...arguments);
  },

  _setCurrentStep(step){
    let stepObject = A(this.get('steps')).objectAt(step);
    this.set('currentStep', stepObject);
  }
});
