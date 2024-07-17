// import axios from "axios";


// const Base = import.meta.env.VITE_BASE_URL
// function handleClick(event:any, name:string, password: string):void{
//     event.preventDefault();
//     axios.post(`${Base}auth/login`,{
//         username: name,
//         password: password
//     })
//     .then((res)=>{
//         setSignedIn("true")
//         dispatch(setUser({token:res.data.Token, userid: res.data.userId}))
//         dispatch(setSnack({message:"Logged In", severity: "success"}))
//         dispatch(login())
//         navigate("/Welcome")      
        
//     })
//     .catch((err)=>{
//         console.log(err)
//         dispatch(setSnack({message:"Logging In Failed", severity:"error"}))
//     })
       
// }