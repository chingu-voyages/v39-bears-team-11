import getAuthAxios, { detachInterceptors } from '../utils/getAuthAxios'
import axiosConfigObject from '../utils/config'

const baseUrl = process.env.REACT_APP_BASE_MESSAGES_URL

const getAll = async (id, AToken, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(AToken)

  const response = await authAxios.get(`${baseUrl}/${id}`, config)
  detachInterceptors()
  return response.data
}

const createTextMessage = async (textMessageObject, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)

  const response = await authAxios.post(baseUrl, textMessageObject, config)
  detachInterceptors()
  return response.data
}

const createPictureMessage = async (pictureMessageformData, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)

  const contentType = 'multipart/form-data'
  const config = axiosConfigObject(token, contentType)

  const response = await authAxios.post(baseUrl, pictureMessageformData, config)
  detachInterceptors()
  return response.data
}

export default {
  getAll,
  createTextMessage,
  createPictureMessage,
}
