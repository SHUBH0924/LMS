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


const Announcement = (props) => {    
    
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = 'http://172.29.235.107:3000'
    
    const [AnnouncementList, setAnnouncementList] = useState([])
    // {
    //     name:"C",
    //     lectures:[],
    //     _id:"jcvbwegiwevdskcvnwelvie"
    // }

    // useEffect(() => {
       
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

    
    const handleSubmission = (id,content,Title) => {
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('content', content);

        if (id) {
            
            axios.post(`${URL}/upload/${slug}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                toast.success("Announcement added!")

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

                
            }).catch((error) => {
                    toast.error("There are some problem in network")
                    console.error('Error:', error);
                });
        } else {
            toast.error("Please select a Title")
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


    // const onPublish = () =>{
    //     axios.patch(`${URL}/course/publish`,{
    //         courseId:slug
    //     },{
    //         headers: {
    //             'Authorization': token
    //         },
    //     }).then(res=>{
    //         console.log(res)
    //         setPublish(!publish)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    //     // console.log(slug)
    // }

    

    return (
        <>
        <div className='relative'>
        <div className='sticky top-0 z-10 '>
                <Header />
                </div>
                <aside className="flex">
                <div className='flex -mt-6 '>
                        <Courses />
                    </div>
                    <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Announcement
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    <h2 className='mt-5 mb-2 text-xl ml-20 capitalize'>
                            Genral News and Announcement
                    </h2>
                    {/* <hr className='w-1/4 ml-20 h-3' /> */}
                        
                        {/* {modules ? (modules.map((item,key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">

                                    <details style={{"background-color":"#F8F9F9" }} className="w-4/5 mx-auto mb-2  rounded-lg ring-1 ring-gray-500 ">
                                        <summary className="px-6 capitalize text-xl text-black font-semibold py-6 ">
                                            {item.name}
                                        </summary>
                                        
                                        {
                                            
                                            item.lectures.map((items,key)=>{
                                                // console.log(items,key)
                                                return(
                                                    <>
                                                    
                                                    <div className="drop-file-preview__item mx-auto border-2 border-gray-600" style={{width:"80%"}} >
                                                    
                                                        <div className="flex flex-row drop-file-preview__item__details mx-auto mr-12 ml-4" style={{width:"100%"}} onClick={()=> 
                                                            Navigate(`/Page`,{state:{
                                                                                        type:items.type.split('/')[1], 
                                                                                        lectures:modules, 
                                                                                        lectureId:items._id,
                                                                                        courseId:slug,
                                                                                        moduleId:item._id
                                                                                    }}) 
                                                            }>
                                                            <img src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                                            <div className="drop-file-preview__item__info" >
                                                                <h2>{items.name}</h2>
                                                            </div>
                                                        </div>
                                                        {(userRole==="Admin")&&<span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id,items._id)}>x</span>}
                                                    </div>
                                                    </>  
                                                )
                                            })
                                        }
                                        


                                        {
                                            (userRole==="Admin")&&
                                            <div className='flex flex-col'>
                                                    <DropFileInput handleSubmission={handleSubmission} id={item._id}/>
                                            </div>
                                        }
                                    </details>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold' style={{ textAlign: "center" }}>
                                    There are no modules
                                </h1>
                            </div>
                        )
                        } */}



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