/**
 * Created by ankur at 29/4/19 9:18 AM.
 */
import jwt from 'jsonwebtoken'
import config from 'config'
import logger from '../utils/logger'
import User from '../models/user'

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    logger.info(`JWT:: ${token}`)
    let jwtPayload = jwt.verify(token, config.get('secretOrKey'))
    User.findById(jwtPayload.id)
      .select('_id username updatedAt')
      .exec()
      .then(user => {
        logger.info(`Auth user:: ${user}`)
        req.user = user
        next()
      })
      .catch(err => {
        logger.error(err)
        return res.boom.unauthorized(err.message)
      })
  } catch (err) {
    logger.error(err)
    return res.boom.unauthorized(err.message)
  }
}

export default checkAuth
