import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    authUser: null
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
})

export const { setIsAuthenticated, setAuthUser } = AuthSlice.actions;
export default AuthSlice.reducer;