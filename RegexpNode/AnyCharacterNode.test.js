const {AnyCharacterNode, EmptyString, NeverMatches} = require('./index');

test('Matches all alphanumeric characters', () => {
  const alphanumericString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (const letter of alphanumericString) {
    const testAnyCharacterNode = new AnyCharacterNode(EmptyString);
    expect(testAnyCharacterNode.derive(letter)).toBe(EmptyString);
  }
});

