import React from 'react'
import Header from '../Header'
import Sidenav from '../Layout/Sidenav'

function Users() {
    return (
        <div className='relative'>
            <div className='sticky top-0 '>
                <Header />
            </div>
            <aside className="flex">
                <Sidenav />
                <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        users
                    </h1>
                    <hr className="w-1/4 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />

                    <hr className='w-full h-2 mt-6'/>
                    <div className='ml-20 mt-4 w-3/5'>
                    <ul className="items-center w-full border-2 text-gray-900 bg-white  border-gray-600 flex ">
                        <li className="w-full border-gray-800  border-r ">
                            <div className="flex items-center bg-gray-800 pl-3">
                                    <label for="Admin" className="py-3 ml-2 w-full text-xl font-semibold capitalize text-gray-100 ">Tanmay Singh</label>
                            </div>
                        </li>
                        <li className="w-full border-gray-600 border-b-0 border-r ">
                            <div className="flex items-center pl-3">
                                <input id="Admin" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "/>
                                    <label for="Admin" className="py-3 ml-2 w-full text-md font-medium text-gray-900 ">Admin</label>
                            </div>
                        </li>
                        <li className="w-full border-gray-600 border-b-0 border-r ">
                            <div className="flex items-center pl-3">
                                <input id="Educator" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "/>
                                    <label for="Educator" className="py-3 ml-2 w-full text-md font-medium text-gray-900 ">Educator</label>
                            </div>
                        </li>
                        <li className="w-full border-gray-600 border-b-0 ">
                            <div className="flex items-center pl-3">
                                <input id="Student" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "/>
                                    <label for="Student" className="py-3 ml-2 w-full text-md font-medium text-gray-900 ">Student</label>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Users
