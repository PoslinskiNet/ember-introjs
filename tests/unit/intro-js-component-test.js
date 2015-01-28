import {
  describeComponent,
  it
} from 'ember-mocha';
import Ember from 'ember';

var introJS = window.introJs;

describeComponent('intro-js', 'IntroJSComponent', function(){

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

  // Wait for the overlay to close if it's open
  beforeEach(function(){
    return new Ember.RSVP.Promise((resolve, reject) =>{
      var fn = () => {
        if ($('.introjs-overlay').length === 0) {
          resolve();
        } else {
          Ember.run.later(fn, 100);
        }
      };
      Ember.run.next(fn);
    });
  });

  afterEach(function(){
    $('#introjs-fixture').remove();
  });

  describe('when start-if is truthy', function(){
    var steps;

    beforeEach(function(){
      steps = [
        {
          element: '#step1',
          intro: 'Step 1'
        },
        {
          element: '#step2',
          intro: 'Step 2'
        }
      ];
      this.component = this.subject({
        'start-if': true,
        steps: steps
      });
      this.render();
    });

    it('works', function(){
      expect($('body').text()).to.include("Step 1");
    });

    describe('when exiting', function(){

      beforeEach(function(){
        this.sandbox.stub(this.component, 'sendAction');
        $('.introjs-skipbutton').click();
      });

      it('fires the on-exit action', function(){
        expect(this.component.sendAction).to.have.been.calledWith(
          'on-exit',
          steps[0]
        );
      });
    });

    describe('when going to the next step', function(){
      beforeEach(function(){
        this.sandbox.stub(this.component, 'sendAction');
        $('.introjs-nextbutton').click();
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

        beforeEach(function(){
          $('.introjs-skipbutton').click();
        });

        it('fires the on-complete action', function(){
          expect(this.component.sendAction).to.have.been.calledWith(
            'on-complete',
            steps[1]
          );
        });
      });
    });
  });

});
