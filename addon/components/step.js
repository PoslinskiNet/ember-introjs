import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  // Optionally define the number (priority) of step
  step: 0,

  // The tooltip text of step
  intro: null,

  // Optionally define a CSS class for tooltip
  tooltipClass: null,

  // Optionally append a CSS class to the helperLayer
  highlightClass: null,

  // Optionally define the position of tooltip, top, left, right,
  // bottom, bottom-left-aligned (same as bottom), bottom-middle-aligned,
  // bottom-right-aligned or auto (to detect the position of element
  // and assign the correct position automatically). Default is bottom
  position: 'bottom',

  // The tooltip text of hint
  hint: null,

  // Optionally define the position of hint. Options: top-middle, top-left,
  // top-right, bottom-left, bottom-right, bottom-middle,
  // middle-left, middle-right, middle-middle. Default: top-middle
  hintPosition: 'top-middle',

  // PRIVATE interface - INTRO JS implementation

  attributeBindings: [
    'data-step',
    'data-intro',
    'data-position',
    'data-tooltipClass',
    'data-highlightClass',
    'data-hint',
    'data-hintPosition'
  ],

  'data-step': computed.readOnly('step'),

  'data-hint': computed.readOnly('hint'),
  'data-intro': computed.readOnly('intro'),

  'data-tooltipClass': computed.readOnly('tooltipClass'),
  'data-highlightClass': computed.readOnly('highlightClass'),

  'data-position': computed.readOnly('position'),
  'data-hintPosition': computed.readOnly('hintPosition'),
});
