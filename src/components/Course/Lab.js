import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Courses from '../Course/Courses';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Auth/auth'
import Cookies from 'js-cookie'

const Labs = () =>{
    const { slug } = useParams();
    // const token = Cookies.get('token')
    // // const userRole = Cookies.get('userRole')
    // // const auth = useAuth()
    // // const token = auth.token  
    // const [quizzes,setQuizzes] = useState([])

    // useEffect(()=>{
    //     axios.get(`${process.env.REACT_APP_SERVER}/grades/${slug}`,{
    //         headers: {
    //             'Authorization': token
    //         }
    //     }).then(res=>{
    //         console.log(res)
    //         if(res.data.quizzes){
    //             setQuizzes(res.data.quizzes)
    //         }
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // },[])
    
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };

    return(
        <>
        <div className='relative select-none'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                    <Courses courseId={slug}/>
                </div>
                
                <div className='w-64 mt-8 mx-auto flex'>
                    <button
                    className="bg-blue-600 text-white h-16 active:bg-blue-400 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => openInNewTab("https://labs.megaproject.live/#/cast/lab")}
                    >

                    Start machine
                    
                    </button>
                </div>
            </aside>
            
        </div>
        </>
    )
}

export default Labs;