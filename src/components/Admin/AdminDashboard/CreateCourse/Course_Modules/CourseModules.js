import React, { useEffect, useState } from 'react'
import Sidenav from "../../../../Layout/Sidenav"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import NewModule from './NewModule';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../Auth/auth';
import DropFileInput from '../../Drag_Drop/DropFileInput';

const Module = (props) => {    
    
    const auth = useAuth()
    const token = auth.token
    const Navigate = useNavigate();
    const { slug } = useParams();
    const addModuleURL = `http://192.168.0.103:3000/addModule/${slug}`
    const moduleURL = `http://192.168.0.103:3000/course/${slug}`
    const Lecture = `http://192.168.0.103:3000/upload/${slug}`

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [Warning, setWarning] = useState("")

    const [modules, setModules] = useState(null)


    const createNewModule = ({ a }) => {


        // console.log(a)    
        axios.post(addModuleURL, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(res)
            if (res.status == 200) {
                setModules(modules => [...modules, a]);
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
        axios.get(moduleURL, {
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

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);

    };


    const handleSubmission = (id) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        // console.log(formData)
        // console.log(id)
        if (id && selectedFile) {
            axios.post(`${Lecture}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res.data);
                toast.success("Lecture added!")
                setSelectedFile(null)
                setIsSelected(false)
            })
                .catch((error) => {
                    console.error('Error:', error);
                    setWarning("file didn't uploaded")
                });
        } else {
            toast.error("Please select a file")
        }
    };

    

    return (
        <>

            <div className=' relative'>
                <aside className="flex">
                    <Sidenav />
                    <div className='flex flex-col w-full'>
                        <NewModule createNewCourse={createNewModule} />

                        {modules ? (modules.map(item => {

                            return (

                                <div className="container flex flex-col justify-center px-4 py-4 mx-auto md:p-8">

                                    <details className="w-full mb-1 bg-gray-600 rounded-lg ring-1 ring-blue-600">
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
                                                    {/* <button onClick={onFileOpen} >Button</button> */}
                                                </div>
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>


                                        <div className='flex flex-col'>

                                            {/* <span className=" max-w-4xl flex mx-auto justify-center w-full h-auto "> */}
                                                <DropFileInput handleSubmission={handleSubmission} id={item._id}/>

                                            {/* </span> */}




                                            
                                                <div className='flex items-center justify-end p-6'>
                                                    <button
                                                        className="mx-auto bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                                        type="button" onClick={() => handleSubmission(item._id)}>
                                                        Submit
                                                    </button>
                                                </div>
                                            
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