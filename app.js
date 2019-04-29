import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import logger from './utils/logger'
import boom from 'express-boom'
import mongoose from 'mongoose'
import config from 'config'

// import routes controllers
import indexRouter from './routes/index'
import userRouter from './routes/user'

var app = express()

app.use(morgan('combined', { stream: logger.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(boom())

logger.info(config.get('mongoURI'))

// mongodb connection
mongoose
  .connect(config.get('mongoURI'),
    { useNewUrlParser: true, useCreateIndex: true })
  .then(() => logger.info(`Connected to MongoDB at: ${config.get('mongoURI')}`))
  .catch(err => logger.error(err))

// define routes to controllers
app.use('/', indexRouter)
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.boom.badRequest('Invalid request')
})

module.exports = app
