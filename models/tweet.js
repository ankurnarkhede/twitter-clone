/**
 * Created by ankur at 30/4/19 6:04 PM.
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true
    }
  ],
  parentTweet: {
    type: Schema.Types.ObjectId,
    ref: 'tweets',
    unique: true
  },
  isRetweet: {
    type: Boolean,
    default: false
  },
  isReply: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('tweets', TweetSchema)
