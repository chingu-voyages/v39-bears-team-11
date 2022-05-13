import { createSlice } from '@reduxjs/toolkit'

/* Dummy messages data */
const initialState = {
  currentFriendId: 3,
  chats: [
    {
      friendId: 3,
      messages: [
        {
          sender: 3,
          receiver: 9999,
          content: 'I want those files from you. I want you to send 1 PDF and 1 image file',
          timestamp: '2022-03-30T15:28:18.792+00:00',
        },
        {
          sender: 9999,
          receiver: 3,
          content: 'I\'ve found some cool photos for our travel app. Are you interested ?',
          timestamp: '2022-03-31T15:28:18.792+00:00',
        },
        {
          sender: 3,
          receiver: 9999,
          content: 'Ok, thanks. Can you send them this evening. I need to update my content as soon as possible to keep things intersting.',
          timestamp: '2022-04-01T15:28:18.792+00:00',
        },
        {
          sender: 3,
          receiver: 9999,
          content: 'Ok, thanks. Can you send them this evening. I need to update my content as soon as possible to keep things intersting.',
          timestamp: '2022-04-01T15:28:18.792+00:00',
        },
        {
          sender: 9999,
          receiver: 3,
          content: 'I\'ve found some cool photos for our travel app.',
          timestamp: '2022-04-10T15:28:18.792+00:00',
        },
      ],
    },
  ],
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

export function addTextMessage(message) {
  return (dispatch, getState) => {
    /* Send post request to messagesService.addTextMessage */
    dispatch(appendMessage({
      sender: 9999,
      receiver: getState().messages.currentFriendId,
      content: message,
      timestamp: new Date().toISOString(),
    }))
  }
}
export default messagesSlice.reducer
