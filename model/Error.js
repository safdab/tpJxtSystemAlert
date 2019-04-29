const tcomb = require('tcomb')


const Error = tcomb.struct({
    code: tcomb.Number,
    type: tcomb.String,
    message: tcomb.String,
}, {strict: true})

exports.Error = Error