import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import image from '../assets/logo.png'


export default function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const Navigate = useNavigate()
    const handleClick = () =>{
     Navigate('/')   
    }
    return (
        <nav className="w-auto h-24  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
            <div className="justify-between  lg:max-w-8xl  md:flex  md:px-10">
                <div>
                    <div className="flex items-center justify-between py-3">
                        <a href="javascript:void(0)">
                            {/* <h2 className="text-2xl font-bold text-white">LOGO</h2> */}
                            
                            <img width="65px" src={image} alt="Threat Guardian" />
                        </a>
                        
                    </div>
                </div>

                    <h1 className="text-white capitalize text-start font-semibold mx-auto mt-4 text-5xl text-shadow-md">
                        Threat Guardians
                    </h1>

                <div>
                    
                        <ul className="items-center mt-8 justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            {/* <li className="text-white hover:text-indigo-200">
                                <a href="javascript:void(0)">Home</a>
                            </li> */}
                            <li className="text-white hover:text-indigo-200">
                                {/* <a href="javascript:void(0)">Dashboard</a> */}
                                <Link to="/">Dashboard</Link>

                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="https://threatguardians.com/home/about/" target="_blank">About US</a>
                            </li>
                            {/* <li className="text-white hover:text-indigo-200">
                                <a href="javascript:void(0)">Contact US</a>
                            </li> */}
                        </ul>

                    </div>
                </div>

            
        </nav>
    );
}