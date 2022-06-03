import axios from 'axios'

const baseTokenUrl = process.env.REACT_APP_BASE_TOKEN_URL

export const refreshToken = async (RToken) => {
  const response = await axios.post(baseTokenUrl, {
    refreshToken: RToken,
  })
  return response.data
}
