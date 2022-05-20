import { createSlice } from '@reduxjs/toolkit'
import dummyManPic from '../../../icons/profile-picture-man-unsplash.jpg'
import dummyWomanPic from '../../../icons/profile-picture-woman-unsplash.jpg'
// import userService from '../../../../services/user'

/* dummy user state */
const initialState = {
  id: '61cdd39a5a14f24e4f2f89c7',
  // username: 'adalovelace',
  username: false,
  email: 'adalove@gamilcom',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYyMDEyM2UwMjg1ZDI2MWIwNWQ1OWY2NyIsImlhdCI6MTY0NDI1NzM3MywiZXhwIjoxNjQ0NTE2NTczfQ.VPUWHlYqzhOkU9UsyfWdhpkH3pS3GMeNkpFVct8Mtms',
  picture: dummyManPic,
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
  isOffline: true,
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
      isOffline: false,
    }),
    logout: (state) => ({
      ...state,
      isOnline: false,
      isOffline: true,
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
export const { login, logout, appendFriend, removeFriend } = usersSlice.actions

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
// async thunk to send delete user request
export function deleteUserProfile(userId, token) {
  // return async function that takes dispatch function
  // as parameters
  return async (dispatch) => {
    console.log(userId)
    // make the request to the server
    try {
      // eslint-disable-next-line no-undef
      const response = await userService.deleteProfile(userId, token)
      // do something with the response
      console.log(response)
      // logout user on success
      dispatch(logout)
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
 * @param {string} userId
 * @param {string} userToken
 * @returns Async function that makes a put request to update the user on the
 * server and dispatch the updateUser action the received response to update
 * the user state.
 */
export function updateUserProfile(userId, userToken) {
  /**
   * @param {Function} dispatch The redux dispatch function
   * @returns A thunk action
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

export default usersSlice.reducer
