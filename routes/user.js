import express from 'express'
import bcrypt from 'bcrypt'

import logger from '../utils/logger'
import User from '../models/user'

const router = express.Router()

router.post('/register', (req, res) => {
  let errors = {}
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        errors.username = 'Username already exists'
        return res.boom.badData('Invalid Data', { attributes: errors })
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => {
                logger.error(err)
                res.boom.badImplementation('Server Error', { attributes: err })
              })
          })
        })
      }
    })
})

module.exports = router
