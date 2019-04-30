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
    type: String
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  parentTweet: {
    type: Schema.Types.ObjectId,
    ref: 'tweets'
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

module.exports = mongoose.model('tweets1', TweetSchema)
