import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface snackState{
    restricted : string[]

}
const initialState: snackState ={
    restricted : [],

}

export const restSlice = createSlice({
    name: 'rest',
    initialState,
    reducers:{

        addRest : (state, action: PayloadAction<{rest:string[]}>) => {
            action.payload.rest.map((feature) => state.restricted.push(feature))
        },

        reset: (state) => {
            state.restricted = [];
          },
    }
})

export const {addRest, reset} = restSlice.actions
export default restSlice.reducer



