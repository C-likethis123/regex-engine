const {RE} = require('./RE.js');
const {Or, ZeroOrMore, Any} = require('./StringAST');
const {Flags} = require("./Flag.js");

/* Base case: 'ab' matches 'ab' */
test('A string matches its regex representation', () => {
  expect(new RE(["a"]).match("a")).toBe(true);
  expect(new RE(["a", "b"]).match("ab")).toBe(true);

});

test('Character groupings match', () => {
  expect(new RE([["a", "b"], "c"]).match("abc")).toBe(true);
});

test('A string with an OR operator matches all possible sequences', () => {
  const regex = new RE(["a", Or(["a", "b"]), "d"]);
  expect(regex.match("abd")).toBe(true);
  expect(regex.match("aad")).toBe(true);
  expect(regex.match("d")).toBe(false);
});

test('A string with a ZeroOrMore operator matches any number of sequences', () => {
  const regex = new RE(["a", ZeroOrMore("b"), "c"]);
  expect(regex.match("abc")).toBe(true);
  expect(regex.match("ac")).toBe(true);
  expect(regex.match("abbc")).toBe(true);
});


test('Represent a regex sequence with ZeroOrMore as an array', () => {
  const regex = new RE([ZeroOrMore(["b", "c"])]);
  expect(regex.match("bc")).toBe(true);
  expect(regex.match("bcbc")).toBe(true);
  expect(regex.match("ac")).toBe(false);
  expect(regex.match("ccbb")).toBe(false);
});

test('ZeroOrMore operator matches quantifiers', () => {
  const regex = new RE([ZeroOrMore(Any)]);
  expect(regex.match("a")).toBe(true);
  expect(regex.match("aaaa")).toBe(true);
  expect(regex.match("ab")).toBe(true);
});

test('An empty sequence should not be matched', () => {
  const emptyRegex = new RE([Any]);
  expect(emptyRegex.match("")).toBe(false);
});

/** RepetitionNode */
test('A string with one repeated sequence should match', () => {
  const regex = new RE(["a", ZeroOrMore(["a", "b", "c"]), "d"]);
  expect(regex.match("aabcd")).toBe(true);
  expect(regex.match("ad")).toBe(true);
  expect(regex.match("aabcabcd")).toBe(true);

  expect(regex.match("aabd")).toBe(false);
});

describe('Testing with case insensitive mode works', () => {
  test('Regex matches test strings with lower and uppercases', () => {
    const regex = new RE(["a"], {[Flags.CASE_INSENSITIVE]: true});
    expect(regex.match("A")).toBe(true);
    expect(regex.match("a")).toBe(true);
  });

  test("Regex with OR operator matches insensitive mode", () => {
    const regex = new RE(["a", Or(["B", "C"])], {[Flags.CASE_INSENSITIVE]: true});
    expect(regex.match("aB")).toBe(true);
    expect(regex.match("ab")).toBe(true);
    expect(regex.match("ac")).toBe(true);
    expect(regex.match("aC")).toBe(true);
  });
});

describe('Invalid regex', () => {
  test('Throwing a type error', () => {
    const invalidRegex = () => new RE([1]);
    expect(invalidRegex).toThrow(TypeError);
  });
});
