const moongose = require('mongoose')
const { model, Schema } = moongose

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [ true, 'Nama harus diisi']
        },
        role: {
            type: String,
            default: '-'
        },
        image: {
            type: moongose.Types.ObjectId,
            ref: 'Image',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)