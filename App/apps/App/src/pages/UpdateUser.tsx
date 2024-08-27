import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Button, Input, TextField } from "@mui/material"
import { setSnack } from "../features/token/snackSlice";
import {Form} from '../helpers/types'
import { AxiosResponse } from "axios";
import APIService from "../services/api.service";

const apiService:APIService = new APIService()
export default function UpdateUser(){

  const [ form, setForm] = useState<Form>({
    username: "",
    firstname: "",
    lastname: "",
    emailid: "",
    age: ""
    
  })
  useEffect(()=>{
    apiService.get(`users/${userId}`,{  headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }}
  )
  .then((res:AxiosResponse)=>{
    const userDetails = res.data
    setForm({username:userDetails.username,firstname: userDetails.firstname,lastname: userDetails.lastname, emailid: userDetails.emailid, age:userDetails.age })

  })
  }, [])
  
  const dispatch = useAppDispatch() 
  
  
  const token = useAppSelector((state)=> state.user.token)
  const userId = useAppSelector((state) => state.user.userid)
  
  
  const fieldNames: { name: string; value: string;}[]  = [
    { name: "username", value: form.username},
    { name: "firstname", value: form.firstname},
    { name: "lastname", value: form.lastname},
    { name: "emailid", value: form.emailid},
  ];
  
  function handleClick(event: { preventDefault: () => void; }):void{
    event.preventDefault();
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
      {username: form.username, firstname:form.firstname , lastname: form.lastname, emailid:form.emailid, age:parseInt(form.age)})
        .then(() => {
          dispatch(setSnack({message:'Updated Successfully', severity: 'success'}))
          
        })
        .catch(() => {
          dispatch(setSnack({message:"Updating Failed", severity:"error"}))
        });}
        
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

  }


  return(
      <div className="UserPage">
          <h1 style={{paddingBottom: "10px"}}>update User</h1>
          <form action="" onSubmit={handleClick}>
              {fieldNames.map((field ,index) => (
                <div className="field-item">
                  <TextField label={field.name}  key={index} name={field.name} placeholder={field.name} value={field.value} onChange={handleChange}/>
                </div>
              ))}
              <Input type = "number" aria-label="Demo input" placeholder="age" name="age" value={form.age}  onChange={handleChange} />
              <br />
              <br />
              <Button variant="contained" type="submit">Submit</Button>
              </form>
      </div>  
  )
}