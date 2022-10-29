import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from "react";
import axios from "axios";
import { AuthProvider } from '../Auth/auth';
import { useAuth } from '../Auth/auth';


function Login() {
      useEffect(() => {
        document.body.style.overflow = "hidden";
      }, []);

      const auth = useAuth()
      
      const Navigate = useNavigate();
      const NavigateToRegister = () => {
        Navigate('/register');
      };

      const [email,setemail] = useState("")    
      const [password,setpassword] = useState("")
      const [warning,setWarning] = useState("")

      const handleSubmit = (e)=>{
            e.preventDefault();
            const data = {
                email:email,
                password:password,
            }

            axios.post("http://172.29.234.176:3000/login",data).then(res=>{
              console.log(res)

              
              if(res.data.status === "Authorised"){
                auth.login(res.data)
                  // if (res.data.role === "Admin"){
                  //   Navigate('/AdminDashboard');
                  // }
                  // if (res.data.role === "User"){
                    Navigate('/');
                  // }
              }
              else{
                setWarning("Invalid credentials")
              }
            }).catch(e=>{
              console.log(e)
              setWarning("Invalid credentials")
            });
        }


  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-green-600 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
        </div>
        <div className="absolute w-48 h-48 rounded-xl bg-green-600 -bottom-6 -right-10 transform rotate-12 hidden md:block">
        </div>
          <div className="py-12 px-12 bg-gray-300 rounded-2xl shadow-xl z-20">
            <div>
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Login</h1>
              <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Welcome Back
              </p>
              <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">{warning}
              </p>
            </div>
            <form action=''>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" value={email} onChange={(e)=> setemail(e.target.value)} />
              <input type="password" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" value={password} onChange={(e)=> setpassword(e.target.value)} />
            </div>
            </form>
            <div className="text-center mt-6">
              <button onClick={handleSubmit} className="py-3 w-64 text-xl text-white bg-green-500 rounded-2xl">Sign in</button>
              <p className="mt-4 text-sm">Need An Account? <span><button onClick={NavigateToRegister} className="py-3 w-50px text-l text-gray-700 bg-gray-300 rounded-2xl">Sign up</button></span>
              </p>
            </div>
          </div>
          <div className="w-40 h-40 absolute bg-green-600 rounded-full top-0 right-12 hidden md:block"></div>
          <div
            className="w-20 h-40 absolute bg-green-600 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
          </div>
      </div>
    </div>
  )
}

export default Login;
