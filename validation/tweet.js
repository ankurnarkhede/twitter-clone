/**
 * Created by ankur at 30/4/19 6:27 PM.
 */

import Validator from 'validator'
import isEmpty from './is-empty'

const validateTweetInput = (data) => {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 1, max: 280 })) {
    errors.text = 'Tweet must be between 1 to 280 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateTweetInput
