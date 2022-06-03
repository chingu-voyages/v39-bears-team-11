/* eslint-disable import/no-import-module-exports */
/* eslint-disable consistent-return */
import axios from 'axios'
import getAuthAxios, { detachInterceptors } from '../utils/getAuthAxios'
import axiosConfigObject from '../utils/config'

/**
 * @description The api endpoint for the user service request. It is set in the
 * dot env file and imported from there with the given name.
 * @constant baseUserUrl
 * @type string
 */
const baseUserUrl = process.env.REACT_APP_BASE_USER_URL

/**
 * @description The api endpoint for the user service log in requests
 * imported from the dot env file.
 * @constant baseLoginUrl
 * @type string
 */
const baseLoginUrl = process.env.REACT_APP_BASE_LOGIN_URL

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
 * @returns The current user object with the updated list of the friends
 */
export const addFriend = async (user, id, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)
  try {
    // make a post request to the backend
    const response = await authAxios.put(`${baseUserUrl}/${id}`, user, config)
    detachInterceptors()
    // return the response
    return response.data
  } catch (error) {
    // todo: add better error handling
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
 * @returns The current user object with the updated list of the friends
 */
export const unFriend = async (user, id, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)
  try {
    // make a post request to the backend
    const response = await authAxios.put(`${baseUserUrl}/${id}`, user, config)
    detachInterceptors()
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
export const updateProfile = async (user, id, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)
  try {
    // make a put request to the backend
    const response = await authAxios.put(`${baseUserUrl}/${id}`, user, config)
    detachInterceptors()
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

/**
 * @name deleteAccount
 * @summary This function sends the current user delete request to the server
 * so that the user's account can be deleted. Upon successful deletion of the
 * user, he/she will be logged out
 * @param {string} id The id of the current user
 * @param {string} token The token to authenticate the current user
 * @returns The status of the operation
 */
export const deleteProfile = async (id, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)
  try {
    // make a delete request to the backend
    const response = await authAxios.delete(`${baseUserUrl}/${id}`, config)
    detachInterceptors()
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
export const updateUserPicture = async (user, id, token, RToken) => {
  const authAxios = await getAuthAxios(RToken)
  const config = axiosConfigObject(token)
  try {
    // make an upload request to the backend
    const response = await authAxios.put(`${baseUserUrl}/${id}`, user, config)
    detachInterceptors()
    // return the response data
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error.message)
  }
}

/**
 * @name signUp
 * @summary The signUp service takes the registration credentials of the new user
 * and makes a post request to the server where the user is registered.
 * @param {string} username The username selected by the user for his/her account
 * @param {string} email The email provided by the user for his/her account
 * @param {string} password The password entered by the user to register his/her account
 * @returns The user object if the registration is successful. The user object contains
 * the username, email, id, picture, contacts, token, refreshToken, and timestamps.
 */
export const signUp = async (username, email, password) => {
  try {
    // make a post request to the server with user credentials
    const response = await axios.post(baseUserUrl, {
      username,
      email,
      password,
    })
    // return user object from database
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error)
  }
}

/**
 * @name logIn
 * @summary The log in service to make the ajax call to the server and return
 * the response from the server.
 * @param {string} username
 * @param {string} password
 * @returns The user object as is in the database excluding the password. The user object
 * The user object contains the username, email, id, picture, contacts, token,
 * refreshToken, and timestamps.
 */
export const logIn = async (email, password) => {
  try {
    // make a post request to the server with username and password
    const response = await axios.post(baseLoginUrl, { email, password })
    // return the user object if login succeeds
    return response.data
  } catch (error) {
    // todo: add better error handling
    // log the error message to the browser console
    console.log(error)
  }
}
