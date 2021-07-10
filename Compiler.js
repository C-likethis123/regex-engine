const {CharacterNode, RepetitionNode, AlternationNode, EmptyString, AnyCharacterNode, NeverMatches} = require('./RegexpNode.js');
const {_Or, _ZeroOrMore, Any} = require('./StringAST.js');

/**
 * The entry point for the compiler. It takes in literal strings and turns them into chains of character nodes.
 */

function isAlphabet(char) {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabets.includes(char);
}

function reverseCase(char) {
  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  }
  return char.toUpperCase();
}

function compileString(str, tail = EmptyString, isCaseInsensitive = false) {
  let reversedStr = Array.from(str).reverse();
  for (const char of reversedStr) {
    if (isAlphabet(char) && isCaseInsensitive) {
      tail = new AlternationNode([new CharacterNode(char, tail), new CharacterNode(reverseCase(char), tail)]);
    } else {
      tail = new CharacterNode(char, tail);
    }
  }
  return tail;
}

function compileArray(arr, tail = EmptyString, isCaseInsensitive = false) {
  for (let expr of arr.reverse()) {
    tail = compile(expr, tail, isCaseInsensitive);
  }
  return tail;
}

function compileOr(or, tail = EmptyString, isCaseInsensitive = false) {
  const compiledAlternatives = or.alternatives.map(
    alternative => compile(alternative, tail, isCaseInsensitive)
  );
  return new AlternationNode(compiledAlternatives);
}

function compileZeroOrMore(zeroOrMore, tail = EmptyString, isCaseInsensitive = false) {
  const repetition = new RepetitionNode(tail);
  const contents = compile(zeroOrMore.repeatable, repetition, isCaseInsensitive);
  repetition.head = contents;
  return repetition;
}

function compileAny(tail = EmptyString) {
  return new AnyCharacterNode(tail);
}

function compile(expr, tail = EmptyString, isCaseInsensitive = false) {
  if ((typeof expr) === 'string') {
    return compileString(expr, tail, isCaseInsensitive);
  } else if (expr instanceof Array) {
    return compileArray(expr, tail, isCaseInsensitive);
  } else if (expr instanceof _Or) {
    return compileOr(expr, tail, isCaseInsensitive);
  } else if (expr instanceof _ZeroOrMore) {
    return compileZeroOrMore(expr, tail, isCaseInsensitive);
  } else if (expr === Any) {
    return compileAny(tail);
  } else {
    throw new TypeError("Tried to compile something that is not a valid regexp");
  }
}

module.exports = {compile};
