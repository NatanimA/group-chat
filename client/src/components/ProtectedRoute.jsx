import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = JSON.parse(localStorage.getItem('token'))
        if(!userToken || userToken === undefined){
            setIsLoggedIn(false)
            return navigate('/auth/login')
        }
        setIsLoggedIn(true)
    }

    useEffect(() => {
        checkUserToken()
    },[isLoggedIn])
    return (
        <>
            { isLoggedIn ? props.children: null}
        </>
    )
}

export default ProtectedRoute;
