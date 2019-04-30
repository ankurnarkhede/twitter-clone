/**
 * Created by ankur at 29/4/19 7:47 AM.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)
