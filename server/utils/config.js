require('dotenv').config()

/* Import app variables from .env */

/* In test mode import testing-database URI   */
/* In development and production, import the  */
/* production database URI                    */

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PORT = process.env.PORT || 3001

module.exports = {
  MONGODB_URI,
  PORT
}