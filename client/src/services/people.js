const axios = require('axios')

const baseUrl = process.env.REACT_APP_BASE_PEOPLE_URL

const search = async (searchObject) => {
  const response = await axios.post(baseUrl, searchObject)
  return response.data
}

export default {
  search,
}
