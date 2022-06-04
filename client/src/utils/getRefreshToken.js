import { refreshToken } from '../services/token'

const getRefreshToken = (token) => {
  const refresh = async () => {
    const response = await refreshToken(token)
    return response
  }
  return refresh
}

export default getRefreshToken
