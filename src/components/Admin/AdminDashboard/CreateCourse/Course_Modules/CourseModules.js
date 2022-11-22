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
// import {useLocation} from 'react-router-dom';
import  '../.././Drag_Drop/drop-file-input.css';
import { Link } from 'react-router-dom';

const Module = (props) => {    
    
    
    // const location = useLocation();
    const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER
    
    const [modules, setModules] = useState([])
    const [Enroll,setEnroll] = useState(false)
    const [publish,setPublish] = useState()
    const [ Title,setTitle] = useState()


    const createNewModule = ({ a }) => {


        // console.log(a)    
        // addModuleURL
        axios.post(`${URL}/course/addModule/${slug}`, a, {
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
                toast.error("Unable to create Module")
            }
        }).catch(err => {
            toast.error("Unable to create Module")
            console.log(err)
        })
        // console.log(unpublished_course)    
    }

    useEffect(() => {
        // moduleURL
        // console.log(location.state.Publish)
        // if(location.state){
        //     setPublish(location.state.Publish)
        // }
        axios.get(`${URL}/course/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            setPublish(res.data.published)
            setEnroll(res.data.enrolled)
            setTitle(res.data.name)
            setModules(res.data.modules)
            
        }).catch(err => console.log(err))
    },[])

    const handleSubmission = (id,selectedFile,content,Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('Title', Title);
        formData.append('content', content);
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)

        if (id&&(Title.length>0)&&(selectedFile||content.length>0)) {
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
            toast.error("Lecture must have a title and a content or file")
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
                        setModules(res.data.modules)
                    
                }).catch(err => console.log("error"))
            }
            // console.log(res)
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
            // console.log(res)
            setPublish(!publish)
        }).catch(err=>{
            console.log(err)
            toast.success(err.message)
        })
        // console.log(slug)
    }

    const EnrolCourse = () =>{
        // e.preventDefault()
        axios.patch(`${URL}/user/purchase`,{
            courseId:slug
        },{
            headers: {
                'Authorization': token
            },
        }).then(res=>{
            console.log(res)
            if(res.status===200){
                setEnroll(true)
                toast.success(res.data)
            }
            // console.log(res)
        }).catch(err=>{
            toast.error(err.response.data)
            // console.log(err)
        })
        
    }

    const onPageOpen = (moduleItem,lecItems) =>{
        if(Enroll || userRole==="Admin"){
            Navigate(`/Page`,{state:{
                type:lecItems.type.split('/')[1], 
                lectures:modules, 
                lectureId:lecItems._id,
                courseId:slug,
                moduleId:moduleItem._id,
                Title:lecItems.name
            }}) 
        }else{
            toast.error("Please Enroll the course")
        }
    }

    const DeleteModule = (ModuleId) =>{
        // console.log("course id",slug,"id",ModuleId)
        var payload = {
            courseId:slug,
            moduleId:ModuleId
        }
        axios.delete(`${URL}/course/deleteModule`,{
            headers: {
                'Authorization': token
            },
            data:payload
        }).then(res=>{
            console.log(res)
            if(res.status === 200){
                console.log(res)
                toast.success("Module Deleted")
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                        setModules(res.data.modules)
                    
                }).catch(err => console.log(err))
            }
            // console.log(res)
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    const DeleteCourse = () =>{
        

        axios.delete(`${URL}/course/${slug}`,{
            headers: {
                'Authorization': token
            }}).then(res=>{
                console.log(res)
                if(res.status === 200){
                    toast.success('Course Deleted')
                    Navigate('/')
                }

                }
        )
    }

    return (
        <>

        <div className='relative'>
        <div className='sticky top-0 z-10 '>
                <Header />
                </div>
                <aside className="flex flex-row">
                    {/* <Sidenav /> */}
                    
                    {
                        (Enroll||userRole === "Admin")?( 
                        <div className='flex flex-row sticky top-24 left-0 -mt-6 '>
                            <Courses courseId={slug}/>
                        </div>):null
                    }

                    <div className='flex flex-col w-full'>
                        <div className="px-6 select-none capitalize text-3xl text-black font-semibold py-6 mx-auto">
                             {Title}
                        </div>
                        <hr className="w-3/5 mx-auto h-2 mb-3" />
                        {
                            (userRole === "Admin")?
                                (<div className='flex flex-col w-4/6 mx-auto '>
                                    

                                    <div className='flex flex-row justify-between'>
                                        <div className='w-56 ml-4 mt-3 '>
                                        <button 
                                            className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500  focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={onPublish}>{publish?"UnPublish":"Publish"}
                                        </button>
                                        </div>
                                        
                                        
                                        <div className='w-56 -mr-10 mt-3 '>
                                        <button 
                                            className="bg-gradient-to-r from bg-red-500 to-red-600  focus:ring-red-4 focus:outline-none  text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => DeleteCourse()}
                                            >delete course
                                        </button>
                                        </div>
                                    </div>

                                    <hr className='mx-auto w-full my-4'/>

                                    <NewModule createNewCourse={createNewModule} />

                                </div>):null
                        }
                        

                        {modules ? (modules.map((item,key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">

                                    <details  className="w-4/5  mx-auto mb-2 bg-gray-50 hover:bg-gray-100  rounded-3xl  ring-1 ring-gray-500 ">
                                    
                                        <summary className="item__preview__mod select-none transition px-6 capitalize text-xl text-black font-semibold py-6">
                                            {item.name}
                                            <Link onClick={() => DeleteModule(item._id)}>
                                                <span className='item__preview__mod__del   float-right bg-red-500 text-center pt-1 text-black font-bold text-md -mt-2 h-9 w-9  rounded-full'>
                                                    X
                                                </span>
                                            </Link>
                                            
                                        </summary>
                                        
                                        {
                                            
                                            item.lectures.map((items,key)=>{
                                                
                                                return(
                                                    <>
                                                    
                                                    <div className="drop-file-preview__item mx-auto border-2 border-gray-500" style={{width:"80%"}} >
                                                    
                                                        <div className="flex flex-row drop-file-preview__item__details mx-auto mr-12 ml-4" 
                                                            style={{width:"100%"}} 
                                                            onClick={()=> onPageOpen(item,items)
                                                            }>
                                                            <img className="opacity-50 w-24" src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" />
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
                                                    <DropFileInput handleSubmission={handleSubmission} id={item._id} file={true}/>
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

                        {((userRole === "Student")&&(!Enroll))?(<div className='w-56 mx-auto'>
                            <button 
                                className="bg-gradient-to-r mb-9 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none  mr-1  ease-linear transition-all duration-150"
                                type="button"
                                onClick={EnrolCourse}>Enroll Now
                            </button>
                        </div>):null}

                    </div>
                    
                </aside>
                
                </div>
        </>
    )
}

export default Module;