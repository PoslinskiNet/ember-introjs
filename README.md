# Ember-IntroJS

Ember IntroJS wraps [introjs][intro-js] in an Ember Component to guide
users through your app.

## Installation

`ember install npm:ember-introjs`
`bower install`

## Usage

To declare your steps, you need to declare an array in JavaScript in
your Controller:

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

Then to use the steps, you can use the steps in your handlebars
template:

```handlebars
{{! app/templates/ticket }}
{{intro-js steps=steps start-if=true}}
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

### Testing Helpers

Ember IntroJS comes with a set of testing helpers.

To use them, first import them in your `tests/test-helper.js` file:

```javascript
// tests/test-helpers.js

import 'ember-introjs/helpers';
```

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## LICENSE

See the LICENSE file included in this repository.

<!-- Links -->
[intro-js]: https://github.com/usablica/intro.js/
[hooks]: https://github.com/usablica/intro.js#introjsstart
