const {ZeroOrMore} = require('./StringAST');

test('Throws a TypeError if ZeroOrMore function is initialized with a non string', () => {
  expect(() => ZeroOrMore(1)).toThrow(TypeError);
})
