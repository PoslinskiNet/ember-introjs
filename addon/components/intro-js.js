import Ember from 'ember';

var introJS = window.introJs;

var IntroJSComponent = Ember.Component.extend({

  setupIntroJS: Ember.on('didInsertElement', function(){
    Ember.run.scheduleOnce('afterRender', this, this.startIntroJS);
  }),

  startIntroJS: function(){
    if (this.get('start-if')){
      this._setIntroJS(introJS());
      var intro = this.get('introJS');

      intro.setOptions({
        steps: this.get('steps')
      });

      this.registerCallbacksWithIntroJS();
      this._setCurrentStep(0);

      intro.start();
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
    this.get('introJS').exit();
  }),

  _setCurrentStep: function(step){
    var stepObject = Ember.A(this.get('steps')).objectAt(step);
    this.set('currentStep', stepObject);
  }
});

export default IntroJSComponent;
