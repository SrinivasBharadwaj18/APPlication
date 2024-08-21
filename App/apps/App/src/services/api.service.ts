import axios, { AxiosResponse } from 'axios';
import { persistor } from '../store/store';
import { logout } from '../features/token/logSlice';
import { PURGE } from 'redux-persist';



export class APIService {
    private baseURL: string = import.meta.env.VITE_BASE_URL;
    
    public async  patch<T>(url: string, headers:any, requestBody: unknown,dispatch:any ): Promise<AxiosResponse<T>| undefined> {
        axios.interceptors.response.use((response)=>{
            return response
        },async (error)=>{
            if(error.response.status === 401)
            {
                // localStorage.clear()
                localStorage.removeItem('token')
                // window.location.reload()
            }
            return Promise.reject(error)
        })
    try{
        const response = await axios.patch<T>(`${this.baseURL}${url}`, requestBody, headers );
        return response;
    }
    catch(error:any){
        if(error.response.status === 401){
            // dispatch(logout())
            dispatch({ type: PURGE })
            await persistor.purge();
            persistor.flush().then((response:any)=> console.log(response))
            console.log("logging u out")
        }
    }
  }
}

//user clicks on the update
// gets a 401 response
// gets to the middleware before the going to the catch block
//you have a login state in redux which logs out the user on dispatch
//dispatch wont work on services
//1. you can find out how to use redux in the services
//2. figure out a way to create a logout process 
