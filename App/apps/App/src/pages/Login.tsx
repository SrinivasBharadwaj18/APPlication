import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/token/tokenSlice";
import { useAppDispatch } from "../hooks";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setSnack } from "../features/token/snackSlice";
import { login } from "../features/token/logSlice";

export default function Login(){
    const [name, setName] = useState<string>("")
    const[password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const BASE_API_URL = import.meta.env.VITE_BASE_URL



    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.name === "username"){ 
            setName(event.target.value)
        }
        else if(event.target.name === "password"){
            setPassword(event.target.value)
        }
    }
    function handleClick(event:any):void{
        event.preventDefault();
        axios.post(`${BASE_API_URL}auth/login`,{
            username: name,
            password: password
        })
        .then((res)=>{
            dispatch(setUser({token:res.data.Token, userid: res.data.userId}))
            dispatch(setSnack({message:"Logged In", severity: "success"}))
            dispatch(login())
            navigate("/Welcome")      
            
        })
        .catch(()=>{
            dispatch(setSnack({message:"Logging In Failed", severity:"error"}))
        })
           
    }

    return(
        <div className="Page">
            <div className="card">
        <header>
            <h1>Login</h1>
        </header>
        <form action="" onSubmit={handleClick}>
        <TextField required = {true} name="username" placeholder="username" value={name} id="margin-dense" margin="dense" onChange={handleChange}/>
        <TextField required = {true} name="password" placeholder="password" value={password} id="margin-dense" margin="dense" onChange={handleChange}/>
        <br /><br />
        <Button variant="contained" type="submit">Submit</Button>
        </form>
            </div>
        </div>
    )
}