/** A class representing the | pattern specified by the user */
class _Or {
  constructor(alternatives) {
    this.alternatives = alternatives;
  }
}

function Or(alternatives) {
  if (!(alternatives instanceof Array)) {
    throw new TypeError("Alternatives passed to Or must be an array");
  } else {
    return new _Or(alternatives);
  }
}

module.exports = {_Or, Or};
