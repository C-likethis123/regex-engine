const {compile} = require("./Compiler.js");
const {EmptyString} = require("./RegexpNode");
const {Flags} = require("./Flag.js");

/**
 * Entry point for the compiler
 */
class RE {
  constructor(regexp, flags = []) {
    this.isCaseInsensitive = false;
    for (const flag of flags) {
      if (flag === Flags.CASE_INSENSITIVE) {
        this.isCaseInsensitive = true;
      }
    }
    this.start = compile(regexp, undefined, this.isCaseInsensitive);
  }

  match(str) {
    let state = this.start;
    const chars = Array.from(str);
    if ((chars.length === 0) && (state === EmptyString)) {
      return true;
    }
    for (let i = 0; i < chars.length; i++) {
      let char = chars[i];
      state = state.derive(char);
      if (state.matchEnd() && i === chars.length - 1) {
        return true;
      } else if (state.matchEnd() && !state.canMatchMore()) {
        return false;
      }
    }
    return false;
  }
}
module.exports = {RE};

