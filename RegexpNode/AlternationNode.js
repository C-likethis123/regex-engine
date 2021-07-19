const {RegexpNode, NeverMatches} = require('./RegexpNode.js');

/**
 * Represents the | character in regex.
 * alternatives: CharacterNode[]
 */
class AlternationNode extends RegexpNode {
  constructor(alternatives) {
    super();
    let _alternatives = alternatives.filter((alt) => alt !== NeverMatches);
    if (_alternatives.length === 0) {
      return NeverMatches;
    } else if (_alternatives.length === 1) {
      return _alternatives[0];
    } else {
      this.alternatives = _alternatives;
    }
    return this;
  }

  derive(char) {
    return new AlternationNode(this.alternatives.map((alt) => alt.derive(char)));
  }

  matchEnd() {
    return this.alternatives.some((alt) => alt.matchEnd());
  }

  canMatchMore() {
    return this.alternatives.some((alt) => alt.canMatchMore());
  }
}

module.exports = AlternationNode;

