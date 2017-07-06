var assert = require('chai').assert;
var enumerators = require('../enumerators');
var input = [1, 2, 3, 2]

describe('each', function() {
  it('Returns the original array', function() {
    var eleCount = {};

    var returnValue = enumerators.each(input, function(num) {
      eleCount[num] = eleCount[num] + 1 || 1;
    });

    assert.equal(returnValue, input);
  });

  it('Executes the provided callback on each element of the input array', function() {
    var eleCount = {};

    enumerators.each(input, function(num) {
      eleCount[num] = eleCount[num] + 1 || 1;
    });

    assert.deepEqual(eleCount, { 1: 1, 2: 2, 3: 1 })
  });
});

describe('map', function() {
  it('Does not modify the original array', function() {
    var returnValue = enumerators.map(input, function(num) {
      return num * 2;
    });

    assert.deepEqual(input, [1, 2, 3, 2])
  });

  it('Returns a modified array', function() {
    var returnValue = enumerators.map(input, function(num) {
      return num * 2;
    });

    assert.deepEqual(returnValue, [2, 4, 6, 4]);
  });
});

describe('select', function() {
  it('Does not modify the original array', function() {
    var returnValue = enumerators.select(input, function(num) {
      return num === 2;
    });

    assert.deepEqual(input, [1, 2, 3, 2])
  });

  it('Returns a modified array', function() {
    var returnValue = enumerators.select(input, function(num) {
      return num === 2;
    });

    assert.deepEqual(returnValue, [2, 2]);
  });
});

describe('all', function() {
  it('Does not modify the original array', function() {
    var returnValue = enumerators.all(input, function(num) {
      return num === 2;
    });

    assert.deepEqual(input, [1, 2, 3, 2])
  });

  it('Returns true if all elements in the array pass the test', function() {
    var allIntegers = enumerators.all(input, function(num) {
      return typeof num === 'integer';
    });

    assert.equal(allIntegers, true);
  });

  it('Returns false if any element fails the provided test', function() {
    var allEven = enumerators.all(input, function(num) {
      return num % 2 === 0;
    });

    assert.equal(allEven, false);
  });
});

describe('some', function() {
  it('Does not modify the original array', function() {
    var returnValue = enumerators.some(input, function(num) {
      return num === 2;
    });

    assert.deepEqual(input, [1, 2, 3, 2])
  });

  it('Returns true if any elements in the array pass the test', function() {
    var fourPresent = enumerators.some(input, function(num) {
      return num === 4;
    });

    assert.equal(fourPresent, true)
  });

  it('Returns false if all elements fail the provided test', function() {
    var greaterThanFivePresent = enumerators.some(input, function(num) {
      return num > 5;
    });

    assert.equal(greaterThanFivePresent, false);
  });
});

describe('reduce', function() {
  it('Does not modify the original array', function() {
    var returnValue = enumerators.reduce(input, function(num) {
      return num === 2;
    });

    assert.deepEqual(input, [1, 2, 3, 2])
  });

  it('Returns whatever you tell it', function() {
    var sum = enumerators.reduce(input, function(memo, num) {
      return memo + num;
    });

    assert.equal(sum, 8);

    var convertedToString = enumerators.reduce(input, function(memo, num) {
      return String(memo) + String(num);
    });

    assert.equal(convertedToString, '1232');
  });

  it('Takes an optional initialization argument', function() {
    var numWasEven = enumerators.reduce(input, function(memo, num) {
      memo.push(num % 2 === 0);
      return memo;
    }, []); // <- Optional 3rd argument here (An empty array)

    assert.equal(numWasEven, [false, true, false, true])
  });
});

// Bonus points:
// Find other Ruby enumerables to rewrite in JS (Consider `none`, `filter`, `reverse` or `first`);
// Modify these enumerables so the callback can take an additional, optional paramater that gives access to the index position of the current element
// Add these methods to the Array.prototype so you can call them on any array
