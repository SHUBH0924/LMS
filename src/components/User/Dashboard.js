import React from 'react'
import Card from '../Card/Card'
import Sidenav from '../Layout/Sidenav'
import { Link } from 'react-router-dom';

function Dashboard() {

    const course = [{
        Title:"Cybersecurity course for the beginners",
        Rate:5,
        price:599
    },
    {
        Title:"Cybersecurity course for the Intermediate",
        Rate:4.5,
        price:799
    },
    {
        Title:"Cybersecurity course for the Advance",
        Rate:4.5,
        price:999
    }
    ]


    return (
        <div className='flex flex-row relative bg-gray-300'>
        <aside className="flex gap-6 mb-3">
            <div className='fixed'>
                <Sidenav />
            </div>
            <div className='ml-80 relative'>
                    <h1 className='m-3 text-3xl text-gray-900 font-semibold '>
                        Popular Courses
                    </h1>
                    <hr/>
                    <div className="mt-3 flex flex-row mx-auto">
                        {course.map(item =>{
                            
                            return(
                                <Card item={item} Button="Purchase"/>
                            )
                        })}

                    </div> 

                    <h1 className='m-3 mt-6 text-3xl text-gray-900 font-semibold '>
                        Recommended Courses
                    </h1>
                    <hr />
                    <div className="mt-3 flex flex-row mx-auto">
                    {course.map(item =>{
                            
                            return(
                                <Card item={item} Button="Purchase"/>
                                )
                        })}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Dashboard;