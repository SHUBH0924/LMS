import React, { useEffect, useState, useRef } from 'react'
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
import JoditEditor from 'jodit-react';  


const Syllabus = (props) => {    
    
    
    const location = useLocation();
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    const editor = useRef(null)
    const [content,setContent] = useState('')
   
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER

    const [Syllabus, setSyllabus] = useState()    


    useEffect(() => {
        axios.get(`${URL}/course/syllabus/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if(res.status===200){
                setContent(res.data)
            }
        }).catch(err => console.log(err))
    },[])


    const handleSubmission = () => {
        const data = {
            'syllabus' : content
        }
        console.log(content)
        // console.log(id,selectedFile,content,Title)
        axios.post(`${URL}/course/syllabus/${slug}`, data , {
            headers: {
                'Authorization': token
            }
        }).then(res =>{
            console.log(res)
            toast.success("Syllabus added!")
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    // const fileRemove = (ModuleId,LectureID) =>{
    //     console.log("course id",slug,"id",ModuleId,"key",LectureID)
    //     var payload = {
    //         courseId:slug,
    //         moduleId:ModuleId,
    //         lecId:LectureID
    //     }
    //     axios.delete(`${URL}/lecture`,{
    //         headers: {
    //             'Authorization': token
    //         },
    //         data:payload
    //     }).then(res=>{
    //         if(res.status === 200){
    //             toast.success("Lecture Deleted")
    //             axios.get(`${URL}/course/${slug}`, {
    //                 headers: {
    //                     'Authorization': token
    //                 }
    //             }).then(res => {
    //                 if (res.data.modules.length > 0) {
    //                     setModules(res.data.modules)
    //                     // console.log(res.data.modules)
    //                 }
    //             }).catch(err => console.log("error"))
    //         }
    //         console.log(res)
    //     }).catch(err=>{
    //         toast.error(err.message)
    //     })
    // }




    

    return (
        <>
        <div className='relative'>
        <div className='sticky top-0 z-10 '>
                <Header />
                </div>
                <aside className="flex">
                    {/* <Sidenav /> */}
                    <div className='flex -mt-6 '>
                        <Courses courseId={slug}/>
                    </div>
                    <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Syllabus
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    
                    {/* <hr className='w-1/4 ml-20 h-3' /> */}
                        
                        {/* {Syllabus.length>0 ? (.map((item,key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">

                                    <details style={{"background-color":"#F8F9F9" }} className="w-4/5 mx-auto mb-2  rounded-lg ring-1 ring-gray-500 ">
                                        <summary className="px-6 capitalize text-xl text-black font-semibold py-6 ">
                                            {item.title}
                                        </summary>
                                        
                                        <div 
                                            className='ml-12 mr-12 mb-8'
                                            dangerouslySetInnerHTML={{ __html: item.content }} 
                                        />
                                    </details>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold' style={{ textAlign: "center" }}>
                                    Coming Soon...
                                </h1>
                            </div>
                        )
                        } */}



                    {/* </div>   */}
                    <div 
                        className='ml-12 mr-12 mb-8'
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />

                        {
                            (userRole==="Admin")?(
                                <div className='w-4/5 mt-4 mb-8 mx-auto'>
                                <JoditEditor 
                                    style={{height:"200px"}}
                                    ref={editor}
                                    value={content}
                                    onChange={newContent=>{
                                                setContent(newContent)
                                            }}
                                 />
                                <div>
                                    <button className="appearance-none w-36 block mx-auto bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none   ease-linear transition-all duration-150" id="update" type="submit" onClick={handleSubmission}>Submit</button>
                                </div>
                            </div>):null
                        }
                        
                    </div>
                    
                </aside>
                
                
                </div>
        </>
    )
}

export default Syllabus;