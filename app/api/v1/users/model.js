const moongose = require('mongoose')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { model, Schema } = moongose

let usersSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus diisi'],
            minLength: 3,
            maxLength: 50
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus diisi']
        },
        password: {
            type: String,
            required: [true, 'Password harus diisi'],
            minLength: 6
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default: 'admin'
        },
        organizer: {
            type: moongose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        }
    },
    { timestamps: true }
)

usersSchema.pre('save', async function (next) {
    const User = this
    if(User.isModified('password')){
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

usersSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model('User', usersSchema)