const {Command} = require('commander');
const parser = require("../Grammer/Parser.js");
const {RE} = require("../RE.js");

const program = new Command();


function runRegex(regex, string, options) {
  const parsedRegex = parser.parse(regex);
  const regexEngine = new RE(parsedRegex, options);
  const matchResult = regexEngine.match(string);
  console.log(matchResult);
}
program
  .argument('<regex')
  .argument('<string>')
  .option('-i', 'compile in case insensitive mode')
  .action((regex, string, options) => {
    runRegex(regex, string, options)
  })

function cli(args) {
  program.parse(args);
}

module.exports = {cli};
