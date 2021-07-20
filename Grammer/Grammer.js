{
  const {Any, ZeroOrMore} = require("../StringAST");
}
start = regex

regex
	= head:(match/charGroups)  tail:regex? { return tail ? [...head, ...tail] : [...head] }
  
charGroups = "(" chars: regex ")" quantifier:quantifier ? {
  if (quantifier === ZeroOrMore) {
    return [ ZeroOrMore(chars) ];
  } else {
    return [ chars ];
  }
}

// Terminal characters
chars = digits:[a-zA-Z] { return [digits]; }

// quantifiers
any = [\.] { return [Any] }

zeroOrMore = [\*] {return ZeroOrMore};

quantifier = zeroOrMore

// match
match =
  matchItem:(chars/any)
  quantifier: quantifier? {
  if(quantifier === ZeroOrMore) {
    return [ ZeroOrMore(...matchItem) ];
  } else {
    return matchItem;
  }
}