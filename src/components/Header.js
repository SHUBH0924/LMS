import React, { useState } from 'react'
import { FcList } from "react-icons/fc";
import { useAuth } from "../Auth/auth";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import user from '../assets/user.png'
import image from '../assets/logo.png'


const NavBar = () => {
  let menus = [
    { name: "Dashboard", link: "/", role: "both" },
    { name: "Users", link: "/users", role: "Admin" },
    { name: "My Courses", link: "/courses", role: "Student" },
    // { name: "Calendar", link: "/calendar", role:"both"},
    { name: "Help", link: "/help", role: "both" },
    { name: "Profile", link: "/profile", role: "both" },
  ];

  const Logout = { name: "Logout", link: "/Login", role: "both" }

  const Lgout = () => {
    auth.logout()

    toast.success("logged out")
    // History.push('/Login')
  }

  let [open, setOpen] = useState(false);

  const auth = useAuth()
  const userRole = auth.user
  const Navigate = useNavigate()

  const handleClick = () => {
    Navigate('/')
  }


  return (
    <div className=' shadow-md overflow-x-hidden mb-3 sticky top-0 left-0'>
      <div className='md:flex items-center xs:w-screen justify-between bg-gray-800 py-4 md:px-10 '>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
          text-white invisible md:visible '>
          <span className='text-3xl text-indigo-600 mr-1 pt-2'>
            <img className="w-16 mb-2 " src={image} alt="Threat Guardian" />
          </span>
          <h1 className='text-3xl invisible md:visible
          flex ml-4 capitalize'>Threat Guardians</h1>
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
          <FcList name={open ? 'close' : 'menu'}

          />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-8 mt-4 absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>

          {menus.map((menu, key) => {

            return (
              <>
                {
                  ((menu.role === "both") || (menu.role === userRole)) &&

                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs  ml-2 md:ml-5 uppercase font-bold leading-snug text-white hover:opacity-85"
                      to={menu.link}
                      key={key}
                    >
                      <button className="text-lg text-white hover:border-b-2 border-gray-300 font-medium w-24 h-12 ">{menu.name}</button>
                    </Link>
                  </li>
                }
              </>
            )
          })}







          {
            <li className="ml-2 md:ml-5">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-85"
                onClick={Lgout}
                to="/Login"
              >
                <button className="text-md px-3 mr-2 ml-4 bg-red-600 rounded-md py-2 flex items-center text-lg uppercase font-semibold  text-black ">{Logout.name}</button>
              </Link>
            </li>

          }

        </ul>
      </div>
    </div>
  )
}

export default NavBar