import { useState } from "react";
import Login from "./Login";
import SignUp from "./CreateUser";

export function LandingPage(){

    const [choice, setChoice] = useState<"login"| "signup">("login")
    
    function changeChoice(){
        choice ==="login"? setChoice("signup"): setChoice("login")
    }
    return(
            <div>
                {choice === "login"?
                <div className="landing">
                <Login/>
                <div style={{paddingTop: "15px", color: "blue", textDecorationLine:"underline"}}>
                    <span onClick={changeChoice}>
                    Signup
                    </span>
                </div>
            </div>
            :
            <div className="landing">
                <SignUp messageText="SignUp" RoleName="basic user" title="Sign Up" />
                <div style={{paddingTop: "10px", color: "blue", textDecorationLine:"underline"}} >
                    <span onClick={changeChoice} >
                        Login
                    </span>
                </div>
            </div> 
                }
            </div>
    )
}