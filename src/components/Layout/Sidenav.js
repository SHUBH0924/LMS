import React, { useState } from "react";
import { FcList } from "react-icons/fc";
import { MdSpaceDashboard, MdQuiz, MdViewModule } from "react-icons/md";
import { RiCalendarFill, RiUser3Fill, RiMessage2Fill, RiSettings2Fill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";

const Sidenav = () => {
    const menus = [
        { name: "Dashboard", link: "/", icon: MdSpaceDashboard , role:"User"},
        { name: "Account", link: "/Login", icon: RiUser3Fill , role:"User"},
        { name: "Admin", link: "/AdminDashboard", icon: RiUser3Fill , role:"User"},
        { name: "Announcements", link: "/", icon: RiMessage2Fill ,role:"User"},
        { name: "Grades", link: "/", icon: SiGoogleanalytics, margin: true ,role:"User"},
        { name: "Courses", link: "/", icon: AiFillBook ,role:"User"},
        { name: "Settings", link: "/settings", icon: RiSettings2Fill ,role:"User"},
        { name: "Quizzes", link: "/", icon: MdQuiz ,role:"User", role:"User"},
        { name: "Calendar", link: "/", icon: RiCalendarFill, role:"User" },
        { name: "Modules", link: "/", icon: MdViewModule ,role:"User"},
        { name: "Logout", link: "/", icon: ImExit, role:"User" },
    ];
    const [open, setOpen] = useState(false);

    
    return (
        <section className="flex min-h-screen gap-2 overflow-hidden">
            <div
                className={`bg-[#0e0e31] min-h-fit ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4`}
            >
                <div className="py-3 flex justify-end ">
                    <FcList
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                
                <div className="mt-4 flex flex-col gap-4 ">
                    {menus?.map((menu, i) => (
                         <Link
                            to={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                        >

                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
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
                </div>
            </div>
        </section>
    );
};

export default Sidenav;
