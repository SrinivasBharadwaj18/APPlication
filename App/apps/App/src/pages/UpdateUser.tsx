import axios from "axios"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Button, Input, TextField } from "@mui/material"
import { setSnack } from "../features/token/snackSlice";


const Base = import.meta.env.VITE_BASE_URL
export default function UpdateUser(){

    const [ upstate, setUpState] = useState({
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
        axios.patch(
            `${Base}auth/update`,
            {username: upstate.username, firstname:upstate.firstname , lastname: upstate.lastname, emailid:upstate.emailid, password: upstate.password , age:age},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                userId : userId,
                "Content-Type": "application/json"
              }
            },
          )
          .then((res) => {
            dispatch(setSnack({message:'Updated Successfully', severity: 'success'}))

          })
          .catch((err) => {
            console.error(err);
            dispatch(setSnack({message:"Updating Failed", severity:"error"}))
          });
          
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