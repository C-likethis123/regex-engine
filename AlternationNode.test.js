const {AlternationNode, CharacterNode, NeverMatches, EmptyString} = require('./RegexpNode');

test('If alternatives are all NeverMatches, then its derivative does not match', () => {
  const alternationNode = new AlternationNode([NeverMatches, NeverMatches]);
  expect(alternationNode.derive('d')).toBe(NeverMatches);
});

test('If an alternative matches the supplied node, then it should match', () => {
  const expectedNode = new CharacterNode('f', EmptyString);
  const alternationNode = new AlternationNode([
    new CharacterNode('d', expectedNode),
    new CharacterNode('e', expectedNode)
  ]);
  expect(alternationNode.derive('d')).toBe(expectedNode);
  expect(alternationNode.derive('e')).toBe(expectedNode);
  expect(alternationNode.derive('d').derive('f')).toBe(EmptyString);
});

test('If no alternative matches the supplied node, then it does not match', () => {
  const expectedNode = new CharacterNode('f', EmptyString);
  const alternationNode = new AlternationNode([
    new CharacterNode('d', expectedNode),
    new CharacterNode('e', expectedNode)
  ]);
  expect(alternationNode.derive('f')).toBe(NeverMatches);
});

test('If there are no alternatives available, this does not match', () => {
  const alternationNode = new AlternationNode([]);
  expect(alternationNode.derive('')).toBe(NeverMatches);
});

test('If values passed to it is not an array, throw an error', () => {
  const alternationNode = () => new AlternationNode('not an array');
  expect(alternationNode).toThrow(TypeError);
});
