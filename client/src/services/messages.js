import axios from 'axios'
import axiosConfigObject from '../utils/config'

const baseUrl = process.env.REACT_APP_BASE_MESSAGES_URL

const getAll = async (id, token) => {
  const config = axiosConfigObject(token)

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const createTextMessage = async (textMessageObject, token) => {
  const config = axiosConfigObject(token)

  const response = await axios.post(baseUrl, textMessageObject, config)
  return response.data
}

const createPictureMessage = async (pictureMessageformData, token) => {
  const contentType = 'multipart/form-data'
  const config = axiosConfigObject(token, contentType)

  const response = await axios.post(baseUrl, pictureMessageformData, config)
  return response.data
}

export default {
  getAll,
  createTextMessage,
  createPictureMessage,
}
