// where api config or similar files may live

/**
 * @name axiosConfigObject
 * @summary A reusable function to generate the axios config object to pass
 * as the third parameter to axios requests.
 * @param {string} token The token from the server attached to the user object. This
 * token is used to authenticate every request made by the user in order to prevent
 * cross-site scripting attacks forgery.
 * @returns A configuration object to pass to the axios API requests.
 * @example
 * const token = '8jdnoake100343jdnsokelselsue1soq'
 * const config = axiosConfigObject(token)
 * console.log(config)
 * {
 * headers: {Authorization: '8jdnoake100343jdnsokelselsue1soq' }
 * }
 */
const axiosConfigObject = (token, contentType = '') => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }
  if (contentType !== '') {
    config.ContentType = contentType
  }

  return config
}

export default axiosConfigObject
