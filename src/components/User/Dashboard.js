import {React,useState,useEffect} from 'react'
import axios from 'axios'

import Card from '../Card/Card'
import Sidenav from '../Layout/Sidenav'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/auth';


function Dashboard() {

    // const course = [{
    //     Title:"Cybersecurity course for the beginners",
    //     Rate:5,
    //     price:599
    // },
    // {
    //     Title:"Cybersecurity course for the Intermediate",
    //     Rate:4.5,
    //     price:799
    // },
    // {
    //     Title:"Cybersecurity course for the Advance",
    //     Rate:4.5,
    //     price:999
    // }
    // ]

    const backendServer = `http://172.29.234.176:3000/courses`
    const [course,setCourse] = useState([])
    useEffect(()=>{
        axios.get(backendServer).then(res=>{
            // console.log(res.data)
            setCourse(res.data)
            console.log(res.data) 
            })
        },[])




    return (
        <div className='relative'>
        <aside className="flex">
            
                <Sidenav />
            

            <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Popular courses
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 "/>
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-full py-6">
                            {course.map(item =>{
                                
                                return(
                                    <Card item={item} Button="Purchase"/>
                                )
                            })}
                        </div>
                    </div> 

                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Recommended courses
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 "/>
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-full py-6">
                            {course.map(item =>{
                                    
                                    return(
                                        <Card item={item} Button="Purchase"/>
                                        )
                                })}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Dashboard;