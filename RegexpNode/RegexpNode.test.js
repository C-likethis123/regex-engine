const {RegexpNode, NeverMatches} = require("./index");

test('Derivative of a RegexpNode does not match anything', () => {
  const regexNode = new RegexpNode();
  expect(regexNode.derive() === NeverMatches).toBe(true);
});

test('A RegexpNode does not match the end', () => {
  const regexNode = new RegexpNode();
  expect(regexNode.matchEnd()).toBe(false);
});

test('A RegexpNode can always match more nodes', () => {
  const regexNode = new RegexpNode();
  expect(regexNode.canMatchMore()).toBe(true);
})
