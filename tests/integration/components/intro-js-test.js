import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { introJSNext, introJSSkip } from './../../helpers/ember-introjs'
import{ assert, assertions, reset, check } from './../../helpers/chai-assertions';

describe('Integration | Component | intro js', function() {
  setupRenderingTest();

  beforeEach(reset);
  afterEach(check);

  beforeEach(function(){
    const fixture = document.createElement('div');
    fixture.innerHTML = `
      <div id="introjs-fixture">
        <div id="step1">Foo</div>
        <div id="step2">Bar</div>
      </div>
    `;

    this.element.appendChild(fixture);

    const steps = [
      {
        element: '#step1',
        intro: 'Step 1'
      },
      {
        element: '#step2',
        intro: 'Step 2'
      }
    ];

    this.set('fixture', fixture);
    this.set('steps', steps);
  });

  afterEach(function(){
    if (this.element) {
      this.element.removeChild(this.element.lastChild);
    }
  });

  describe('start-if', function(){
    it('when start-if is falsy does not render the introjs component', async function(){
      assertions(1);

      this.set('startIf', false);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);

      assert(() => {
        expect(document.querySelector('.introjs-overlay')).to.equal(null)
      });
    });

    it('when start-if changes to truthy renders introJS', async function(){
      assertions(2);

      this.set('startIf', false);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);

      assert(() => {
        expect(document.querySelector('.introjs-overlay')).to.equal(null)
      });

      this.set('startIf', true);

      assert(() => {
        expect(document.querySelector('.introjs-overlay')).to.be.ok
      });
    });

    it('when start-if changes to falsy hides introJS', async function(){
      assertions(1);

      this.set('startIf', true);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);

      this.set('startIf', false);

      await waitUntil(() => document.querySelectorAll('.introjs-overlay').length === 0);

      assert(() => {
        expect(document.querySelector('.introjs-overlay')).to.equal(null)
      });
    });
  });

  describe('when exiting', function(){
    it('fires the on-exit action', async function(){
      assertions(2);

      this.set('myExit', (step) => {
        assert(() => {
          expect(step).to.equal(this.steps[0])
        });
      })

      await render(hbs`{{intro-js steps=steps start-if=true on-exit=(action myExit)}}`);

      await introJSSkip();
    });
  });

  describe('when completing', function(){
    it('fires the on-complete action', async function(){
      assertions(1);

      this.set('myComplete', (step) => {
        assert(() => {
          expect(step).to.equal(this.steps[1])
        });
      })

      await render(hbs`{{intro-js steps=steps start-if=true on-complete=(action myComplete)}}`);

      await introJSNext();

      await introJSSkip();
    });
  });

  describe('when going to the next step', function(){
    it('fires the on-before-change action', async function(){
      assertions(1);

      this.set('beforeChange', (currentStep, nextStep, component, step2) => {
        let introJsComponent = this.owner.lookup('component:intro-js');

        assert(() => {
          expect(currentStep).to.equal(this.steps[0]);
          expect(nextStep).to.equal(this.steps[1]);
          expect(component).to.equal(introJsComponent);
          expect(step2).to.equal(this.steps[0].intro);
        })
      })

      await render(hbs`{{intro-js steps=steps start-if=true on-before-change=(action beforeChange)}}`);

      await introJSSkip();
    });
  });

  describe('when going to the next step', function(){
    it('fires the on-after-change action', async function(){
      assertions(1);

      this.set('afterChange', (nextStep, component, step2) => {
        let introJsComponent = this.owner.lookup('component:intro-js');

        assert(() => {
          expect(nextStep).to.equal(this.steps[1]);
          expect(component).to.equal(introJsComponent);
          expect(step2).to.equal(this.steps[0].intro);
        })
      })

      await render(hbs`{{intro-js steps=steps start-if=true on-after-change=(action afterChange)}}`);

      await introJSSkip();
    });
  });

  describe('when going to the next step', function(){
    it('fires the on-change action', async function(){
      assertions(1);

      this.set('onChange', (nextStep, component, step2) => {
        let introJsComponent = this.owner.lookup('component:intro-js');

        assert(() => {
          expect(nextStep).to.equal(this.steps[1]);
          expect(component).to.equal(introJsComponent);
          expect(step2).to.equal(this.steps[0].intro);
        })
      })

      await render(hbs`{{intro-js steps=steps start-if=true on-change=(action onChange)}}`);

      await introJSSkip();
    });
  });
});
