import React, { useEffect, useState } from 'react'
import Sidenav from "../../../../Layout/Sidenav"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import NewModule from './NewModule';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../Auth/auth';
import DropFileInput from '../../Drag_Drop/DropFileInput';
import Header from '../../../../Header'
import Courses from '../../../../Course/Courses';
import { ImageConfig } from '../../../../ImageConfig';
import {useLocation} from 'react-router-dom';


const Module = (props) => {    
    
    
    const location = useLocation();
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = "http://172.29.232.251:3000"
    
    const [modules, setModules] = useState([])
    // {
    //     name:"C",
    //     lectures:[],
    //     _id:"jcvbwegiwevdskcvnwelvie"
    // }

    const [publish,setPublish] = useState()


    const createNewModule = ({ a }) => {


        // console.log(a)    
        // addModuleURL
        axios.post(`${URL}/addModule/${slug}`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                // setModules(modules => [...modules, a]);
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    // console.log(res.data)"http://172.29.233.109:3000/course"
                    if (res.data.modules.length > 0) {
                        setModules(res.data.modules)
                        // console.log(res.data.modules)
                    }
                }).catch(err => console.log("error"))

                toast.success("Module Created");
            } else {
                toast.error("unable to create Module")
            }
        }).catch(err => {
            toast.error("unable to create Module")
            console.log(err)
        })
        // console.log(unpublished_course)    
    }

    useEffect(() => {
        // moduleURL
        // console.log(location.state.Publish)
        if(location.state){
            setPublish(location.state.Publish)
        }
        axios.get(`${URL}/course/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res.data.modules.length > 0) {
                setModules(res.data.modules)
                console.log(res.data.modules)
            }
        }).catch(err => console.log("error"))
    },[])

    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsSelected(true);

    // };

    const handleSubmission = (id,selectedFile,content,Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('Title', Title);
        formData.append('content', content);
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)

        if (id) {
            // ${Lecture}/${id}
            axios.post(`${URL}/upload/${slug}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                // console.log(res.data);
                toast.success("Lecture added!")

                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    if (res.data.modules.length > 0) {
                        setModules(res.data.modules)
                        // console.log(res.data.modules)
                    }
                }).catch(err => console.log("error"))

                
            })
                .catch((error) => {
                    toast.error("There are some problem in network")
                    console.error('Error:', error);
                });
        } else {
            toast.error("Please select a file")
        }
    };

    const fileRemove = (ModuleId,LectureID) =>{
        console.log("course id",slug,"id",ModuleId,"key",LectureID)
        var payload = {
            courseId:slug,
            moduleId:ModuleId,
            lecId:LectureID
        }
        axios.delete(`${URL}/lecture`,{
            headers: {
                'Authorization': token
            },
            data:payload
        }).then(res=>{
            if(res.status === 200){
                toast.success("Lecture Deleted")
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    if (res.data.modules.length > 0) {
                        setModules(res.data.modules)
                        // console.log(res.data.modules)
                    }
                }).catch(err => console.log("error"))
            }
            console.log(res)
        }).catch(err=>{
            toast.error(err.message)
        })
    }


    const onPublish = () =>{
        axios.patch(`${URL}/course/publish`,{
            courseId:slug
        },{
            headers: {
                'Authorization': token
            },
        }).then(res=>{
            console.log(res)
            setPublish(!publish)
        }).catch(err=>{
            console.log(err)
        })
        // console.log(slug)
    }

    return (
        <>
        <div className='relative'>
        <div className='sticky top-0 z-10 '>
                <Header />
                </div>
                <aside className="flex">
                    <Sidenav />
                    
                    <div className='flex flex-col w-full'>
                        {(userRole === "Admin")&&<div className='flex flex-row justify-between'>
                            <NewModule createNewCourse={createNewModule} />
                            <div className='w-56 mr-12 mt-3 '>
                            <button 
                                className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onPublish}>{publish?"UnPublish":"Publish"}
                            </button>
                            </div>
                        </div>}
                        

                        {modules ? (modules.map((item,key) => {

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
                                                                {/* <p>{items.size}B</p> */}
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
                        }



                    </div>
                    <div className='flex'>
                        <Courses />
                    </div>
                </aside>
                
                </div>
        </>
    )
}

export default Module;