import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | intro js', function() {
  setupRenderingTest();

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
      this.set('startIf', false);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);

      expect(document.querySelector('.introjs-overlay')).to.equal(null);
    });

    it('when start-if changes to truthy renders introJS', async function(){
      this.set('startIf', false);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);
      expect(document.querySelector('.introjs-overlay')).to.equal(null);

      this.set('startIf', true);
      expect(document.querySelector('.introjs-overlay')).to.be.ok;
    });

    it('when start-if changes to falsy hides introJS', async function(){
      this.set('startIf', true);

      await render(hbs`{{intro-js steps=steps start-if=startIf}}`);
      this.set('startIf', false);

      // TODO: hack for animation
      await new Promise((resolve) => { setTimeout(() => resolve(), 500) });

      expect(document.querySelector('.introjs-overlay')).to.equal(null);
    });

    // describe('when start-if is truthy', function(){
      // describe('when exiting', function(){
      //   it('fires the on-exit action', async function(){
      //     sinon.sandbox.create().stub(this.component, 'sendAction');
      //     await click('.introjs-skipbutton');
      //
      //     expect(this.component.sendAction).to.have.been.calledWith(
      //       'on-exit',
      //       this.steps[0]
      //     );
      //   });
      // });

      // describe('when going to the next step', function(){
      //   beforeEach(async function(){
      //     sinon.sandbox.create().stub(this.component, 'sendAction');
      //     await click('.introjs-nextbutton');
      //   });
      //
      //   it('fires the on-before-change action', function(){
      //     expect(this.component.sendAction).to.have.been.calledWith(
      //       'on-before-change',
      //       this.steps[0],
      //       this.steps[1],
      //       this.component,
      //       $('#step2')[0]
      //     );
      //   });
      //
      //   it('fires the on-change action', function(){
      //     expect(this.component.sendAction).to.have.been.calledWith(
      //       'on-change',
      //       this.steps[1],
      //       this.component,
      //       $('#step2')[0]
      //     );
      //   });
      //
      //   it('fires the on-after-change action', function(){
      //     expect(this.component.sendAction).to.have.been.calledWith(
      //       'on-after-change',
      //       this.steps[1],
      //       this.component,
      //       $('#step2')[0]
      //     );
      //   });
      //
      //   describe('when completing', function(){
      //     it('fires the on-complete action', async function(){
      //       await click('.introjs-skipbutton');
      //       expect(this.component.sendAction).to.have.been.calledWith(
      //         'on-complete',
      //         this.steps[1]
      //       );
      //     });
      //   });
      // });
    // });
  });
});
