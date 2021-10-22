import { sortPayload, countOccurrence } from 'ember-app/utils/array-utils';
import { module, test } from 'qunit';

module('Unit | Utility | array-utils');


test('when sortPayload is called with an array to sort string in ascending order', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Willow', age: 2, gender: 'f'},
    { name: 'Max', age: 1, gender: 'm'}
  ];

  sortPayload(mockArray, 'name', 'a');
  assert.equal(mockArray[0].name, 'Amy', 'then first array element is Amy');
  assert.equal(mockArray[1].name, 'Max', 'second array element is Max');
  assert.equal(mockArray[2].name, 'Willow', 'third array element is Willow');
});

test('when sortPayload is called with an array to sort string in descending order', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Willow', age: 2, gender: 'f'},
    { name: 'Max', age: 1, gender: 'm'}
  ];

  sortPayload(mockArray, 'name', 'd');
  assert.equal(mockArray[0].name, 'Willow', 'then first array element is Willow');
  assert.equal(mockArray[1].name, 'Max', 'second array element is Max');
  assert.equal(mockArray[2].name, 'Amy', 'third array element is Amy');
});


test('when sortPayload is called with an array to sort number in ascending order', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Willow', age: 2, gender: 'f'},
    { name: 'Max', age: 1, gender: 'm'}
  ];

  sortPayload(mockArray, 'age', 'a');
  assert.equal(mockArray[0].name, 'Max', 'then first array element is Max');
  assert.equal(mockArray[1].name, 'Willow', 'second array element is Willow');
  assert.equal(mockArray[2].name, 'Amy', 'third array element is Amy');
});

test('when sortPayload is called with an array to sort number in descending order', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Willow', age: 2, gender: 'f'},
    { name: 'Max', age: 1, gender: 'm'}
  ];

  sortPayload(mockArray, 'age', 'd');
  assert.equal(mockArray[0].name, 'Amy', 'then first array element is Amy');
  assert.equal(mockArray[1].name, 'Willow', 'second array element is Willow');
  assert.equal(mockArray[2].name, 'Max', 'third array element is Max');
});

test('when countOccurrence is called with an array to count name `Amy` occurences', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Amy', age: 2, gender: 'f'},
    { name: 'Max', age: 2, gender: 'm'}
  ];

  const nameCount = countOccurrence(mockArray, 'name', 'Amy');
  assert.equal(nameCount, 2, 'then it returns 2');
});

test('when countOccurrence is called with an array to count age `10` occurences', function(assert) {
  const mockArray = [
    { name: 'Amy', age: 10, gender: 'f'},
    { name: 'Amy', age: 2, gender: 'f'},
    { name: 'Max', age: 2, gender: 'm'}
  ];

  const nameCount = countOccurrence(mockArray, 'age', 10);
  assert.equal(nameCount, 1, 'then it returns 1');
});