const parser = require('./Parser.js');

test('Parses regex of only characters into an array of character elements', () => {
  expect(parser.parse("abc")).toStrictEqual(["a", "b", "c"]);
});

test('Parses regex of character groups into arrays of letters', () => {
  expect(parser.parse("(abc)")).toStrictEqual([["a", "b", "c"]]);
  expect(parser.parse("(ab)c")).toStrictEqual([["a", "b"], "c"]);
  expect(parser.parse("a(bc)(cd)")).toStrictEqual(["a", ["b", "c"], ["c", "d"]]);
});

test('Parses regex with nested character groups', () => {
  expect(parser.parse("a(ba(ab))")).toStrictEqual(["a", ["b", "a", ["a", "b"]]]);
});

/* Testing OR */
const {Or} = require('../StringAST');
describe('Parses expressions with Or', () => {
  test('Parses a regex with an Or quantifier', () => {
    expect(parser.parse("a|c")).toEqual([Or([ "a", "c" ])]);
  });
  
  test('With character groups and individual characters', () => {
    expect(parser.parse("(ab)|c")).toEqual([Or([["a", "b"], "c"])]);
    expect(parser.parse("c|(ab)")).toEqual([Or(["c", ["a", "b"]])]);
    expect(parser.parse("c|ab")).toEqual([Or(["c", "a"]), "b"]);
  });
});

const {Any} = require("../StringAST");
/* Testing Any */
describe('Parses expressions with Any', () => {
  test('Only Any', () => {
    expect(parser.parse(".")).toStrictEqual([ Any ]);
    expect(parser.parse("..")).toStrictEqual([ Any, Any ]);
  });

  test('With Any and normal regex expressions', () => {
    expect(parser.parse("b.c")).toStrictEqual([ "b", Any, "c" ]);
  });

  test('With Any and nested regex expressions', () => {
    expect(parser.parse("b.c(ab.)")).toStrictEqual([ "b", Any, "c", [ "a", "b", Any ] ]);
  });
});


/** Testing ZeroOrMore */
describe('ZeroOrMore', () => {
  const {ZeroOrMore} = require("../StringAST");
  test('Only ZeroOrMore', () => {
    expect(parser.parse("a*")).toStrictEqual([ ZeroOrMore("a") ]);
    expect(parser.parse("abc*")).toStrictEqual([ "a", "b", ZeroOrMore("c") ]);
  });

  test('ZeroOrMore with character groups', () => {
    expect(parser.parse("(abc)*")).toStrictEqual([ ZeroOrMore(["a", "b", "c"]) ]);
    expect(parser.parse("(abc)*d")).toStrictEqual([ ZeroOrMore(["a", "b", "c"]), "d" ]);
  })

  test('ZeroOrMore with Any', () => {
    expect(parser.parse("a.*")).toStrictEqual([ "a", ZeroOrMore(Any) ]);
  });
});