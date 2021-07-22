const {Command} = require('commander');
const parser = require("../Grammer/Parser.js");
const {RE} = require("../RE.js");

const program = new Command();


function runRegex(regex, string, options) {
  try {
    const parsedRegex = parser.parse(regex);
    const regexEngine = new RE(parsedRegex, options);
    const matchResult = regexEngine.match(string);
    console.log(matchResult);
  } catch (err) {
    if (err instanceof parser.SyntaxError) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
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
