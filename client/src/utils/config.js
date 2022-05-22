// where api config or similar files may live

/**
 * @name axiosConfigObject
 * @summary A reusable function to generate the axios config object to pass
 * as the third parameter to axios requests.
 * @param {string} token
 * @returns A configuration object to pass to the axios API requests.
 * @example
 * const token = '8jdnoake100343jdnsokelselsue1soq'
 * const config = axiosConfigObject(token)
 * console.log(config)
 * {
 * headers: {Authorization: '8jdnoake100343jdnsokelselsue1soq' }
 * }
 */
const axiosConfigObject = (token) => {
  const config = {
    headers: { Authorization: `${token}` },
  }
  return config
}

export default axiosConfigObject
