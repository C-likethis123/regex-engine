const {RegexpNode} = require('./RegexpNode.js');

/**
 * Represents the . character in Regex
 * Since it matches any character, it advances the state by one character.
 */
class AnyCharacterNode extends RegexpNode {
  constructor(next) {
    super();
    this.next = next;
  }

  derive(char) {
    return this.next;
  }
}

module.exports = AnyCharacterNode;

