const {CharacterNode, EmptyString, NeverMatches} = require("./index");

test('Progresses to the next character when deriving', () => {
  const expectedDerivedSequence = new CharacterNode('e', EmptyString);
  const testCharacterNode = new CharacterNode('d', expectedDerivedSequence);
  expect(testCharacterNode.derive('d')).toBe(expectedDerivedSequence);
});

test('Returns NeverMatch if current character node does not match derivative input', () => {
  const expectedDerivedSequence = new CharacterNode('e', EmptyString);
  const testCharacterNode = new CharacterNode('d', expectedDerivedSequence);
  expect(testCharacterNode.derive('e')).toBe(NeverMatches);
});
