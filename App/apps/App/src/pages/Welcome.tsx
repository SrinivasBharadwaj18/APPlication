import { AxiosResponse } from "axios"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button'
import { addRest } from "../features/token/roleSlice"
import {User} from "../helpers/types"
import { buttonStyle } from "../styles/syles"
import APIService from "../services/api.service"


export function Welcome(){

    const [restricted, setRestricted] = useState<boolean>(false)
    const token = useAppSelector((state)=> state.user.token)
    const userId = useAppSelector((state)=> state.user.userid)
    const dispatch = useAppDispatch()
    const apiService = new APIService()
    const fieldNames: {to:string}[] = [
        {to: "uploadFile"},
        {to:"chatBot"},
        {to:"UpdateUser"}
    ]


    useEffect(()=>{
        apiService.get(`users/${userId}`,{  headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}
    
        )
        .then((res:AxiosResponse)=>{
            if(res.data.role){
                const restrictedFeatures = res.data.role.restrictedFeatures
                if (restrictedFeatures.includes('test')){
                    setRestricted(true)
                    dispatch(addRest({rest: restrictedFeatures}))
                }
            }
            dispatch(addRest({rest: []}))
        })

    },[])
    
    const [ask,Deliver] = useState(false)
    const [users, setUsers] = useState([])

    async function handleClick(){
        apiService.get(`users`,{  headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}

        )
        .then((res:AxiosResponse)=>{
            setUsers(res.data)
            Deliver(true)
        })
    }

    function showUsers(){
        if(ask){
            return(
            <table>
            <thead>
            <tr>
                <th>username</th>
                <th>emailId</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>role</th>
                <th>age</th>
            </tr>
            </thead>
            <tbody>

        {users.map((user:User) => 
            <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.emailid}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.role}</td>
            <td>{user.age}</td>
            </tr>)}
            </tbody>
        
        </table>
        )}  
    }



    return(
        <>
        <div className="welcomePage">
            <h1>Welcome</h1>
            {fieldNames.map((field,index) =>(
                <Button key={index} sx={buttonStyle} variant="contained"><Link style={{textDecoration:'none', color: "white"}} to={field.to}>{field.to}</Link></Button>
            ))}
            <Button sx={buttonStyle} variant="contained" onClick={handleClick}>users</Button>
            {!restricted && <Button style={{color:"white", width:'auto'}}  variant="contained"><Link style={{textDecoration:'none' , color: "white"}} to="CreateUser">CreateUser</Link></Button>}
            </div> 
            <br /><br />
            {showUsers()}
        </>
    )
}
