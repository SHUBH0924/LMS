import React, { useState } from 'react'
import { FcList } from "react-icons/fc";
import { useAuth } from "../Auth/auth";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import user from '../assets/user.png'
import image from '../assets/logo.png'


const NavBar = () => {
    let Links =[
        { name: "Dashboard", link: "/", role:"both"},
        { name: "Users", link: "/users", role:"Admin"},
        { name: "My Courses", link: "/courses", role:"Student"},
        // { name: "Profile", link: "/profile", role:"both"},
        // { name: "Calendar", link: "/calendar", role:"both"},
        { name: "Help", link: "/help", role:"both"},
    ];

    const Logout = { name: "Logout", link: "/Login", role:"both" }

   const Lgout = () =>{
    auth.logout()
                                
    toast.success("logged out")
    // History.push('/Login')
    }

    let [open,setOpen]=useState(false);

    const auth = useAuth()
    const userRole = auth.user
    const Navigate = useNavigate()

    const handleClick = () => {
        Navigate('/')
    }


  return (
    <div className=' shadow-md w-full mb-6 sticky top-0 left-0'>
      <div className='md:flex items-center xs:w-screen justify-between bg-gray-800 py-4 md:px-10 '>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-white invisible sm:visible '>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
            <img className="w-16 mb-2 " src={image} alt="Threat Guardian" />
        </span>
        <h1 className='text-3xl flex ml-4 capitalize'>Threat Guardians</h1>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
      <FcList name={open ? 'close':'menu'}
      
      />
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-white mr-6 mb-4 hover:border-b-2 border-gray-300 duration-100'>{link.name}</a>
            </li>
          ))
        }
        
      </ul>
      </div>
    </div>
  )
}

export default NavBar