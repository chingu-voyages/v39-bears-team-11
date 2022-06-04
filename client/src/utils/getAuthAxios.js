import axios from 'axios'
import getRefreshToken from './getRefreshToken'

let requestIntercept
let responseIntercept

const getAuthAxios = async (RToken) => {
  const refresh = getRefreshToken(RToken)

  const attachInterceptors = async () => {
    requestIntercept = axios.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    )

    responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers.Authorization = `bearer ${newAccessToken}`
          return axios.request(prevRequest)
        }
        return Promise.reject(error)
      },
    )
  }

  await attachInterceptors()
  return axios
}

export const detachInterceptors = () => {
  axios.interceptors.request.eject(requestIntercept)
  axios.interceptors.response.eject(responseIntercept)
}

export default getAuthAxios
