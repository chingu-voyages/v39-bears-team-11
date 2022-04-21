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
        login: (state) => {

        },
        logout: (state) => {

        }
    }
});

export const { login, logout } = usersSlice.actions