/**
 * Created by ankur at 30/4/19 6:23 PM.
 */

import express from 'express'
import logger from '../utils/logger'
import Tweet from '../models/tweet'

// import validations
import checkAuth from '../utils/check-auth'
import validateTweetInput from '../validation/tweet'

const router = express.Router()

router.get('/:tweet_id', checkAuth, (req, res) => {
  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .populate('parentTweet', 'text')
    .then(tweet => {
      if (tweet) {
        return res.json(tweet)
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(err => {
      return res.boom.badData(err)
    })
})

router.post('/', checkAuth, (req, res) => {
  let { errors, isValid } = validateTweetInput(req.body)

  // check validation
  if (!isValid) {
    return res.boom.badData('Invalid Data', { attributes: errors })
  }

  let newTweet = new Tweet({
    user: req.user._id,
    text: req.body.text
  })
  newTweet
    .save()
    .then(tweet => {
      return res.json(tweet)
    })
    .catch(err => {
      logger.error(err)
      return res.boom.badImplementation('Server Error', { attributes: err })
    })
})

router.delete('/:tweet_id', checkAuth, (req, res) => {
  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .then(tweet => {
      if (tweet) {
        tweet.status = false
        tweet.save()
        return res.json({
          message: 'Successfully deleted the tweet'
        })
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(err => {
      return res.boom.badData(err)
    })
})

router.get('/like/:tweet_id', checkAuth, (req, res) => {
  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .then(tweet => {
      if (tweet) {
        if (tweet.likes.includes(req.user._id)) {
          return res.boom.conflict(`Tweet already liked`)
        }
        // push req.user._id to likes array
        tweet.likes.push(req.user._id)
        tweet.save()
          .then(success => {
            return res.json({
              message: `Tweet liked successfully`
            })
          })
          .catch(err => {
            logger.error(err)
            return res.boom.badImplementation('Please try again later')
          })
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(err => {
      return res.boom.badData(err)
    })
})

router.get('/unlike/:tweet_id', checkAuth, (req, res) => {
  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .then(tweet => {
      if (tweet) {
        if (tweet.likes.includes(req.user._id)) {
          tweet.likes.splice(tweet.likes.indexOf(req.user._id), 1)
          tweet.save()
          return res.json({
            message: `Tweet unliked successfully`
          })
        }
        return res.boom.badData(`Tweet not liked`)
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(err => {
      return res.boom.badData(err)
    })
})

router.get('/retweet/:tweet_id', checkAuth, (req, res) => {
  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .then(tweet => {
      if (tweet) {
        let newTweet = new Tweet({
          user: req.user._id,
          isRetweet: true,
          parentTweet: req.params.tweet_id
        })
        newTweet
          .save()
          .then(tweet => {
            return res.json(tweet)
          })
          .catch(err => {
            logger.error(err)
            return res.boom.badImplementation('Server Error',
              { attributes: err })
          })
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(() => {
      return res.boom.badData('Tweet not found')
    })
})

router.post('/reply/:tweet_id', checkAuth, (req, res) => {
  let { errors, isValid } = validateTweetInput(req.body)

  // check validation
  if (!isValid) {
    return res.boom.badData('Invalid Data', { attributes: errors })
  }

  Tweet.findOne({ _id: req.params.tweet_id, status: true })
    .then(tweet => {
      if (tweet) {
        let newTweet = new Tweet({
          user: req.user._id,
          text: req.body.text,
          isReply: true,
          parentTweet: req.params.tweet_id
        })

        newTweet
          .save()
          .then(tweet => {
            return res.json(tweet)
          })
          .catch(err => {
            logger.error(err)
            return res.boom.badImplementation('Server Error',
              { attributes: err })
          })
      } else {
        return res.boom.badData('Tweet not found')
      }
    })
    .catch(() => {
      return res.boom.badData('Tweet not found')
    })
})

export default router
