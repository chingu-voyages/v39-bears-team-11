/* eslint-disable consistent-return */
const axios = require('axios')

/**
 * @description The api endpoint for the user service request. It is set in the
 * dot env file and imported from there with the given name.
 * @constant baseUrl
 * @type string
 */
const baseUrl = process.env.REACT_APP_BASE_USER_URL

/**
 * @name addFriend
 * @summary The addFriend function adds a new friend to a user's friends array. The
 * function accepts three parameters---user, id, and token. The request is sent to
 * the backend, the user's friends list is updated and the updated list is returned.
 * @param {{
 * username: string,
 * email: string,
 * friends: string[],
 * picture: Buffer
 * }} user This is the user currently logged in
 * @param {string} id This is the id of the current user
 * @param {string} token This is token to authenticate the user before handling request
 * @returns The updated list of the current user's friends
 */
const addFriend = async (user, id, token) => {
  try {
    // make a post request to the backend
    const response = await axios.post(baseUrl, { ...user, id, token })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * @name unFriend
 * @summary Given the id of a friend to remove, the unFriend function removes
 * that friend from the current user's friends list. The function accepts
 * three parameters---user, id, and token. The request is sent to
 * the backend, the user's friends list is updated by removing the friend whose
 * id matches and the updated list is returned.
 * @param {{
 * username: string,
 * email: string,
 * friends: string[],
 * picture: Buffer
 * }} user This is the user currently logged in
 * @param {string} id The id of the current user
 * @param {string} token The token used to authenticate the current user before handling request
 * @returns The updated list of the current user's friends
 */
const unFriend = async (user, id, token) => {
  try {
    // make a post request to the backend
    const response = await axios.post(baseUrl, { ...user, id, token })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

/**
 * @name updateProfile
 * @summary This function updates a user's profile with the new username and
 * email address sent with the request.
 * @param {string} id The id of the current user
 * @param {string} username The new username selected by the current user
 * @param {string} email The new email address selected by the current user
 * @param {string} token The token of the current user to authenticate the request
 * @returns The updated user object with the new username and email address
 */
const updateProfile = async (id, username, email, token) => {
  try {
    // make a put request to the backend
    const response = await axios.put(baseUrl, {
      id,
      username,
      email,
      token,
    })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

/**
 * @name deleteProfile
 * @summary This function sends the current user delete request to the server
 * so that the user's account can be deleted. Upon successful deletion of the
 * user, he/she will be logged out
 * @param {string} id The id of the current user
 * @param {string} token The token to authenticate the current user
 * @returns The status of the operation
 */
const deleteProfile = async (id, token) => {
  try {
    // make a delete request to the backend
    const response = await axios.delete(baseUrl, { id, token })
    // return the response status
    return response.status
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

/**
 * @name uploadPhoto
 * @summary The function will take the image file and make a patch request to the
 * server to update the existing image with the new one in the payload.
 * @param {string} id
 * @param {any} imgData
 * @param {string} token
 * @returns The user object updated with the new photo
 */
const uploadPhoto = async (id, imgData, token) => {
  try {
    // make an upload request to the backend
    const response = await axios.patch(baseUrl, { id, imgData, token })
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

module.exports = {
  addFriend,
  unFriend,
  deleteProfile,
  updateProfile,
  uploadPhoto,
}
