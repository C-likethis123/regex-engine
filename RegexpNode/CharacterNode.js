const {RegexpNode, NeverMatches} = require('./RegexpNode.js');

/** Represents a graph of the Regex expression we want to match against */
class CharacterNode extends RegexpNode {
  constructor(char, next) {
    super();
    this.char = char;
    this.next = next;
  }

  derive(char) {
    if (this.char === char) {
      return this.next;
    } else {
      return NeverMatches;
    }
  }
}

module.exports = CharacterNode;

