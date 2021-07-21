const {Command} = require('commander');
const parser = require("../Grammer/Parser.js");
const {RE} = require("../RE.js");

const program = new Command();


function runRegex(regex, string) {
  const parsedRegex = parser.parse(regex);
  const regexEngine = new RE(parsedRegex);
  const matchResult = regexEngine.match(string);
  console.log(matchResult);
}
program
  .arguments('<regex> <string>')
  .action((regex, string) => runRegex(regex, string))

function cli(args) {
  program.parse(args);
}

module.exports = {cli};
