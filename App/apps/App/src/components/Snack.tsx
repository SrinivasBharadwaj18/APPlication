import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../hooks';
import { hideSnackbar } from '../features/token/snackSlice';


export default function Snack(){

    const dispatch = useAppDispatch()

    const {message, severity, open} = useAppSelector((state) => state.snack)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string)=> {
        if (reason === 'clickaway') {
            return;
          }
        dispatch(hideSnackbar())
      };


    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
        >
        {message}
        </Alert>
  </Snackbar>
    )
}