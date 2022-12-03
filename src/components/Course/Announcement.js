import React, { useEffect, useState } from 'react'
import Sidenav from "../Layout/Sidenav"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Auth/auth';
import DropFileInput from '../Admin/AdminDashboard/Drag_Drop/DropFileInput';
import Header from '../Header'
import Courses from '../Course/Courses';
import { ImageConfig } from '../ImageConfig';
import {useLocation} from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";


const Announcement = () => {    
    
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER
    
    const [AnnouncementList, setAnnouncementList] = useState([])
    

    useEffect(() => {
       
        axios.get(`${URL}/announcement/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if(res.status===200){
                setAnnouncementList(res.data)
            }
        }).catch(err => console.log(err))
    },[])

    
    const handleSubmission = (id,content,Title) => {
        
        const data = {
            'title':Title,
            'content':content,
            'courseId':slug
        }

            axios.post(`${URL}/announcement`, data , {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                toast.success("Announcement added!")
                console.log(res)
                axios.get(`${URL}/announcement/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status===200){
                        setAnnouncementList(res.data)
                    }
                }).catch(err => console.log(err))

                
            }).catch((err) => {
                    toast.error(err.message)
                    console.error('Error:', err);
                });

    };

    const fileRemove = (AnnouncementId) =>{

        axios.delete(`${URL}/announcement/${AnnouncementId}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            if(res.status === 200){
                toast.success("Announcement Deleted")
                axios.get(`${URL}/announcement/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status===200){
                        setAnnouncementList(res.data)
                    }
                }).catch(err => console.log(err))
                
            }
            console.log(res)
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    return (
        <>
        <div className='relative'>

        <div className='sticky top-0 z-10 '>
                <Header />
                </div>
                <aside className="flex">
                <div className='flex -mt-6 '>
                        <Courses courseId={slug}/>
                    </div>
                    <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            announcement
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                    <h2 className='mt-5 mb-2 text-xl ml-28 capitalize'>
                            Genral News and Announcement
                    </h2>
                    <hr className='w-1/4 ml-20 h-3' />
                        
                        {AnnouncementList.length>0 ? (AnnouncementList.map((item,key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">
                                    <div className='flex w-4/5 group mx-auto select-none h-max py-6 px-6 mb-10 flex-col rounded-lg bg-[linear-gradient(135deg,_#ffe4e1_50%,_#f5f5dc_40%)] text-black'>
                                        <div className='flex flex-row'>    
                                            <h1 className=' select-none px-7 mb-3 underline underline-offset-8 capitalize text-3xl text-black font-semibold mx-auto'>
                                                {item.title}
                                            </h1>
                                            {(userRole==='Admin')?
                                            <span className=" float-right ease-in-out transition-all duration-200 delay-150 invisible group-hover:visible bg-red-500 rounded-full w-8 h-8  text-white" onClick={() => fileRemove(item._id)}>
                                                <AiOutlineClose size={23} className="mx-auto mt-1"/>
                                            </span>:null}
                                            
                                        </div>
                                        
                                        <div 
                                            className='ml-12 mr-12 mb-8 text-lg mt-4 '
                                            dangerouslySetInnerHTML={{ __html: item.content }} 
                                        />
                                    </div>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-3xl mx-auto font-semibold text-gray-500' style={{ textAlign: "center" }}>
                                    There are no Announcements
                                </h1>
                            </div>
                        )
                        }



                    {/* </div>   */}

                        {
                            (userRole==="Admin")?(
                            <div className='flex flex-col'>
                                    <DropFileInput handleSubmission={handleSubmission} id={slug}/>
                            </div>):null
                        }
                    </div>
                   
                </aside>
                
                
                </div>
        </>
    )
}

export default Announcement;