const User = require('../models/user')

const peopleController = async (req, res) => {
  const searchKeywords = req.body.searchKeywords.toLowerCase()

  /* Search for users with usernames matching */
  /* the search keywords, case insensitive.   */
  const people = await User.find({
    username: {
      '$regex': searchKeywords,
      '$options': 'i',
    }
  })

  /* Return an array of person objects each containing */
  /* three fields: id, username, and picture           */
  const peopleToReturn = people.reduce((arr, person) => {
    arr.push({
      id: person.id,
      username: person.username,
      picture: person.picture,
    })
    return arr
  }, [])

  res.status(200).send(peopleToReturn)
}

module.exports = {
  peopleController,
}

