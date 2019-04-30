/**
 * Created by ankur at 29/4/19 9:18 AM.
 */
import jwt from 'jsonwebtoken'
import config from 'config'
import logger from '../utils/logger'

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    logger.info(`JWT:: ${token}`)
    req.user = jwt.verify(token, config.get('secretOrKey'))
    next()
  } catch (err) {
    logger.error(err)
    return res.boom.unauthorized(err.message)
  }
}

export default checkAuth
