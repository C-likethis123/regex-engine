const { RegexpNode, NeverMatches } = require("./RegexpNode");
test('Derivative of a RegexpNode does not match anything', () => {
  const regexNode = new RegexpNode();
  expect(regexNode.derive() === NeverMatches).toBe(true); 
})
