import React from 'react'
import Sidenav from './Layout/Sidenav'
import { FaPlay }  from "react-icons/fa";

function Copy() {
  return (
    <div className='relative'>
    <aside className="flex">
            <Sidenav />
        <div className='flex flex-col w-full'>


        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                            
                            <details className="w-full mb-11 bg-gray-200 rounded-lg ring-1 ring-blue-600">
                                <summary className="px-4 text-black py-6">
                                    Introduction
                                </summary>
                               
                                <hr className='border-4 mx-auto bg-black  w-full '/>
                                <div className='flex flex-row'>
                                < FaPlay 
                                   className='ml-8 mt-6'
                                />
                                <span>
                                <p className='ml-5 mt-5 font-semibold'>
                                    Cybersecurity first lecture for beginners
                                </p>
                                </span>
                                </div>   

                                 <div className='flex flex-row'>
                                < FaPlay 
                                   className='ml-8 mt-6'
                                />
                                <span>
                                <span className='flex flex-row'>
                                <p className='ml-5 mt-5 font-semibold'>
                                    Duration
                                </p>
                                <p className='ml-5 mt-5 text-gray-600 font-semibold'>
                                    : 45mins
                                </p>
                                </span>
                                </span>
                                </div>    

                                <div className='flex items-center justify-end p-6'>
                                <button
                                    className="mx-auto bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                    type="button">
                                    Get Started
                                </button>
                                </div>
                            </details>
                            </div>
            </div>
            </aside>
            </div>
  )
}

export default Copy
