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


const Module = (props) => {    
    
    
    const location = useLocation();
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER

    const [AssignmentList, setAssignment] = useState([])    


    useEffect(() => {
       
        axios.get(`${URL}/assignment/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
                console.log(res.data)
                setAssignment(res.data)
          
        }).catch(err => console.log(err))
    },[])


    const handleSubmission = (id,selectedFile,content,Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('title', Title);
        formData.append('content', content);
        formData.append('courseId', slug);
        
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)
        
        if (id&&(Title.length>0)&&(selectedFile||content.length>0)) {
            
            axios.post(`${URL}/assignment`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res);
                toast.success("Assignment added!")

                axios.get(`${URL}/assignment/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    // if (res.data.modules.length > 0) {
                        setAssignment(res.data)
                        // console.log(res.data.modules)
                    // }
                }).catch(err => console.log("error"))

                
            })
                .catch((error) => {
                    toast.error(error.message)
                    console.error('Error:', error);
                });
        } else {
            toast.error("Lecture must have a title and a content or file")
        }
    };

    const fileRemove = (AssignmentId) =>{

        axios.delete(`${URL}/assignment/${AssignmentId}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            if(res.status === 200){
                toast.success("Assignment Deleted")
                axios.get(`${URL}/assignment/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status===200){
                        setAssignment(res.data)
                    }
                }).catch(err => console.log(err))
                
            }
            console.log(res)
        }).catch(err=>{
            toast.error(err.message)
        })
    }


    const onPageOpen = (title,content,id,hasFile) =>{
        // if(Enroll || userRole==="Admin"){
            console.log(title,id,hasFile)
            Navigate(`/assignment/page/${id}`,{state:{
                // type:lecItems.type.split('/')[1], 
                // lectures:modules, 
                Title:title,
                content:content,
                hasFile:hasFile
            }}) 
        // }else{
        //     toast.error("Please Enroll the course")
        // }
    }


    

    return (
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
                    <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                           assignment
                    </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                    
                    {/* <hr className='w-1/4 ml-20 h-3' /> */}
                        
                        {AssignmentList.length>0 ? (AssignmentList.map((item,key) => {

                            return (
                                <div className="container flex flex-col px-5 mx-auto p-4" onClick={()=>{onPageOpen(item.title,item.content,item._id,item.hasFile)}}>
                                    <div  className="w-3/5   mx-auto  bg-gray-50 hover:bg-gray-200 border-l-4 rounded-r-xl transition ease-in-out max-h-max duration-500 border-blue-700" >
                                        <div className="px-6 capitalize text-xl  text-black font-semibold py-6 ">
                                            ➤ &ensp;{item.title}
                                            {(true)?<span className="drop-file-preview__item__del mr-2" onClick={() => fileRemove(item._id)}>
                                                <AiOutlineClose size={23} />
                                            </span>:null}
                                        </div>
                                    </div>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-gray-500 text-4xl mx-auto font-semibold' style={{ textAlign: "center" }}>
                                    There are no Assignments
                                </h1>
                            </div>
                        )
                        }



                    {/* </div>   */}

                        {
                            (userRole==="Admin") || (userRole === "student")?(
                                
                            <div className='flex flex-col'>
                                
                                    <DropFileInput handleSubmission={handleSubmission} id={slug} file={true}/>
                            </div>):null
                        }
                    </div>
                    
                </aside>
                
                
                </div>
        </>
    )
}

export default Module;