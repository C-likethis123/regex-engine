/** A class representing the * character specified by the user */
class _ZeroOrMore {
  constructor(repeatable) {
    this.repeatable = repeatable;
  }
}

function ZeroOrMore(repeatable) {
  return new _ZeroOrMore(repeatable);
}

module.exports = {_ZeroOrMore, ZeroOrMore};
