const {RegexpNode, NeverMatches} = require('./RegexpNode.js');
const AlternationNode = require('./AlternationNode.js');

/**
 * Represents the repetition node in Regex
 */
class RepetitionNode extends RegexpNode {
  constructor(next) {
    super();
    this.head = NeverMatches;
    this.next = next;
  }

  derive(char) {
    return new AlternationNode([
      this.head.derive(char),
      this.next.derive(char)
    ])
  }

  matchEnd() {
    return this.next.matchEnd();
  }

  canMatchMore() {
    return true;
  }
}

module.exports = RepetitionNode;
