import React from 'react'
import Header from '../Header'
import Sidenav from '../Layout/Sidenav'
import Courses from './Courses'
import {useState, useEffect} from 'react'
import { useAuth } from '../../Auth/auth'

function Students() {

    // const URL = "http://localhost:3000"
    const auth = useAuth()
    const token = auth.token
    const [stud,setStud] = useState([
        {
            name:"Lauda singh",
            email:"Lund@Bhangkabhosda@mail.com"
        },
        {
            name:"Lauda singh",
            email:"Lund@Bhangkabhosda@mail.com"
        },
        {
            name:"Lauda singh",
            email:"Lund@Bhangkabhosda@mail.com"
        }
        


    ]);

    // useEffect(()=>{
    //     axios.get(`${URL}/user`,{
    //         Authentication : token
    //     }).then(res=>{
    //         setUser(res.data)
    //         // console.log(res.data)
    //     })
    // },[])
    



    return (
        <div className='relative'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex flex-row ">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                        <Courses />
                    </div>
                <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            enrolled students
                    </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                    <ul className='w-4/5 mt-12 ml-12 border-2 rounded-lg border-gray-900 divide-y divide-gray-900'>
                        
                        
                        {stud.map((user,key)=>{
                            return(
                                <li className='mt-2 mb-2'>
                                <div className='flex ml-3 items-center'>
                                    <div className='flex'>
                                        <img className='w-16 h-16 rounded-full' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg">
                                        </img>
                                    </div>
                                    <div class="flex-1 ml-4 ">
                                        <p class="text-lg font-medium text-gray-900 truncate">
                                            {user.name}
                                        </p>
                                        <p class="text-md text-gray-600">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div class="inline-flex mr-6 text-xl font-semibold text-gray-900">
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                            )
                        })}
                        
                        {/* <li className='mt-2 mb-2'>
                            <div className='flex ml-3 items-center'>
                                <div className='flex'>
                                    <img className='w-16 h-16 rounded-full' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg">
                                    </img>
                                </div>
                                <div class="flex-1 ml-4 ">
                                    <p class="text-lg font-medium text-gray-900 truncate">
                                        Tanmay Singh
                                    </p>
                                    <p class="text-md text-gray-600">
                                        tanmay@.com
                                    </p>
                                </div>
                                <div class="inline-flex mr-6 text-xl font-semibold text-gray-900">
                                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li> */}

                        <li className='mb-2'>
                            <div className='flex ml-3 mt-2 items-center'>
                                <div className='flex-shrink-0'>
                                    <img className='w-16 h-16 rounded-full' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg">
                                    </img>
                                </div>
                                <div class="flex-1 ml-4 ">
                                    <p class="text-lg font-medium text-gray-900 truncate">
                                        Vaibhav Mishra
                                    </p>
                                    <p class="text-md text-gray-600">
                                        vaibhav@.com
                                    </p>
                                </div>
                                <div class="inline-flex mr-6 text-xl font-semibold text-gray-900">
                                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
               
            </aside>
        </div>
    )
}

export default Students
