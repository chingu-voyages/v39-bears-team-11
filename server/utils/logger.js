/* Logging functions that take one */
/* or more strings and logs them   */

const infoLogger = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}
const errorLogger = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  infoLogger,
  errorLogger,
}
