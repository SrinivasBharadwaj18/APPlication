import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Button, Input, TextField } from "@mui/material"
import { setSnack } from "../features/token/snackSlice";
import {Form} from '../helpers/types'
import { APIService } from "../services/api.service";
import axios from "axios";

const Base = import.meta.env.VITE_BASE_URL
export default function UpdateUser(){

  const [ upstate, setUpState] = useState<Form>({
    username: "",
    firstname: "",
    lastname: "",
    emailid: "",
    age: ""
    
  })
  useEffect(()=>{
    axios.get(`${Base}users/${userId}`,{  headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }}
  )
  .then((res)=>{
    const userDetails = res.data
    setUpState({username:userDetails.username,firstname: userDetails.firstname,lastname: userDetails.lastname, emailid: userDetails.emailid, age:userDetails.age })

  })
  }, [])
  
  const dispatch = useAppDispatch() 
  
  
  const token = useAppSelector((state)=> state.user.token)
  const userId = useAppSelector((state) => state.user.userid)
  
  
  const fieldNames: { name: string; value: string;}[]  = [
    { name: "username", value: upstate.username},
    { name: "firstname", value: upstate.firstname},
    { name: "lastname", value: upstate.lastname},
    { name: "emailid", value: upstate.emailid},
  ];
  
  function handleClick(event:any):void{
    event.preventDefault();
    const apiService:APIService = new APIService()
    if(token){
      apiService.patch(
      `users/update`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userId : userId,
          "Content-Type": "application/json"
        }
    },
      {username: upstate.username, firstname:upstate.firstname , lastname: upstate.lastname, emailid:upstate.emailid, age:upstate.age},
      dispatch
  )
        .then(() => {
          dispatch(setSnack({message:'Updated Successfully', severity: 'success'}))
          
        })
        .catch(() => {
          dispatch(setSnack({message:"Updating Failed", severity:"error"}))
        });}
        
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setUpState((prev) => ({
      ...prev,
      [name]: value
    }));

  }


  return(
      <div className="UserPage">
          <h1 style={{paddingBottom: "10px"}}>update User</h1>
          <form action="" onSubmit={handleClick}>
              {fieldNames.map((field ,index) => (
                  <TextField style={{display: "block"}} key={index} name={field.name} placeholder={field.name} value={field.value} id="margin-dense" margin="dense" onChange={handleChange}/>
              ))}
              <Input type = "number" aria-label="Demo input" placeholder="age" name="age" value={upstate.age}  onChange={handleChange} />
              <br />
              <br />
              <Button variant="contained" type="submit">Submit</Button>
              </form>
      </div>  
  )
}