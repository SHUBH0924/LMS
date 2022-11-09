import React, { useState } from "react";

import {  MdQuiz,  } from "react-icons/md";
import {  RiPagesFill, RiDiscussFill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { SiGoogleanalytics, SiHomeadvisor } from "react-icons/si";
import { HiSpeakerphone } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";

const Courses = () => {
    const menus = [
        { name: "Home ", link: "/", icon: SiHomeadvisor , role:"User"},
        { name: "Announcements", link: "/", icon: HiSpeakerphone , role:"User"},
        { name: "Assignments", link: "/", icon: MdAssignment , role:"User"},
        { name: "Discussion", link: "/", icon: RiDiscussFill , role:"User"},
        { name: "Grades", link: "/", icon:  SiGoogleanalytics ,role:"User"},
        { name: "People", link: "/", icon: BsFillPeopleFill, margin: true ,role:"User"},
        { name: "Pages", link: "/", icon: AiFillBook ,role:"User"},
        { name: "Quizzes", link: "/", icon: MdQuiz ,role:"User", role:"User"},
        { name: "Syllabus", link: "/", icon: RiPagesFill, role:"User" },
    ];
    const [open] = useState(true);

    
  return (
    <div className='relative'>
    <aside className="flex">

        <section className="flex min-h-screen ">
            <div
                className="bg-[#232338] min-h-fit w-52  text-gray-300 "
            >

              <hr className=" h-1 rounded-full mt-4 bg-slate-300"/>  
                <div className="mt-6 flex flex-col gap-4 px-3">
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
    </aside>
    </div>
  )
}

export default Courses;
