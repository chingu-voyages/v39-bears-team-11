import { createSlice } from "@reduxjs/toolkit";

// dummy user state
const initialState = {
    id: null,
    name: "John Doe",
    isOnline: false,
    isOffline: true
};

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                id: action.payload._id,
                name: action.payload.name,
                isOnline: true,
                isOffline: false
            }
        },
        logout: (state) => {
            return state.isOffline = true;
        }
    }
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;