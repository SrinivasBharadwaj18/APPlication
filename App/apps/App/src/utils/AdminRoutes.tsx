import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks"


export function AdminRoutes(){

    const restricted = useAppSelector((state)=> state.rest.restricted)

    return(
        <div>
        {!restricted.includes("create user")? <Outlet/> : <Navigate to={'/NoAccess'} replace />}
        </div>
    )
}