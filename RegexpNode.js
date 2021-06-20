/**
 * A superclass representing a character in a Regex
 * All other types of Regex expressions will inherit from this base class
 */

class RegexpNode {
  derive(char) {
    return NeverMatches;
  }
}

/* Singleton classes */
const EmptyString = new RegexpNode(); // successful match
const NeverMatches = new RegexpNode(); // unsuccessful match

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
}

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
}
