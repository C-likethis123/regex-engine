start = regex

regex = charGroups*

chars = [a-zA-Z0-9]

charGroups = "(" chars: chars+ ")" {return chars} / chars
