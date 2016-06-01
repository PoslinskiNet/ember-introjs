import Ember from 'ember';

var introJS = window.introJs;

var INTRO_JS_OPTIONS = [
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

var IntroJSComponent = Ember.Component.extend({

  setupIntroJS: Ember.observer('start-if', function(){
    Ember.run.scheduleOnce('afterRender', this, this.startIntroJS);
  }).on('didInsertElement'),

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
  introJSOptions: Ember.computed(
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
    'disable-interaction',
    'steps',

    function(){
      var camelize = Ember.String.camelize;
      var underscore = Ember.String.underscore;

      var options, normalizedName, value, options = {};

      for(var i = 0; i < INTRO_JS_OPTIONS.length; i++){
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

  startIntroJS: function(){
    var intro;
    var options = this.get('introJSOptions');

    if (!this.get('introJS')) {
      this._setIntroJS(introJS());
    }

    intro = this.get('introJS');

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

  registerCallbacksWithIntroJS: function(){
    var intro = this.get('introJS');

    intro.onbeforechange(Ember.run.bind(this, function(elementOfNewStep){
      var prevStep = this.get('currentStep');
      this._setCurrentStep(this.get('introJS._currentStep'));
      var nextStep = this.get('currentStep');

      this.sendAction('on-before-change', prevStep, nextStep, this, elementOfNewStep);
    }));

    intro.onchange(Ember.run.bind(this, function(targetElement){
      this.sendAction('on-change', this.get('currentStep'), this, targetElement);
    }));

    intro.onafterchange(Ember.run.bind(this, this._onAfterChange));

    intro.oncomplete(Ember.run.bind(this, function(){
      this.sendAction('on-complete', this.get('currentStep'));
    }));

    intro.onexit(Ember.run.bind(this, this._onExit));
  },

  _setIntroJS: function(introJS){
    this.set('introJS', introJS);
  },

  _onAfterChange: function(targetElement){
    this.sendAction('on-after-change', this.get('currentStep'), this, targetElement);
  },

  _onExit: function(){
    this.sendAction('on-exit', this.get('currentStep'), this);
  },

  exitIntroJS: Ember.on('willDestroyElement', function(){
    var intro = this.get('introJS');
    if (intro) {
      intro.exit();
    }
  }),

  _setCurrentStep: function(step){
    var stepObject = Ember.A(this.get('steps')).objectAt(step);
    this.set('currentStep', stepObject);
  }
});

export default IntroJSComponent;
