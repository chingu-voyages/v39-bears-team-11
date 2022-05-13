/* eslint-disable consistent-return */
const axios = require('axios')

const baseUrl = process.env.REACT_APP_BASE_USER_URL

export const addFriend = async (user, id, token) => {
  try {
    // make a post request to the backend
    const response = await axios.post(baseUrl, { user, id, token })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const unFriend = async (user, id, token) => {
  try {
    // make a post request to the backend
    const response = await axios.post(baseUrl, { user, id, token })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

export const updateProfile = async (id, username, email) => {
  try {
    // make a delete request to the backend
    const response = await axios.patch(baseUrl, { id, username, email })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

export const uploadPhoto = async (id, imgData) => {
  try {
    // make a delete request to the backend
    const response = await axios.patch(baseUrl, { id, imgData })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

export const deleteProfile = async (id) => {
  try {
    // make a delete request to the backend
    const response = await axios.delete(baseUrl, { id })
    // return the response status
    return response.status
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}
