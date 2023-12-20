import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import LoadingGIF from "./LoadingGIF"

const PrivateRoute = () => {
    const { loggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus) {
        return <LoadingGIF />
    }

  return (
    loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
  )
}

export default PrivateRoute