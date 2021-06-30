import {CharacterNode, RepetitionNode, AlternationNode, EmptyString, AnyCharacterNode, NeverMatches} from './RegexpNode.js';
import {_Or, _ZeroOrMore, Or, ZeroOrMore, Any} from './StringAST.js';

/**
 * The entry point for the compiler. It takes in literal strings and turns them into chains of character nodes.
 */

function compileString(str, tail = EmptyString) {
  let reversedStr = Array.from(str).reverse();
  for (const char of reversedStr) {
    tail = new CharacterNode(char, tail);
  }
  return tail;
}

function compileArray(arr, tail = EmptyString) {
  for (let expr of arr.reverse()) {
    tail = compile(expr, tail);
  }
  return tail;
}

function compileOr(or, tail = EmptyString) {
  const compiledAlternatives = or.alternatives.map(
    alternative => compile(alternative, tail)
  );
  return new AlternationNode(compiledAlternatives);
}

function compileZeroOrMore(zeroOrMore, tail = EmptyString) {
  const repetition = new RepetitionNode(tail);
  const contents = compile(zeroOrMore.repeatable, repetition);
  repetition.head = contents;
  return repetition;
}

function compileAny(tail = EmptyString) {
  return new AnyCharacterNode(tail);
}

function compile(expr, tail = EmptyString) {
  if ((typeof expr) === 'string') {
    return compileString(expr, tail);
  } else if (expr instanceof Array) {
    return compileArray(expr, tail);
  } else if (expr instanceof _Or) {
    return compileOr(expr, tail);
  } else if (expr instanceof _ZeroOrMore) {
    return compileZeroOrMore(expr, tail);
  } else if (expr === Any) {
    return compileAny(tail);
  } else {
    throw new TypeError("Tried to compile something that is not a valid regexp");
  }
}

/**
 * Entry point for the compiler
 */
class RE {
  constructor(regexp) {
    this.start = compile(regexp);
  }

  match(str) {
    let state = this.start,
      chars = Array.from(str);
    if ((chars.length === 0) && (state === EmptyString)) {
      return true;
    }
    for (let i = 0; i < chars.length; i++) {
      let char = chars[i];
      state = state.derive(char);
      if (state === EmptyString) {
        if (i === chars.length - 1) {
          return true;
        } else {
          return false;
        }
      } else if (state === NeverMatches) {
        return false;
      }
    }
    return false;

  }
}

console.log(new RE(["a", Or(["a", "b"]), "d"]).match("abd")); //=> true
console.log(new RE(["a", Or(["a", "b"]), "d"]).match("aed")); //=> false
console.log(new RE([ZeroOrMore("abc"), "d"]).match("d")); //=> true
