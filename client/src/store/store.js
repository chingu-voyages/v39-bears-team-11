import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/users/usersSlice'

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
})
