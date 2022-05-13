import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/users/usersSlice'
import messagesReducer from './features/messages/messagesSlice'

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: usersReducer,
    messages: messagesReducer,
  },
})
