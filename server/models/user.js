const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    cart: [
        {
          type: Schema.Types.ObjectId, ref: 'Product'  
        }
    ]
})

userSchema.pre('save', function(next) {
    this.password = bcrypt.encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User