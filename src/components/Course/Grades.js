import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Courses from '../Course/Courses';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Auth/auth'

const Grades = () =>{
    const { slug } = useParams();
    const [grades,setGrades] = useState([])
    const auth = useAuth()
    const token = auth.token  
    const [quizzes,setQuizzes] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER}/grades/${slug}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            setQuizzes(res.data.quizzes)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <>
        <div className='relative select-none'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                    <Courses courseId={slug}/>
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            Grades
                    </h1>
                
                    <ul className='w-2/3 mt-12 mx-auto border-2 border-gray-900 divide-y divide-gray-900'>
                            
                            {quizzes.map((user,key)=>{
                                return(
                                    <li className='mb-2'>
                                        
                                    <div className='flex ml-5 items-center'>
                                        <div className="flex-1 flex-row ml-4 ">
                                            <p className="text-lg font-medium text-gray-900 truncate">
                                                {user.quizName}
                                            </p>
                                            <p>{user.totalMarks}</p>
                                            <p>{user.obtMarks}</p>
                                        </div>
                                    </div>
                                    </li>
                                )
                            })}

                        </ul>
                        </div>
            </aside>
        </div>
        </>
    )
}

export default Grades;