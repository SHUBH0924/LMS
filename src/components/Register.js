import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {useState} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

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
    const [warning,setWarning] = useState("")
    const [phone,setPhone] = useState("")

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
            setWarning("Password didn't match")
        }else{
            axios.post("http://192.168.0.103:3000/register",data).then(
                res=>{
                    console.log(res)
                    if(res.status == 201){
                        toast.success("registered")
                        NavigateToLogin()
                    }
                }
                )
            // console.log(data)
        }
    }
    return (
        <div className="min-h-screen bg-gray-800 flex justify-center items-center">
            <div className="absolute w-60 h-60 rounded-xl bg-green-600 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
            </div>
            <div className="absolute w-48 h-48 rounded-xl bg-green-600 -bottom-6 -right-10 transform rotate-12 hidden md:block">
            </div>
            <div className="py-12 px-12 bg-gray-300 rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Register and
                        enjoy all the services</p>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer" style={{color:"#FF0000"}}>{warning}</p>
                </div>
                <form action='http://172.29.111.23:3000/register' method='post'>
                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={username} onChange={(e)=> setusername(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e)=> setemail(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=> setpassword(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    <input type="password" placeholder="Confirm password" value={Cpassword} onChange={(e)=> setCpassword(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    <input type="number" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                </div>
                </form>
                <div className="text-center mt-6">
                    <button onClick={handleSubmit} className="py-3 w-64 text-xl text-white bg-green-500 rounded-2xl">Submit</button>
                    <p className="mt-4 text-sm">Already Have An Account? <span><button onClick={NavigateToLogin} className="py-3 w-50px text-l text-gray-700 bg-gray-300 rounded-2xl">Sign in</button></span>
                    </p>
                </div>
            </div>
            <div className="w-40 h-40 absolute bg-green-600 rounded-full top-0 right-12 hidden md:block"></div>
            <div
                className="w-20 h-40 absolute bg-green-600 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
            </div>
        </div>
    )
}

export default Register;
