import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface userState{
    token: string
    userid: string
}
 /// there is an inital state to every state we create
const initialState: userState ={
    token: "",
    userid: "",
}

// here we are creating a slice, with the name tokenizer, which has a reducer
export const userSlice = createSlice({
    name: 'record',
    initialState,
    reducers:{ // reducers are just functions which are used to perform a function, the functions take state
        //and action as parameters. here the action

        setUser: (state, action: PayloadAction<{ token: string, userid: string }>) =>{

            state.token = action.payload.token     //we are setting the value of the payload to the state.token
            state.userid = action.payload.userid
        }
        
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer