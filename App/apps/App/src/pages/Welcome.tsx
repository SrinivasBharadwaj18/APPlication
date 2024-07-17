import axios from "axios"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button'
import { addRest } from "../features/token/roleSlice"


type User = {
    _id:string,
    username:string,
    emailid:string,
    firstname:string,
    lastname:string,
    role:string
    age:string
}

const Base = import.meta.env.VITE_BASE_URL
export function Welcome(){

    const [restricted, setRestricted] = useState(false)
    const token = useAppSelector((state)=> state.user.token)
    const userId = useAppSelector((state)=> state.user.userid)
    const dispatch = useAppDispatch()


    useEffect(()=>{
        axios.get(`${Base}users/${userId}`,{  headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}
    
        )
        .then((res)=>{
            const restrictedFeatures = res.data.role.restrictedFeatures
            if (restrictedFeatures.includes('test')){
                setRestricted(true)
                dispatch(addRest({rest: restrictedFeatures}))
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const [ask,Deliver] = useState(false)
    const [users, setUsers] = useState([])

    async function handleClick(){
        axios.get(`${Base}users`,{  headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}

        )
        .then((res)=>{
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
            <Button variant="contained" onClick={handleClick}>users</Button>
            <Button variant="contained"><Link style={{textDecoration:'none', color: "white"}} to="UpdateUser">UpdateUser</Link></Button>
            {!restricted && <Button style={{color:"white"}}  variant="contained"><Link style={{textDecoration:'none' , color: "white"}} to="CreateUser">CreateUser</Link></Button>}
            </div> 
            <br /><br />
            {showUsers()}
        </>
    )
}
