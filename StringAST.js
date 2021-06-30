/**
 * A collection of classes that represents regex patterns specified by the user
 */

export class _Or {
  constructor(alternatives) {
    this.alternatives = alternatives;
  }
}

export function Or(alternatives) {
  if (!(alternatives instanceof Array)) {
    throw new TypeError("Alternatives passed to Or must be an array");
  } else {
    return new _Or(alternatives);
  }
}

export class _ZeroOrMore {
  constructor(repeatable) {
    this.repeatable = repeatable;
  }
}

export function ZeroOrMore(repeatable) {
  return new _ZeroOrMore(repeatable);
}

export const Any = Symbol('Any');
