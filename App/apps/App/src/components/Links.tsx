import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/token/logSlice";
import { setSnack } from "../features/token/snackSlice";
import { reset } from "../features/token/roleSlice";

export default function Links(){

  const rest = Selector((state)=>state.rest.restricted)
  const loggedIn = useAppSelector((state)=> state.log.login)
  const dispatch = useAppDispatch()

  function handleClick(){
    dispatch(logout())
    dispatch(reset())
    dispatch(setSnack({message: "loggedOut", severity: "success"}))
  }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">APP</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!rest.includes("test") &&
                <li style={{paddingRight:"10px"}} className="nav-item">
                  <Link style={{textDecoration:'none'}} to="Test">Test</Link>
                </li>
              }
              {loggedIn && 
                <li className="nav-item" onClick={handleClick}>
                  <Link style={{textDecoration:'none'}} to="/">Logout</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
}