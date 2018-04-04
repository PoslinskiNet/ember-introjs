import { expect } from 'chai';

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
  expect(actual, 'Assertion count').to.equal(expected);
};

export {
  assert,
  assertions,
  reset,
  check
}
