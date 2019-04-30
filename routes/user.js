import express from 'express'
import bcrypt from 'bcrypt'
import config from 'config'
import jwt from 'jsonwebtoken'

import logger from '../utils/logger'
import User from '../models/user'

// import validations
import checkAuth from '../utils/check-auth'
import validateLoginInput from '../validation/login'

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

router.post('/login', (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body)

  // check validation
  if (!isValid) {
    return res.boom.badData('Invalid Data', { attributes: errors })
  }

  const username = req.body.username
  const password = req.body.password

  // find user by email
  User.findOne({ username })
    .then(user => {
      // Check for user
      if (!user) {
        return res.boom.unauthorized('Username or Password is incorrect')
      }

      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          const payload = { id: user.id, username: user.username } // create JWT payload

          // sign token
          jwt.sign(
            payload,
            config.get('secretOrKey'),
            { expiresIn: 604800 },
            (err, token) => {
              if (err) {
                return res.boom.badImplementation('Internal Server Error')
              }
              return res.json({
                success: true,
                token: token
              })
            })
        } else {
          return res.boom.unauthorized('Username or Password is incorrect')
        }
      })
    })
})

router.get('/current', checkAuth, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  })
})

export default router
