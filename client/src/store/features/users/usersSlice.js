/* eslint-disable object-curly-newline */
import { createSlice } from '@reduxjs/toolkit'
import * as userService from '../../../services/userService'

/* dummy user state */
const initialState = {
  id: '',
  username: '',
  email: '',
  token: '',
  refreshToken: '',
  picture: null,
  friends: [],
  isOnline: false,
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      friends: action.payload.contacts,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      isOnline: true,
    }),
    logout: (state) => ({
      ...state,
      id: null,
      username: null,
      email: null,
      token: null,
      refreshToken: null,
      picture: null,
      friends: [],
      isOnline: false,
    }),
    appendFriend: (state, action) => ({
      ...state,
      friends: state.friends.concat(action.payload),
    }),
    removeFriend: (state, action) => ({
      ...state,
      friends: state.friends.filter((f) => f.id !== action.payload),
    }),
    updateUser: (state, action) => ({
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      token: action.paylod.token,
    }),
  },
})

// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line operator-linebreak
export const { login, logout, appendFriend, removeFriend, updateUser } =
  usersSlice.actions

export function addFriend(userToUpdate, id) {
  return async (dispatch, getState) => {
    const { token, refreshToken } = getState().user
    const updatedUser = await userService.addFriend(userToUpdate, id, token, refreshToken)
    const currentFriends = getState().user.friends

    const updatedFriends = updatedUser.contacts

    /* Find the friend that is in updatedFriends but not in currentFriends */
    const newFriend = updatedFriends.find(
      (friend) => !currentFriends.some((f) => f.id === friend.id),
    )
    dispatch(appendFriend(newFriend))
  }
}

export function unFriend(userToUpdate, id) {
  return async (dispatch, getState) => {
    const { token, refreshToken } = getState().user
    const updatedUser = await userService.unFriend(userToUpdate, id, token, refreshToken)
    const currentFriends = getState().user.friends

    const updatedFriends = updatedUser.contacts

    /* Find the friend that is in currentFriends but not in updatedFriends */
    const friendToRemove = currentFriends.find(
      (friend) => !updatedFriends.some((f) => f.id === friend.id),
    )
    dispatch(removeFriend(friendToRemove.id))
  }
}

// todo: consider using the createAsyncThunk middleware
/**
 * @name deleteUserProfile
 * @summary A thunk action to delete a user from the database.
 * @param {string} userId The id of the current user
 * @param {string} token The token of the current user
 * @returns A thunk action that makes a delete request to the server and removes a
 * user.
 */
export function deleteUserProfile(userId) {
  /**
   * @param {function} dispatch The redux dispatch function
   * @returns void
   */
  return async (dispatch, getState) => {
    try {
      /**
       * @constant response The response from the delete request to the server.
       * The status of the delete operation.
       * @type {string}
       */
      const { token, refreshToken } = getState().user
      await userService.deleteProfile(userId, token, refreshToken)
      // logout user on success
      dispatch(logout())
      // access the Location object and replace the current location
      // by redirecting the user to the '/' route.
      // eslint-disable-next-line no-undef
      globalThis.location.replace('/')
    } catch (error) {
      // handle error on failure
      console.log(error.message)
    }
  }
}

// todo: consider using the createAsyncThunk middleware
/**
 * @name updateUserProfile
 * @summary A thunk action that sends a put request to update the user on the
 * server and update the user state with the response.
 * @param {string} userId The id of the current user
 * @param {string} userToken The token of the current user
 * @returns A thunk action that makes a put request to update the user on the
 * server and dispatch the updateUser action the received response to update
 * the user state.
 */
export function updateUserProfile(userToUpdate, userId) {
  /**
   * @param {Function} dispatch The redux dispatch function
   * @returns void
   */
  return async (dispatch, getState) => {
    try {
      /**
       * @constant response The response from the put request to the server
       * @type {{
       * username: string,
       * email: string,
       * token: string
       * }}
       */
      const { token, refreshToken } = getState().user
      const response = await userService.updateProfile(userToUpdate, userId, token, refreshToken)
      console.log(response)
      /**
       * @constant username The updated username from the server
       * @constant email The updated email from the server
       * @constant token The new token created and sent with the response
       */
      dispatch(updateUser({ ...response }))
    } catch (error) {
      // todo: add better error handling
      console.log(error.message)
    }
  }
}

export function signUpUser({ username, email, password }) {
  // return the async action that will call the dispatch function
  return async (dispatch) => {
    try {
      const response = await userService.signUp(username, email, password)

      // The successfuly user object (response) returned from the server contains
      // the username, email, id, picture, contacts, token, refreshToken, and timestamps.

      dispatch(login(response))
    } catch (error) {
      // handle error
      console.log(error.message)
    }
  }
}

export function loginUser({ email, password }) {
  // return the async action that will call the dispatch function
  return async (dispatch) => {
    try {
      // make the fetch request using the appropriate userService function
      const response = await userService.logIn(email, password)

      // The successfuly user object (response) returned from the server contains:
      // the username, email, id, picture, contacts, token, refreshToken, and timestamps.

      dispatch(login(response))
    } catch (error) {
      // handle error
      console.log(error.message)
    }
  }
}

export default usersSlice.reducer
