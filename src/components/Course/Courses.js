import React, { useState } from "react";

import {  MdQuiz,  } from "react-icons/md";
import {  RiPagesFill, RiDiscussFill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { SiGoogleanalytics, SiHomeadvisor } from "react-icons/si";
import { HiSpeakerphone } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/auth";


const Courses = ({courseId}) => {

    const auth = useAuth()
    const userRole = auth.user
    const menus = [
        { name: "Home ", link: "/", icon: SiHomeadvisor , role:"both"},
        { name: "Announcements", link: `/announcement/${courseId}`, icon: HiSpeakerphone , role:"both"},
        { name: "Assignments", link: `/assignment/${courseId}`, icon: MdAssignment , role:"both"},
        { name: "Discussion", link: `/discussion/${courseId}`, icon: RiDiscussFill , role:"both"},
        { name: "Grades", link: "/", icon:  SiGoogleanalytics ,role:"both"},
        { name: "Students", link: `/${courseId}`, icon: BsFillPeopleFill, margin: true ,role:"Admin"},
        { name: "Pages", link: "/", icon: AiFillBook ,role:"both"},
        { name: "Quizzes", link: "/quiz", icon: MdQuiz ,role:"both"},
        { name: "Syllabus", link: "/syllabus", icon: RiPagesFill, role:"both"},
    ];
    const [open] = useState(true);

    
  return (
    
      <section className="flex min-h-screen ">
            <div
                className="bg-[#232338] min-h-fit w-56  text-gray-300 "
            >

              <hr className=" h-1 mt-14 bg-slate-300"/>  
                <div className="mt-6 select-none flex flex-col gap-5 px-3">
                    {menus?.map((menu, i) => {
                        return(
                            <>
                        {((menu.role === "both") || (menu.role === userRole)) &&
                         <Link
                            to={menu.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-md  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                        >

                            <div>{React.createElement(menu.icon, { size: "20" })}</div>
                            <h2
                                
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu.name}
                            </h2>
                        </Link>}
                        </>     
                    )})}
                </div>
            </div>
        </section>
   
  )
}

export default Courses;
