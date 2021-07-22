# regex-engine

A regex engine I wrote by following [this tutorial](http://dpk.io/dregs/toydregs) to better understand how regexes worked.
Supports the following regex notations:
- single characters, eg 'a', 'b'
- zero or more character (*)
- or (|)
- any (.)

## Theory

This regex engine works by computing the derivative of a regular expression with respect to the input string. A derivative is a modified version of the regular expression after it has matched a single character. Derivatives of previous regular expressions are then used to compute another derivative with respect to the next character of the input string, until the regex and the string has reached the end of their input.

## CLI and Example usage

Generally, commands are of the following format.
```
regex-engine <regex> <string to match against> [-i]
```
[-i] specifies if the regex engine is to match in case insensitive mode.

Example usage: 
`regex-engine te(s|t)t test => //true`
`regex-engine "tesT" "test" -i => // true`

## Developing

To try this out:
1. Clone the repo
2. Install dependencies with `npm install`
3. Run `npm link` to create a symlink to the Cli/bin/create-project binary
4. Now you can use the `regex-engine` CLI!

To extend this regex parser:
1. Define the regex rules in the Grammer/Grammer.js file
2. Run `npm run generate-parser` to generate the parser corresponding to the regex rules defined
3. Add test cases and run `npm run test` to make sure test cases pass.

## Milestones

[x] Write a CLI
[x] Have the CLI compile in case insensitive mode
[] Support {} quantifiers
