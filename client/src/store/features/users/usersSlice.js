import { createSlice } from '@reduxjs/toolkit'

// dummy user state
const initialState = {
  id: null,
  name: 'John Doe',
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
      name: action.payload.name,
      isOnline: true,
      isOffline: false,
    }),
    logout: (state) => ({
      ...state,
      isOnline: false,
      isOffline: true,
    }),
  },
})

export const { login, logout } = usersSlice.actions
export default usersSlice.reducer
