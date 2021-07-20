{
  const {Any} = require("../StringAST");
}
start = regex

regex
	= head:(match/charGroups)  tail:regex? { return tail ? [...head, ...tail] : [...head] }
  
charGroups = "(" chars:regex ")" { return [chars] }

// Terminal characters
chars = digits:[a-zA-Z] { return [digits]; }

// quantifiers
any = [\.] { return [Any] }

// match
match = chars/any