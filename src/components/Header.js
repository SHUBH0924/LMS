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
        <nav className="w-auto h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
            <div className=" flex  2xl:justify-between xl:justify-between lg:justify-between md:justify-center sm:justify-center xs:justify-center">
                <div>
                    <div className="flex items-center w-16 ml-6 mr-6 py-3">
                        
                            {/* <h2 className="text-2xl font-bold text-white">LOGO</h2> */}

                            <img className="w-16 xs:w-16" src={image} alt="Threat Guardian" />
                        

                    </div>
                </div>
                <div className="xl:visible lg:visible md:invisible sm:invisible xs:invisible ">
                    <h1 className="text-white capitalize text-start font-semibold mx-auto mt-4 text-5xl text-shadow-md">
                        Threat Guardians
                    </h1>
                </div>
                <div className="float-right xs:mr-3 ">
                    <div class=" mr-2 mt-6 ">
                        <form class="flex flex-row max-w-3xl mr-4">
                            <div class=" relative ">
                                <input type="text" id=" " class=" rounded-lg border-transparent py-2 px-4 bg-gray-600 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
                            </div>
                            <button class="flex-shrink-0 ml-3 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </nav>
    );
}