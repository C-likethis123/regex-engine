const parser = require('./Parser.js');

test('Parses regex of only characters into an array of character elements', () => {
  expect(parser.parse("abc")).toStrictEqual(["a", "b", "c"]);
});
