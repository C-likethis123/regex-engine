{
  const {Or} = require("../StringAST");
}
start = regex

regex = charGroups*

chars = [a-zA-Z0-9]

charGroups = "(" chars: charGroups+ ")" {return chars} / chars

or = left:charGroups "|" right:charGroups { return Or([left, right]) }