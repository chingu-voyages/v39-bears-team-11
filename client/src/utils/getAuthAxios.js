import axios from 'axios'
import getRefreshToken from './getRefreshToken'

let requestIntercept
let responseIntercept

/* Attach request and response interceptors to axios */
const getAuthAxios = async (RToken) => {
  const refresh = getRefreshToken(RToken)

  const attachInterceptors = async () => {
    /* Attach a request interceptor to handle unsuccessful */
    /* requests sent back by the response interceptor      */
    requestIntercept = axios.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    )

    /* Attach a response interceptor to handle a 401 error - token expired.      */
    /* Saves the failed request, creates a new token by calling the refreshToken */
    /* service, and adds it to the request headers. Returns the request.         */
    /* prevRequest.sent is a custom property that is used */
    /* to make sure a failed request is only resent once */
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

/* After the inteceptors run, they must be detached     */
/* or else they will build up and each request will end */
/* up having multiple request and response interceptors */
export const detachInterceptors = () => {
  axios.interceptors.request.eject(requestIntercept)
  axios.interceptors.response.eject(responseIntercept)
}

export default getAuthAxios
