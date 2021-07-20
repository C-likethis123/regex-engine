{
  const {Or} = require("../StringAST");
}
start = regex

regex = or

chars = [a-zA-Z0-9]

charGroups = "(" chars: chars+ ")" {return chars} / chars

or = left:charGroups "|" right:charGroups { return Or([left, right]) }