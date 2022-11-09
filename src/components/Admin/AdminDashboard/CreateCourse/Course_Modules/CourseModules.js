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


const Module = (props) => {    
    
    const auth = useAuth()
    const token = auth.token
    const Navigate = useNavigate();
    const { slug } = useParams();
    const URL = "http://192.168.0.104:3000"
    const addModuleURL = `http://192.168.0.104:3000/addModule/${slug}`
    const moduleURL = `http://192.168.0.104:3000/course/${slug}`
    const Lecture = `http://192.168.0.104:3000/upload/${slug}`

    // const [selectedFile, setSelectedFile] = useState(null);
    // const [isSelected, setIsSelected] = useState(false);
    // const [Warning, setWarning] = useState("")

    const [modules, setModules] = useState([])


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
    }, [])

    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsSelected(true);

    // };

    const handleSubmission = (id,selectedFile) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        console.log(selectedFile)
        console.log(id)
        if (id && selectedFile) {
            // ${Lecture}/${id}
            axios.post(`${URL}/upload/${slug}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                // console.log(res.data);

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

                toast.success("Lecture added!")
                
            })
                .catch((error) => {
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

    return (
        <>

            <div className=' relative scrollbar-hide'>
            <div className='relative  '>
                <Header />
                </div>
                <aside className="flex z-10">
                    <Sidenav />
                    <div className='scrollbar-hide overflow-scroll '>
                        <Courses />
                    </div>
                    <div className='flex flex-col w-full'>
                        <NewModule createNewCourse={createNewModule} />

                        {modules ? (modules.map((item,key) => {

                            return (

                                <div className="container flex flex-col justify-center px-4 mx-auto p-4">

                                    <details className="w-full mb-1 bg-gray-600 rounded-lg ring-1 ring-blue-600">
                                        <summary className="px-6 capitalize text-white font-semibold py-6">
                                            {item.name}
                                        </summary>
                                        {
                                            
                                            item.lectures.map((items,key)=>{
                                                // console.log(items,key)
                                                return(
                                                    <div className="drop-file-preview__item">
                                                        {/* <img src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                                                        {/* {item.type.split('/')[1]} */}
                                                        <div className="drop-file-preview__item__info">
                                                            <p>{items.name}</p>
                                                            {/* <p>{items.size}B</p> */}
                                                        </div>
                                                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id,items._id)}>x</span>
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        


                                        <div className='flex flex-col'>

                                            {/* <span className=" max-w-4xl flex mx-auto justify-center w-full h-auto "> */}
                                                <DropFileInput handleSubmission={handleSubmission} id={item._id}/>

                                            {/* </span> */}

                                            
                                        </div>
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
                </aside>
            </div>

        </>
    )
}

export default Module;