const {EmptyString} = require("./RegexpNode");

test('EmptyString always matches the end', () => {
  expect(EmptyString.matchEnd()).toBe(true);
})
