import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface userState{
    token: string
    userid: string
}
const initialState: userState ={
    token: "",
    userid: "",
}

export const userSlice = createSlice({
    name: 'record',
    initialState,
    reducers:{

        setUser: (state, action: PayloadAction<{ token: string, userid: string }>) =>{

            state.token = action.payload.token     
            state.userid = action.payload.userid
        }
        
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer