import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";
import {useState} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import SimpleReactValidator from 'simple-react-validator';


function Register() {
    useEffect(() => {
        document.body.style.overflow = "hidden";
      }, []);
    const Navigate = useNavigate();
    const NavigateToLogin = () => {
        Navigate('/Login');
      };
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")    
    const [Cpassword,setCpassword] = useState("")
    // const [warning,setWarning] = useState("")
    const [phone,setPhone] = useState("")
    const simpleValidator = useRef(new SimpleReactValidator())

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            name:username,
            password:password,
            confirm_password:Cpassword,
            email:email,
            phone:phone
        }
        if (password !== Cpassword){
            console.log("")
            toast.error("Password didn't match")
        }else{
            axios.post("http://172.29.233.209:3000/register",data).then(
                res=>{
                    console.log(res)
                    if(res.status == 201){
                        toast.success("registered")
                        NavigateToLogin()
                    }
                }
                ).catch(e=>console.log(e))
            // console.log(data)
        }
    }
    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
           <div className="absolute top-28 left-64 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-purple-300 animate-blob rounded-full"></div>
        <div className="absolute top-28 right-64 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-pink-300 animate-blob animation-delay-2000 rounded-full"></div>
        <div className="absolute top-60 left-96 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-yellow-300 animate-blob animation-delay-4000 rounded-full"></div>
            <div className="py-12 px-12 bg-gray-100 rounded-2xl shadow-xl opacity-90 z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                    <hr className='mb-4'/>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-900 tracking-wide cursor-pointer">Register and
                        enjoy all the services</p>
                    {/* <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer" style={{color:"#FF0000"}}>{warning}</p> */}
                </div>
                <form method='post' autoComplete='true'>
                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={username.name} onChange={(e)=> setusername(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onBlur={()=>simpleValidator.current.showMessageFor('name')}/>
                    <em className='text-xs text-red-500'>{simpleValidator.current.message('name', username.name, 'required|alpha')}</em>
                    <input type="email" placeholder="Email Address" value={email.email} onChange={(e)=> setemail(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onBlur={()=>simpleValidator.current.showMessageFor('email')} />
                    <em className='text-xs text-red-500'>{simpleValidator.current.message('email', email.email, 'required|email' )}</em>
                    <input type="password" placeholder="Password" value={password.password} onChange={(e)=> setpassword(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onBlur={()=>simpleValidator.current.showMessageFor('Password')} />
                    <em className='text-xs text-red-500'>{simpleValidator.current.message('password', password.password, 'required|password' )}</em>

                    <input type="password" placeholder="Confirm password" value={password.Cpassword} onChange={(e)=> setCpassword(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onBlur={()=>simpleValidator.current.showMessageFor('email')} />
                    <em className='text-xs text-red-500'>{simpleValidator.current.message('password', password.password, 'required|password')}</em>
                    <input type="number" maxLength="12" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onBlur={()=>simpleValidator.current.showMessageFor('telephone')}/>
                    <em className='text-xs text-red-500'>{simpleValidator.current.message('phone', phone.num, 'required|number' )}</em>
                </div>
                </form>
                
                <div className="text-center mt-6">
                    <button onClick={handleSubmit} className="py-3 w-64 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600">Submit</button>
                    <p className="mt-4 text-sm">Already Have An Account? <span><button onClick={NavigateToLogin} className="py-3 w-50px text-l text-gray-900 bg-gray-100 rounded-2xl">Sign in</button></span>
                    </p>
                </div>
            </div>
           
        </div>
    )
}

export default Register;