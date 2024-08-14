import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Button, Input, TextField } from "@mui/material"
import { setSnack } from "../features/token/snackSlice";
import {Form} from '../helpers/types'
import { APIService } from "../services/api.service";
import axios from "axios";

export default function UpdateUser(){
  
  const [ upstate, setUpState] = useState<Form>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    emailid: "",
    
  })
  
  const [age, setAge] = useState<number| string>("")
  const dispatch = useAppDispatch() 
  
  
  const token = useAppSelector((state)=> state.user.token)
  const userId = useAppSelector((state) => state.user.userid)
  
  
  const fieldNames: { name: string; value: string;}[]  = [
    { name: "username", value: upstate.username},
    { name: "firstname", value: upstate.firstname},
    { name: "lastname", value: upstate.lastname},
    { name: "emailid", value: upstate.emailid},
    { name: "password", value: upstate.password},
  ];
  
  function handleClick(event:any):void{
    event.preventDefault();
    const apiService:APIService = new APIService()
    if(token){
      apiService.patch(
      `auth/update`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userId : userId,
          "Content-Type": "application/json"
        }
    },
      {username: upstate.username, firstname:upstate.firstname , lastname: upstate.lastname, emailid:upstate.emailid, password: upstate.password , age:age},
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
    if (event.target.name === "age"){
      setAge(event.target.value)
  }
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
              <Input type = "number" aria-label="Demo input" placeholder="age" name="age" value={age}  onChange={handleChange} />
              <br />
              <br />
              <Button variant="contained" type="submit">Submit</Button>
              </form>
      </div>  
  )
}