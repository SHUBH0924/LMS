import {createContext,useContext,useState } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const [token,setToken] = useState(null)
    // const Navigate = useNavigate()
    
    const login = (UserData) =>{
        console.log(UserData.token)
        setuser(UserData.role)
        setToken(UserData.token)
        Cookies.set('userData',UserData.role, { expires: 1,secure: true })
        Cookies.set('token',UserData.token, { expires: 1,secure: true })
    }

    const isAuthenticate = () =>{
        const userData = Cookies.get('userData')
        const Token = Cookies.get('token')
        
        if(userData){
            setuser(userData)
            setToken(Token)
        }
    }

    const logout = (user) =>{
        setuser(null)
        setToken(null)
        Cookies.remove('userData')
        Cookies.remove('token')
        // Navigate('/')
    }

    return(
        <AuthContext.Provider value={{user,login,logout,isAuthenticate,token}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () =>{
    return useContext(AuthContext)
}