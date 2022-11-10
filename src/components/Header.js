import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from '../assets/logo.png'


export default function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const Navigate = useNavigate()
    const handleClick = () => {
        Navigate('/')
    }
    return (
        <nav className="w-full lg:visible md:mx-auto sm:collapse h-24  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
            <div className=" flex justify-between ">
                <div>
                    <div className="flex items-center ml-6 mr-6 py-3">
                        <a href="javascript:void(0)">
                            {/* <h2 className="text-2xl font-bold text-white">LOGO</h2> */}

                            <img width="65px" src={image} alt="Threat Guardian" />
                        </a>

                    </div>
                </div>
                <div className="lg:visible md:invisible sm:invisible xs:invisible">
                    <h1 className="text-white capitalize text-start font-semibold mx-auto mt-4 text-5xl text-shadow-md">
                        Threat Guardians
                    </h1>
                </div>
                <div className="justify-items-end">

                    <ul className="mt-6 mr-4  flex flex-row">
                        {/* <li className="text-white hover:text-indigo-200">
                                <a href="javascript:void(0)">Home</a>
                            </li> */}
                        <li className="text-white mr-6 mt-2 border-black hover:text-indigo-200">
                            {/* <a href="javascript:void(0)">Dashboard</a> */}
                            <Link to="/">Dashboard</Link>

                        </li>
                        <li className="text-white mr-6 ml-2 mt-2 border-black hover:text-indigo-200">
                            <a href="https://threatguardians.com/home/about/" target="_blank">About US</a>
                        </li>
                        {/* <li className="text-white hover:text-indigo-200">
                                <a href="javascript:void(0)">Contact US</a>
                            </li> */}
                        <div class="block mr-2 ">
                            <form class="flex flex-row w-full max-w-sm mr-4">
                                <div class=" relative ">
                                    <input type="text" id=" " class=" rounded-lg border-transparent border border-gray-300 w-full py-2 px-4 bg-gray-600 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
                                </div>
                                <button class="flex-shrink-0 ml-3 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </ul>

                </div>
            </div>


        </nav>
    );
}