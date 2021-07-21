const {Or} = require('./index');

test('Throws a TypeError if Or class is initialized with a non array', () => {
  expect(() => Or('a')).toThrow(TypeError);
})
