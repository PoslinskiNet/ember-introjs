import Controller from '@ember/controller';

export default Controller.extend({
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
