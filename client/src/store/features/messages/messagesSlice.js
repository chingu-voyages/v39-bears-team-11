import { createSlice } from '@reduxjs/toolkit'
import messagesService from '../../../services/messages'

const initialState = {
  currentFriendId: '',
  chats: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => ({
      ...state,
      chats: action.payload,
    }),
    setCurrentFriendId: (state, action) => ({
      ...state,
      currentFriendId: action.payload,
    }),
    appendMessage: (state, action) => ({
      ...state,
      /* If a chat's friendId is not equal to the current friend id, */
      /* return chat, else return a new chat object that contains    */
      /* an updated messages array with the new message.             */
      chats: state.chats.map((chat) => (
        chat.friendId !== state.currentFriendId
          ? chat
          : {
            ...chat,
            messages: chat.messages.concat(action.payload),
          }
      )),
    }),
  },
})

export const { setMessages, setCurrentFriendId, appendMessage } = messagesSlice.actions

export function addTextMessage(textMessage) {
  return async (dispatch, getState) => {
    /* Send post request to messagesService */
    /* Replace currentFriendId with this dymmy id to test '6273ca3282ed5c0d4694857f' */
    const { token, refreshToken } = getState().user
    const textMessageObject = {
      userId: getState().user.id,
      friendId: getState().messages.currentFriendId,
      content: textMessage,
      timestamp: new Date().toISOString(),
    }
    const createdMessage = await messagesService.createTextMessage(
      textMessageObject,
      token,
      refreshToken,
    )
    dispatch(appendMessage(createdMessage))

    /* uncomment the following code and comment out the above code to test frontend only */
    // dispatch(appendMessage({
    //   sender: 9999,
    //   receiver: getState().messages.currentFriendId,
    //   content: textMessage,
    //   timestamp: new Date().toISOString(),
    // }))
  }
}

export function addPictureMessage(pictureMessage) {
  return async (dispatch, getState) => {
    /* Send post request to messagesService */
    const { token, refreshToken } = getState().user

    /* Replace currentFriendId with this dymmy id to test '6273ca3282ed5c0d4694857f' */
    const formData = new FormData()
    formData.append('userId', getState().user.id)
    formData.append('friendId', getState().messages.currentFriendId)
    formData.append('image', pictureMessage)
    formData.append('timestamp', new Date().toISOString())

    const createdMessage = await messagesService.createPictureMessage(formData, token, refreshToken)
    console.log(createdMessage)
    dispatch(appendMessage(createdMessage))

    /* uncomment the following code and comment out the above code to test frontend only */
    // dispatch(appendMessage({
    //   sender: 9999,
    //   receiver: getState().messages.currentFriendId,
    //   content: pictureMessage,
    //   timestamp: new Date().toISOString(),
    // }))
  }
}

export default messagesSlice.reducer
