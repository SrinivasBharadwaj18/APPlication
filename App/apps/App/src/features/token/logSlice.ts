import { createSlice } from "@reduxjs/toolkit";

export interface logState{
    login: boolean

}
const initialState: logState ={
    login: false,

}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{

        login : (state) => {
            state.login = true
        },

        logout: (state) =>  {
            state.login = false
        }
    }
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer



