/** A class representing the * character specified by the user */
class _ZeroOrMore {
  constructor(repeatable) {
    this.repeatable = repeatable;
  }
}

function ZeroOrMore(repeatable) {
  if (typeof repeatable !== 'string') {
    throw new TypeError("Value passed to ZeroOrMore must be a string");
  }
  return new _ZeroOrMore(repeatable);
}

module.exports = {_ZeroOrMore, ZeroOrMore};
