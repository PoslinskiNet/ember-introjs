import { later, next, run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import sinon from 'sinon';
import { click } from '@ember/test-helpers';

describe('Integration | Component | intro js', function() {
  setupRenderingTest();

  beforeEach(function(){
    var html = `
    <div id="introjs-fixture">
      <div id="step1">
        Foo
      </div>
      <div id="step2">
        Bar
      </div>
    </div>
    `;
    $('body').append(html);
  });

  beforeEach(function(){
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function(){
    this.sandbox.restore();
  });

  // Wait for the overlay to close if it's open
  beforeEach(function(){
    return new EmberPromise((resolve) =>{
      var fn = () => {
        if ($('.introjs-overlay').length === 0) {
          resolve();
        } else {
          later(fn, 100);
        }
      };
      next(fn);
    });
  });

  afterEach(function(){
    $('#introjs-fixture').remove();
  });

  describe('start-if', function(){
    var steps;

    beforeEach(function(){
      steps = this.steps = [
        {
          element: '#step1',
          intro: 'Step 1'
        },
        {
          element: '#step2',
          intro: 'Step 2'
        }
      ];
    });

    describe('when start-if is falsy', function(){
      beforeEach(function(){
        this.component = this.subject({
          'start-if': false,
          steps: this.steps
        });
        this.render();
      });

      it('does not render the introjs component', function(){
        expect($('.introjs-overlay').length).to.equal(0);
      });

      describe('when start-if changes to truthy', function(){
        it('renders introJS', function(){
          run(this.component, 'set', 'start-if', true);

          expect($('.introjs-overlay').length).to.equal(1);
        });
      });
    });

    describe('when start-if is truthy', function(){
      it('works', function(){
        this.component = this.subject({
          'start-if': true,
          steps: this.steps
        });
        this.render();

        expect($('body').text()).to.include("Step 1");
      });

      describe('when start-if changes to falsy', function(){
        it('hides introJS', function(){
          this.clock = sinon.useFakeTimers();
          run(this.component, 'set', 'start-if', false);
          this.clock.tick(501);

          expect($('.introjs-overlay').length).to.equal(0);

          this.clock.restore();
        });
      });

      describe('when exiting', function(){
        it('fires the on-exit action', async function(){
          this.sandbox.stub(this.component, 'sendAction');
          await click('.introjs-skipbutton');

          expect(this.component.sendAction).to.have.been.calledWith(
            'on-exit',
            steps[0]
          );
        });
      });

      describe('when going to the next step', function(){
        beforeEach(async function(){
          this.sandbox.stub(this.component, 'sendAction');
          await click('.introjs-nextbutton');
        });

        it('fires the on-before-change action', function(){
          expect(this.component.sendAction).to.have.been.calledWith(
            'on-before-change',
            steps[0],
            steps[1],
            this.component,
            $('#step2')[0]
          );
        });

        it('fires the on-change action', function(){
          expect(this.component.sendAction).to.have.been.calledWith(
            'on-change',
            steps[1],
            this.component,
            $('#step2')[0]
          );
        });

        it('fires the on-after-change action', function(){
          expect(this.component.sendAction).to.have.been.calledWith(
            'on-after-change',
            steps[1],
            this.component,
            $('#step2')[0]
          );
        });

        describe('when completing', function(){
          it('fires the on-complete action', async function(){
            await click('.introjs-skipbutton');
            expect(this.component.sendAction).to.have.been.calledWith(
              'on-complete',
              steps[1]
            );
          });
        });
      });
    });
  });
});
