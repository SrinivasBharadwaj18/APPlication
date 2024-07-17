import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../features/token/tokenSlice";
import { useAppDispatch } from "../hooks";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setSnack } from "../features/token/snackSlice";
import { login } from "../features/token/logSlice";

const Base = import.meta.env.VITE_BASE_URL
export default function Login(){
    const [name, setName] = useState("")
    const[password, setPassword] = useState("")
    const[signedIn, setSignedIn] = useState("false")
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    useEffect(()=>{
        <Navigate to={'/Welcome'} />
    },[signedIn])


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
        axios.post(`${Base}auth/login`,{
            username: name,
            password: password
        })
        .then((res)=>{
            setSignedIn("true")
            dispatch(setUser({token:res.data.Token, userid: res.data.userId}))
            dispatch(setSnack({message:"Logged In", severity: "success"}))
            dispatch(login())
            navigate("/Welcome")      
            
        })
        .catch((err)=>{
            console.log(err)
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