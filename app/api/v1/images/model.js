const moongose = require('mongoose')
const { model, Schema } = moongose

let imageSchema = Schema(
    {
        name: { type: String },
    },
    { timestamps: true}
)

module.exports = model('Image', imageSchema)