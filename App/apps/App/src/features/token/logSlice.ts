import { createSlice } from "@reduxjs/toolkit";

export interface logState{
    login: boolean

}
const initialState: logState ={
    login: false,

}

export const logSlice = createSlice({
    name: 'log',
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

export const {login, logout} = logSlice.actions
export default logSlice.reducer



