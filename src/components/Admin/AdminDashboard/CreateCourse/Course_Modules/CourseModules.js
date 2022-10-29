import React, { useEffect, useState } from 'react'
import Sidenav from "../../../../Layout/Sidenav"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import NewModule from './NewModule';
import toast from 'react-hot-toast';

function Module(props) {

    const { slug } = useParams();
    const addModuleURL = `http://172.29.108.195:3000/addModule/${slug}`
    const moduleURL = `http://172.29.108.195:3000/course/${slug}`
    const Lecture = `http://172.29.108.195:3000/upload/${slug}`

    const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
    const [Warning,setWarning] = useState("")

    const [modules,setModules] = useState(null)


    const createNewModule = ({a}) =>{
        
        
        // console.log(a)    
        axios.post(addModuleURL,a).then(res=>{
            // console.log(res)
            if(res.status == 200){
                setModules(modules => [...modules, a]);
                toast.success("Module Created");
            }else{
                toast.error("unable to create Module")    
            }
        }).catch(err=>{
            toast.error("unable to create Module")
            console.log(err)
        })
        // console.log(unpublished_course)    
    }


    
    useEffect(()=>{
        axios.get(moduleURL).then(res=>{
            // console.log(res.data)"http://172.29.233.109:3000/course"
            if(res.data.modules.length > 0){
                setModules(res.data.modules)
                // console.log(res.data.modules)
            }            
            }).catch(err=>console.log("error"))
        },[])

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);

    };

   
    const handleSubmission = (id) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        // console.log(formData)
        // console.log(id)
        if(id && selectedFile){
            axios.post(`${Lecture}/${id}`,formData).then(res=>{
                console.log(res.data);
                toast.success("Lecture added!")
                setSelectedFile(null)
                setIsSelected(false)
            })
            .catch((error) => {
                    console.error('Error:',error);
                    setWarning("file didn't uploaded")
                });
        }else{
            toast.error("Please select a file")
        }
    };

    

    return (

        <>

        <div className=' relative'>
            <aside className="flex">
                <Sidenav />
                <div className='flex flex-col w-full'>
                    {/* <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold'>
                        Cybersecurity
                    </h1>
                    <hr className='w-1/3 mx-auto rounded-full h-2 bg-gradient-to-r from-blue-800' />
                    <div className='mt-5 mb-5 mx-auto'>
                        <img src="/assets/course.png" className="h-80 w-100" alt="..." />
                    </div>{
                        <Create_Course createNewCourse={createNewCourse}/>
                    }
                    <hr className='w-2/3 mx-auto rounded-full h-2 bg-gradient-to-r from-blue-800' /> */}
                    
                    
                        <NewModule createNewCourse={createNewModule}/>
                    
                    {modules ? (modules.map(item => {
                        
                        return(

                            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                            
                                <details className="w-full mb-11 bg-gray-500 rounded-lg ring-1 ring-blue-600">
                                    <summary className="px-4 text-white py-6">
                                        {item.name}
                                    </summary>
                                    
                                    <div>
                                            {isSelected ? (
                                                <div>
                                                    <p>Filename: {selectedFile.name}</p>
                                                    <p>Filetype: {selectedFile.type}</p>
                                                    <p>Size in bytes: {selectedFile.size}</p>
                                                    <p>
                                                        lastModifiedDate:{' '}
                                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p>Select a file to show details</p>
                                            )}
                                    </div>


                                    <label
                                        className=" max-w-4xl flex mx-auto justify-center w-full h-32  bg-gray-600 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                        <span className="flex items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="white" viewBox="0 0 24 24"
                                                stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="font-medium text-white">
                                                Drop files to Attach, or
                                                <span className="text-blue-400 ml-2 underline">browse</span>
                                            </span>
                                        </span>
                                        <input type="file" name="file_upload" className="hidden" onChange={changeHandler}/>
                                    </label>
                                        

                                    <div className='flex items-center justify-end p-6'>
                                    <button
                                        className="mx-auto bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                        type="button" onClick={()=>handleSubmission(item._id)}>
                                        Submit
                                    </button>
                                    </div>
                                </details>
                                </div>
                        )
        })):(
            <div>
            <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold' style={{textAlign:"center"}}>
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

export default Module