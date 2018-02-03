import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  steps: computed(function() {
    return [
      {
        intro: 'Step 1!',
        element: '#step1'
      },
      {
        intro: 'Step 2!',
        element: '#step2'
      }
    ];
  })
});
