const parser = require('./Parser.js');

test('Parses regex of only characters into an array of character elements', () => {
  expect(parser.parse("abc")).toStrictEqual(["a", "b", "c"]);
});

test('Parses regex of character groups into arrays of letters', () => {
  expect(parser.parse("(abc)")).toStrictEqual([["a", "b", "c"]]);
  expect(parser.parse("(ab)c")).toStrictEqual([["a", "b"], "c"]);
  expect(parser.parse("a(bc)(cd)")).toStrictEqual(["a", ["b", "c"], ["c", "d"]]);
});

