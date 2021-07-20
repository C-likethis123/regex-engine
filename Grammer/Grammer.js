{
  const {Or, Any, ZeroOrMore} = require("../StringAST");
}
start = regex

regex
  = head:(match / charGroups) or:or? tail:regex? {
    if(or) {
      const [ next, ...rest ] = tail;
      return tail && [Or([ ...head, next ]), ...rest];
    }
    return tail ? [ ...head, ...tail ] : [ ...head ];
  }
  
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

or = [\|] {return Or};

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