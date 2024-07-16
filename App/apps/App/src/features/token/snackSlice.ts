import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { OverridableStringUnion } from '@mui/types'
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert';

export interface snackState{
    open : boolean
    message? : string
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
}
const initialState: snackState ={
    open : false,
    message: '',
    severity: undefined,
}

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers:{

        setSnack : (state, action: PayloadAction<{message: string , severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> }>) => {
            state.open = true
            state.message = action.payload.message
            state.severity = action.payload.severity
        },

        hideSnackbar: (state) => {
            state.open = false;
          },
    }
})

export const {setSnack, hideSnackbar} = snackSlice.actions
export default snackSlice.reducer



