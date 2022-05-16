import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_MESSAGES_URL

const getAll = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${ token }` },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const createTextMessage = async (textMessageObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${ token }` },
  }
  const response = await axios.post(baseUrl, textMessageObject, config)
  return response.data
}

export default {
  getAll,
  createTextMessage,
}