const moongose = require('mongoose')
const { model, Schema } = moongose

let organizersSchema = Schema(
    {
        organizer: {
            type: String,
            required: [true, 'Penyelenggara harus diisi']
        }
    },
    { timestamps: true }
)

module.exports = model('Organizer', organizersSchema)