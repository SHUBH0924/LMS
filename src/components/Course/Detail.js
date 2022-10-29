import React from 'react'
import Sidenav from '../Layout/Sidenav'
import { FcStart } from "react-icons/fc";

function Detail() {
    return (
        <div className='relative'>
            <aside className="flex">

                <Sidenav />


                <div className='flex flex-col w-full'>

                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        details
                    </h1>
                    <hr className="w-1/3 mx-auto" />
                    <div className='flex mx-auto container mt-3'>
                        <div className='row'>
                            <div className='col-4'>
                                <img src="/assets/course.png" className="h-80 w-100" alt="..." />
                            </div>
                            <div className='col-8'>
                                <h1 className='m-3 text-4xl text-gray-900 font-semibold '>
                                    Cybersecurity
                                </h1>
                                <hr />
                                <p className='text-lg ml-3 mt-3'>This course introduces students to the interdisciplinary field of cybersecurity by discussing the evolution of information security into cybersecurity, cybersecurity theory, and the relationship of cybersecurity to nations, businesses, society, and people. Students will be exposed to multiple cybersecurity technologies, processes, and procedures, learn how to analyze the threats, vulnerabilities and risks present in these environments, and develop appropriate strategies to mitigate potential cybersecurity problems.</p>
                                <p className='font-bold text-xl mt-3 ml-3'>Duration: 3 hrs</p>
                                <p className='font-bold text-xl mt-3 ml-3'>Total enrolled: 500 students</p>
                                <p className='font-bold text-xl mt-3 ml-3 mb-2'>Rating : 4.5/5</p>
                            </div>
                            <div className="flex flex-col mt-3 mb-64p-2 w-full max-w-5xl bg-white rounded-lg border shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700 float-left-top">

                                <h5 className="text-3xl mt-0 mb-3 font-bold leading-none text-gray-900 dark:text-white">
                                    Course Videos
                                </h5>
                                <hr />
                                <div className='flex flex-col'>
                                    <ul className="flex flex-col my-4 space-y-3">
                                        <li>
                                            <a href="#" className="flex items-center p-1 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <span className="flex-1 pl-2 mx-auto whitespace-nowrap">Introduction</span>
                                                <button className="py-0 flex justify-end hover:bg-red-700">
                                                    <FcStart
                                                        size={50}
                                                    />
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center p-1 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">

                                                <span className="flex-1 pl-2 mx-auto whitespace-nowrap">Lecture 1</span>
                                                <button className="py-0 flex justify-end hover:bg-red-700">
                                                    <FcStart
                                                        size={50}
                                                    />
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center p-1 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <span className="flex-1 pl-2 mx-auto whitespace-nowrap">Lecture 2</span>
                                                <button className="py-0 flex justify-end hover:bg-red-700">
                                                    <FcStart
                                                        size={50}
                                                    />
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center p-1 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <span className="flex-1 pl-2 mx-auto whitespace-nowrap">Lecture 3</span>
                                                <button className="py-0 flex justify-end hover:bg-red-700">
                                                    <FcStart
                                                        size={50}
                                                    />
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </aside>
        </div>
    )
}

export default Detail;
