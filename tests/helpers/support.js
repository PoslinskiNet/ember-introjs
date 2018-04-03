// animations helper
const wait = () => new Promise((resolve) => { setTimeout(() => resolve(), 500) });

// https://github.com/mochajs/mocha/wiki/HOW-TO:-Count-assertions
let expected = 0;
let actual = 0;

const assert = (expr, msg) => {
  if (!expr) throw new Error(msg || 'assertion failed');
  actual++;
};

const assertions = (n) => {
  expected = n;
};

const reset = () => {
  expected = 0;
  actual = 0;
};

const check = () => {
  if (!expected || expected == actual) return;
  let err = new Error('expected ' + expected + ' assertions, got ' + actual);
  this.currentTest.emit('error', err);
};


export {
  wait,
  assert,
  assertions,
  reset,
  check
}
