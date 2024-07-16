import { useState } from "react";
import Login from "./Login";
import SignUp from "./CreateUser";


export function LandingPage(){

    const [choice, wantSignUp] = useState(false)
    const [option, wantLogin] = useState(false)
    function getSignup(){
        wantSignUp(true)
        wantLogin(true)

    }
    function getLogin(){
        wantLogin(false)
        wantSignUp(false)
    }


    return(
                <div>
                    {!choice && 
                    <div className="landing">
                        <Login/>
                        <div style={{paddingTop: "15px", color: "blue", textDecorationLine:"underline"}}>
                            <span onClick={getSignup}>
                            Signup
                            </span>
                        </div>
                    </div>
                    }

                    {option && 
                    <div className="landing">
                        <SignUp messageText="SignUp" RoleName="basic user" title="SignUp" />
                        <div style={{paddingTop: "10px", color: "blue", textDecorationLine:"underline"}} >
                            <span onClick={getLogin} >
                                Login
                            </span>
                        </div>
                    </div> }
                </div>
    )
}