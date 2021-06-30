/**
 * A superclass representing a character in a Regex
 * All other types of Regex expressions will inherit from this base class
 */

export class RegexpNode {
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

/* Singleton classes */
class _EmptyString extends RegexpNode {
  matchEnd() {
    return true;
  }
}
export const EmptyString = new _EmptyString(); // successful match
export const NeverMatches = new RegexpNode(); // unsuccessful match

/** Represents a graph of the Regex expression we want to match against */
export class CharacterNode extends RegexpNode {
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
export class AlternationNode extends RegexpNode {
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

/**
 * Represents the . character in Regex
 * Since it matches any character, it advances the state by one character.
 */
export class AnyCharacterNode extends RegexpNode {
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
export class RepetitionNode extends RegexpNode {
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
