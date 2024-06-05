import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { refreshToken } from '../api/api'
import { useSelector } from "react-redux"
import Spinner from "./Spinner"
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = () => refreshToken();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
          try {
            await refresh()
          } catch (err) {
            console.error(err)
          } finally {
            isMounted && setIsLoading(false)
          }
        }
    
        !user?.token ? verifyRefreshToken() : setIsLoading(false)
        return () => isMounted = false
      
    }, [isLoading])
  return (
    <>
        {isLoading 
            ? <Spinner loading={isLoading} />
              : 
              <Outlet />
        }
    </>
  )
}

export default PersistLogin