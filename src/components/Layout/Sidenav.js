import React, { useState } from "react";
import { FcList } from "react-icons/fc";
import { FcPodiumWithSpeaker, FcServices, FcOpenedFolder, FcVoicePresentation, FcCalendar, FcExport, FcDatabase } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/auth";

const Sidenav = () => {
    const auth = useAuth()
    const menus = [
        { name: "Dashboard", link: "/", icon: FcDatabase , role:"User"},
        { name: "Account", link: "/Login", icon: FcPodiumWithSpeaker , role:"User"},
        { name: "My Courses", link: "/courses", icon: FcOpenedFolder ,role:"User"},
        { name: "Profile", link: "/profile", icon: FcServices ,role:"User"},
        { name: "Calendar", link: "/", icon: FcCalendar ,role:"User"},
        { name: "Help", link: "/settings", icon: FcVoicePresentation ,role:"User"},
        
    ];
    const Logout = { name: "Logout", link: "/Login", icon: FcExport, role:"User" }

    const [open, setOpen] = useState(false);

    const Lgout = () =>{
        auth.logout()
        // History.push('/Login')
    }

    
    return (
        <section className="flex min-h-screen gap-6 overflow-hidden">
            <div
                className={`bg-[#0e0e31] min-h-fit ${open ? "w-72" : "w-20"
                    } duration-500 text-gray-100 px-4`}
            >
                <div className="py-4 flex justify-end ">
                    <FcList
                        size={36}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                    
                </div>
                
                <div className="mt-4 flex flex-col gap-8 ">
                    {menus?.map((menu, i) => (
                        
                         <Link
                            to={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-md  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                        >

                            <div>{React.createElement(menu?.icon, { size: "28" })}</div>
                            <h2
                                
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                               
                    ))}
                    {
                        <Link
                        
                        onClick={Lgout}
                        // to="/Login"
                        // key={i}
                        className={` ${Logout?.margin && "mt-5"
                            } group flex items-center text-md  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                    >

                        <div>{React.createElement(Logout?.icon, { size: "28" })}</div>
                        <h2
                            
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            {Logout?.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"
                                } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                            {Logout?.name}
                        </h2>
                    </Link>
                    }


                </div>
            </div>
        </section>
    );
};

export default Sidenav;
