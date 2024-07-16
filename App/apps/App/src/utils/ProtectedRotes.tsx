import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks"

import Links from "../components/Links"

export function ProtectedRotes(){

    const isLogin = useAppSelector((state)=> state.log.login)

    return(
        <>
        <Links />
        {isLogin? <Outlet/> : <Navigate to={'/'} replace />}
        </>
    )
}