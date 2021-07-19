/**
 * A superclass representing a character in a Regex expression
 * All other types of Regex expressions will inherit from this base class
 */

class RegexpNode {
  derive(char) {
    return NeverMatches;
  }
  // tells us if we have matched the end
  matchEnd() {
    return false;
  }
  // tells us if we can continue matching
  canMatchMore() {
    return !this.matchEnd();
  }
}

const NeverMatches = new RegexpNode(); // unsuccessful match

/* A Singleton class representing an EmptyString.
 * When a Regexp expression reaches an EmptyString, it represents a successful match.
 */
class _EmptyString extends RegexpNode {
  matchEnd() {
    return true;
  }
}
const EmptyString = new _EmptyString(); // successful match

module.exports = {RegexpNode, NeverMatches, EmptyString};

