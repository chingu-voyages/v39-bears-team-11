/* eslint-disable object-curly-newline */
import { createSlice } from '@reduxjs/toolkit'
// import dummyManPic from '../../../icons/profile-picture-man-unsplash.jpg'
import dummyWomanPic from '../../../icons/profile-picture-woman-unsplash.jpg'
import * as userService from '../../../services/userService'

/* dummy user state */
const initialState = {
  id: '61cdd39a5a14f24e4f2f89c7',
  // username: 'adalovelace',
  username: false,
  email: 'adalove@gamilcom',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2IwMTFiMTkzMTllMWY0ODVhZDE2NyIsInVzZXJuYW1lIjoicnVsZXNwbGF5ZXIiLCJpYXQiOiIxNjUzMjY4MjQyIn0.jkhHC3SQp8Yx4W4VgHY1JMdrAmqQ4HirXuOzt26Sqw4',
  picture: null,
  friends: [
    {
      id: 3,
      username: 'jredmille2',
      picture: dummyWomanPic,
    },
    {
      id: 6,
      username: 'gleband5',
      picture: dummyWomanPic,
    },
    {
      id: 33,
      username: 'marymille',
      picture: dummyWomanPic,
    },
    {
      id: 66,
      username: 'bandwidth7',
      picture: dummyWomanPic,
    },
  ],
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
      isOnline: true,
    }),
    logout: (state) => ({
      ...state,
      id: null,
      username: null,
      email: null,
      token: null,
      refreshToken: null,
      createdAt: null,
      updatedAt: null,
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
      ...action.payload,
    }),
  },
})

// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line operator-linebreak
export const { login, logout, appendFriend, removeFriend, updateUser } =
  usersSlice.actions

export function addFriend(userToUpdate, id, token) {
  return async (dispatch, getState) => {
    console.log(id, token)
    // const updatedUser = await userService.addFriend(userToUpdate, id, token)
    const currentFriends = getState().user.friends

    /* Dummy updatedUser for testing */
    const updatedUser = {
      ...userToUpdate,
      friends: currentFriends.concat({
        id: 1,
        username: 'marywoo',
        picture: dummyWomanPic,
      }),
    }
    const updatedFriends = updatedUser.friends

    /* Find the friend that is in updatedFriends but not in currentFriends */
    const newFriend = updatedFriends.find(
      (friend) => !currentFriends.some((f) => f.id === friend.id),
    )
    dispatch(appendFriend(newFriend))
  }
}

export function unFriend(userToUpdate, id, token) {
  return async (dispatch, getState) => {
    console.log(id, token)
    // const updatedUser = await userService.unFriend(userToUpdate, id, token)
    const currentFriends = getState().user.friends

    /* Dummy updatedUser for testing */
    const updatedUser = {
      ...userToUpdate,
      friends: currentFriends.map((f) => f.id !== 3),
    }
    const updatedFriends = updatedUser.friends

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
export function deleteUserProfile(userId, token) {
  /**
   * @param {function} dispatch The redux dispatch function
   * @returns void
   */
  return async (dispatch) => {
    try {
      /**
       * @constant response The response from the delete request to the server.
       * The status of the delete operation.
       * @type {string}
       */
      const response = await userService.deleteProfile(userId, token)
      console.log(response)
      // logout user on success
      dispatch(logout)
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
export function updateUserProfile(userId, userToken) {
  /**
   * @param {Function} dispatch The redux dispatch function
   * @returns void
   */
  return async (dispatch) => {
    try {
      /**
       * @constant response The response from the put request to the server
       * @type {{
       * username: string,
       * email: string,
       * token: string
       * }}
       */
      const response = await userService.updateProfile(userId, userToken)
      console.log(response)
      /**
       * @constant username The updated username from the server
       * @constant email The updated email from the server
       * @constant token The new token created and sent with the response
       */
      const { username, email, token } = response
      dispatch(updateUser(username, email, token))
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
      // make the fetch request using the appropriate userService function
      const response = await userService.signUp(username, email, password)
      return response.data
    } catch (error) {
      // handle error
      console.log(error.message)
    }
  }
}

export default usersSlice.reducer
