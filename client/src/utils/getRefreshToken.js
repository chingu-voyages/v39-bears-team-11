import { refreshToken } from '../services/token'

/* Send request to token router to get new access token */
const getRefreshToken = (token) => {
  const refresh = async () => {
    const response = await refreshToken(token)
    return response
  }
  return refresh
}

export default getRefreshToken
