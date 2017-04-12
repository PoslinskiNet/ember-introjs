import Ember from 'ember';

export default Ember.Controller.extend({
  steps: [
    {
      intro: 'Step 1!',
      element: '#step1'
    },
    {
      intro: 'Step 2!',
      element: '#step2'
    }
  ]
});
