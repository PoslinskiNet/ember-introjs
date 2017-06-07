import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Integration | Component | Step', function() {
  setupComponentTest('intro-js/step');

  describe('step', function() {
    it('does render with 0 as default', function(){
      this.render();

      expect(this.$().attr('data-step')).to.equal('0');
    });

    it('does render with a custom value', function(){
      this.subject({ step: 4 });
      this.render();

      expect(this.$().attr('data-step')).to.equal('4');
    });
  });

  describe('intro', function() {
    it('does render with a custom value', function(){
      this.subject({ intro: 'My text' });
      this.render();

      expect(this.$().attr('data-intro')).to.equal('My text');
    });
  });

  describe('tooltipClass', function() {
    it('does render with a custom value', function(){
      this.subject({ tooltipClass: 'my-class' });
      this.render();

      expect(this.$().attr('data-tooltipClass')).to.equal('my-class');
    });
  });

  describe('highlightClass', function() {
    it('does render with a custom value', function(){
      this.subject({ highlightClass: 'my-class' });
      this.render();

      expect(this.$().attr('data-highlightClass')).to.equal('my-class');
    });
  });

  describe('position', function() {
    it('does render with bottom as default', function(){
      this.render();

      expect(this.$().attr('data-position')).to.equal('bottom');
    });

    it('does render with a custom value', function(){
      this.subject({ position: 'top' });
      this.render();

      expect(this.$().attr('data-position')).to.equal('top');
    });
  });

  describe('hint', function() {
    it('does render with a custom value', function(){
      this.subject({ hint: 'My text' });
      this.render();

      expect(this.$().attr('data-hint')).to.equal('My text');
    });
  });

  describe('hintPosition', function() {
    it('does render with top-middle as default', function(){
      this.render();

      expect(this.$().attr('data-hintPosition')).to.equal('top-middle');
    });

    it('does render with a custom value', function(){
      this.subject({ hintPosition: 'top' });
      this.render();

      expect(this.$().attr('data-hintPosition')).to.equal('top');
    });
  });
});
