const Enum = require('enum');

const Status = new Enum(["warning", "threat", "danger", "risk"])

module.exports.Status = Status