/**
 * A collection of classes that represents regex patterns specified by the user
 */

class _Or {
  constructor(alternatives) {
    this.alternatives = alternatives;
  }
}

function Or(alternatives) {
  if (!(alternatives instanceof Array)) {
    throw new TypeError("Alternatives passed to Or must be an array");
  } else {
    return new _Or(alternatives);
  }
}

class _ZeroOrMore {
  constructor(repeatable) {
    this.repeatable = repeatable;
  }
}

function ZeroOrMore(repeatable) {
  return new _ZeroOrMore(repeatable);
}

const Any = Symbol('Any');
