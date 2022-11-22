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


const Syllabus = (props) => {    
    
    
    const location = useLocation();
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = 'http://172.29.110.209:3000'

    const [Syllabus, setSyllabus] = useState([])    


    // useEffect(() => {
    //     // moduleURL
    //     // console.log(location.state.Publish)
    //     if(location.state){
    //         setPublish(location.state.Publish)
    //     }
    //     axios.get(`${URL}/course/${slug}`, {
    //         headers: {
    //             'Authorization': token
    //         }
    //     }).then(res => {
    //         if (res.data.modules.length > 0) {
    //             setModules(res.data.modules)
    //             console.log(res.data.modules)
    //         }
    //     }).catch(err => console.log("error"))
    // },[])


    const handleSubmission = (id,selectedFile,content,Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('Title', Title);
        formData.append('content', content);
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)

        if (id&&Title.length>0) {
            // ${Lecture}/${id}
            axios.post(`${URL}/upload/${slug}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                // console.log(res.data);
                toast.success("Lecture added!")

                // axios.get(`${URL}/course/${slug}`, {
                //     headers: {
                //         'Authorization': token
                //     }
                // }).then(res => {
                //     if (res.data.modules.length > 0) {
                //         setModules(res.data.modules)
                //         // console.log(res.data.modules)
                //     }
                // }).catch(err => console.log("error"))

                
            })
                .catch((error) => {
                    toast.error("There are some problem in network")
                    console.error('Error:', error);
                });
        } else {
            toast.error("Please select a file")
        }
    };

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
                        
                        {Syllabus.length>0 ? (Syllabus.map((item,key) => {

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
                        }



                    {/* </div>   */}

                        {
                            (userRole==="Admin")?(
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

export default Syllabus;