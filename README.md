<p align="center">
  <img src="https://raw.githubusercontent.com/PoslinskiNet/ember-introjs/master/ember-introjs.png" alt="Ember Custom Actions Logo" width="100%">
</p>

[![Build Status](https://api.travis-ci.org/PoslinskiNet/ember-introjs.svg?branch=master)](http://travis-ci.org/PoslinskiNet/ember-introjs)

Ember IntroJS wraps [introjs][intro-js] in an Ember Component to guide
users through your app.

## Installation

`ember install ember-introjs`

## Usage

### 1. Declare your steps:
- You can declare an array in JavaScript in your controller or parent component:

```javascript
// app/controllers/ticket.js
import Ember from 'ember';

export default Ember.Controller.extend({
  steps: Ember.computed(function(){
    return [
      {
        element: $('#step1'),
        intro: 'Step 1!'
      },
      {
        element: $('#step2'),
        intro: 'Step2!'
      }
    ];
  })
});
```
#### 2. Use `intro-js/step` component as a wrapper

```hbs
{{#intro-js/step step=1 intro="Step Component"}}
  <h1>Hello!</h1>
{{/intro-js/step}}
```
You can customize wrapper using:
- `position="top"`
- `intro="Welcome!"`
- `tooltipClass="tooltip-class"`
- `highlightClass="highlight-class"`
- `position="top"`
- `hint="Use it :)"`
- `hintPosition="bottom-left"`

Options are documented in the code as well as in [IntroJS Docs](http://introjs.com/docs)

### 2. User `intro-js` component
Then to use the steps, you can use the steps in your handlebars
template:

```handlebars
{{! app/templates/ticket }}
{{intro-js start-if=true}}
```

## Action Hooks

IntroJS supports a series of hooks for getting notified for when users
switch between steps or exit. You can subscribe to these actions using
the typical `actions` hash in your Route or Controller:

```javascript
// app/routes/ticket.js
import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    introBeforeChange: function(previousStep, nextStep, introJSComponent,
elementOfNewStep){
      // You could track user interactions here, e.g. analytics.
      this.sendAnalytics(prevStep);
    }
  }
});
```

Then pass the name of the action in the handlebars helper that renders
the component below.

```handlebars
{{intro-js steps=steps start-if=true on-before-change="introBeforeChange"}}
```

### on-before-change (currentStep, nextStep, introJSComponent, nextElement)

Called when the user clicks next (or uses their keyboard). Called before
`on-change`. Given the currentStep, the nextStep, the introJSComponent,
and the DOM element of the next step.

### on-change (step, introJSComponent, currentElement)

Called after `on-before-change` when the user moves a step (backwards or
forward) in the introduction. Gives the current step, the introJS
component isntance, and the element of the current step.

### on-after-change (step, introJSComponent, currentElement)

Called after `on-change` when the user moves a step (backwards or
forward) in the introduction. Gives the current step, the introJS
component isntance, and the element of the current step.

### on-exit (step, introJSComponent)

Called when the user quits the intro via the "Skip" button, hitting
`escape`, or clicking outside the overlay. Given the current step, and
the introJS component.

### on-complete (step, introJSComponent)

Called when the user finishes the intro by clicking "Done" or hitting
right on the keyboard until the end. Called with the last step and the
introJS component instance.

## Intro JS Options

Intro JS has a variety of options available to it. You can see the full
list [here](https://github.com/usablica/intro.js#options), but we also
provided the full list below. You'll notice that in the list below
options all follow the dasherized convention of HTML and ember-cli
filenames. The original list uses camelCase names, and so does IntroJS.
Ember IntroJS will do the conversion for you.

You can also set other options using the Handlebars helper syntax:
`
```handlebars
{{intro-js steps=steps show-bullets=true}}
```

Or you could extend your own base class to override defaults
instead of specifying them every time in the Handlebars helper:

```javascript
myapp/app/components/my-intro-js.js
import IntroJSComponent from 'ember-introjs/components/intro-js';

export default IntroJSComponent.extend({
  'exit-on-esc': true
});
```

You can also reopen the class:

```javascript
import IntroJSComponent from 'ember-introjs/components/intro-js';

IntroJSComponent.reopen({
  'exit-on-esc': true
});
```

 - `steps`: For defining steps using JSON configuration (see
   [this](https://github.com/usablica/intro.js/blob/master/example/programmatic/index.html)
example)
 - `next-label`: Next button label
 - `prev-label`: Previous button label
 - `skip-label`: Skip button label
 - `done-label`: Done button label
 - `tooltip-position`: Default tooltip position
 - `tooltip-class`: Adding CSS class to all tooltips
 - `highlight-class`: Additional CSS class for the helperLayer
 - `exit-on-esc`: Exit introduction when pressing Escape button, `true` or
   `false`
 - `exit-on-overlay-click`: Exit introduction when clicking on overlay
   layer, `true` or `false`
 - `show-step-numbers`: Show steps number in the red circle or not, `true`
   or `false`
 - `keyboard-navigation`: Navigating with keyboard or not, `true` or
   `false`
 - `show-buttons`: Show introduction navigation buttons or not, `true` or
   `false`
 - `show-bullets`: Show introduction bullets or not, `true` or `false`
 - `show-progress`: Show introduction progress or not, `true` or `false`
 - `scroll-to-element`: Auto scroll to highlighted element if it's outside
   of viewport, `true` or `false`
 - `overlay-opacity`: Adjust the overlay opacity, `Number`
 - `disable-interaction`: Disable an interaction inside element or not,
   `true` or `false`

See
[setOption](https://github.com/usablica/intro.js/#introjssetoptionoption-value)
to see an example.

### Testing Helpers

Ember IntroJS comes with a set of testing helpers.

To use them, first import them in your `tests/test-helper.js` file:

```javascript
// tests/test-helpers.js

import './helpers/ember-introjs';
```

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## LICENSE

See the LICENSE file included in this repository.

Keep in mind that if you like to use Intro.JS for commercial use, you should buy a commercial license. You can find more information on the link bellow:

<!-- Links -->
[intro-js]: https://github.com/usablica/intro.js/
[hooks]: https://github.com/usablica/intro.js#introjsstart


## Code of Conduct
Please note that this project is released with a Contributor Code of
Conduct. By participating in this project you agree to abide by its
terms, which can be found in the `CODE_OF_CONDUCT.md` file in this
repository.
