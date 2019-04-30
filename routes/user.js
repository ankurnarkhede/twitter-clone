import express from 'express'
import logger from '../utils/logger'
import User from '../models/user'

// import validations
import checkAuth from '../utils/check-auth'

const router = express.Router()

router.get('/follow/:username', checkAuth, (req, res) => {
  User.findOne({ username: req.user.username })
    .select('_id username follows')
    .then(user => {
      User.findOne({ username: req.params.username })
        .select('_id username')
        .then(followUser => {
          // check if user already follows the followUser
          if (user.follows.includes(followUser._id)) {
            return res.boom.conflict(
              `User ${req.params.username} already followed`)
          }
          // push followUser._id to follows array
          user.follows.push(followUser._id)
          user.save()
            .then(success => {
              return res.json({
                message: `Followed ${followUser.username} successfully`
              })
            })
            .catch(err => {
              logger.error(err)
              return res.boom.badImplementation('Please try again later')
            })
        })
        .catch(err => {
          logger.error(err)
          return res.boom.badData(`User ${req.params.username} does not exist`)
        })
    })
    .catch(err => {
      logger.error(err)
      return res.boom.badImplementation('Please try again later')
    })
})

router.get('/unfollow/:username', checkAuth, (req, res) => {
  User.findOne({ username: req.user.username })
    .select('_id username follows')
    .then(user => {
      // check if user exists
      User.findOne({ username: req.params.username })
        .select('_id username')
        .then(unfollowUser => {
          // check if user follows the unfollowUser
          if (user.follows.includes(unfollowUser._id)) {
            user.follows.splice(user.follows.indexOf(unfollowUser._id), 1)
            user.save()
            return res.json({
              message: `Unfollowed ${unfollowUser.username} successfully`
            })
          }
          return res.boom.badData(`User ${req.params.username} not followed`)
        })
        .catch(err => {
          logger.error(err)
          return res.boom.badData(`User ${req.params.username} does not exist`)
        })
    })
    .catch(err => {
      logger.error(err)
      return res.boom.badImplementation('Please try again later')
    })
})

export default router
