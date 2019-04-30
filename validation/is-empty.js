/**
 * Created by ankur at 30/4/19 7:43 AM.
 */
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export default isEmpty
