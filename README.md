# regex-engine

A regex engine I wrote to better understand how regexes worked. Supports a very limited subset of regex expressions.

## Theory
<!-- mention Grammer, regex derivatives, finite automata -->

<!-- design decisions: parser grammer, why derivatives, why commonJS? -->

## CLI and Example usage

```
regex-engine [regex] [string to match against]
```

Example usage: `regex-engine te(s|t)t test => //true`

## Developing

To try this out:
1. Clone the repo
2. Install dependencies
3. Run `npm link` to create a symlink to the Cli/bin/create-project binary

To extend this regex parser:
1. Define the regex rules in the Grammer/Grammer.js file
2. Run `npm run generate-parser` to generate the parser corresponding to the regex rules defined
3. Add test cases and run `npm run test` to make sure test cases pass.

