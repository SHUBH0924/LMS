import {createContext,useContext,useState } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const [userName,setUserName] = useState(null)
    const [token,setToken] = useState(null)
    // const Navigate = useNavigate()
    
    const login = (UserData) =>{
        // console.log(UserData)
        setUserName(UserData.username)
        setuser(UserData.role)
        setToken(UserData.token)
        Cookies.set('userRole',UserData.role, { expires: 1,secure: true })
        Cookies.set('token',UserData.token, { expires: 1,secure: true })
        Cookies.set('userName',UserData.username, { expires: 1,secure: true })
    }

    const isAuthenticate = () =>{
        const userData = Cookies.get('userRole')
        const Token = Cookies.get('token')
        const username = Cookies.get('userName')
        // console.log(userName)
        if(userData){
            setuser(userData)
            setToken(Token)
            setUserName(username)
        }
    }

    const logout = (user) =>{
        setuser(null)
        setToken(null)
        setUserName(null)
        Cookies.remove('userRole')
        Cookies.remove('token')
        Cookies.remove('userName')
        // Navigate('/')
    }

    return(
        <AuthContext.Provider value={{user,login,logout,isAuthenticate,token,userName}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () =>{
    return useContext(AuthContext)
}