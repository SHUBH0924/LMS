import axios from 'axios'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { MdCategory } from 'react-icons/md'
import Header from '../../../Header'
import Sidenav from '../../../Layout/Sidenav'
import AddQuiz from './AddQuiz'
import Courses from '../../../Course/Courses'


function Quiz() {
    const [showModal, setShowModal] = useState(false)



    return (
        <Fragment>
            <div className='relative'>
                <div className='sticky top-0 '>
                    <Header />
                </div>
                <aside className="flex">
                    {/* <Sidenav /> */}
                    <div className='flex flex-row sticky top-24 left-0 -mt-6 '>
                                    <Courses />
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                            Quizzes
                        </h1>
                        <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                        <h2 className='mt-5 mb-2 capitalize text-2xl ml-20 font-bold'>
                            Active Quizzes
                        </h2>
                        <hr className='w-1/4 ml-20 h-3' />
                        <button
                            className="appearance-none w-36 block mx-auto bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none   ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >AddQuiz</button>
                        <AddQuiz isVisble={showModal} onClose={() => setShowModal(false)} >
                            <div className='py-6 px-6 lg:px-8 text-left'>
                                <h3 className='mb-4 text-xl font-medium text-gray-900'>
                                    Quizzes
                                </h3>
                                <form class="w-full max-w-sm">
                                    <div class="md:flex md:items-center mb-6">
                                        <div class="md:w-1/3">
                                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                Quiz Name
                                            </label>
                                        </div>
                                        <div class="md:w-2/3">
                                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="question" type="text" required="true" requiredMessage="Question is Mandatory" />
                                        </div>
                                    </div>
                                    <div class="md:flex md:items-center mb-6">
                                        <div class="md:w-1/3">
                                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                                Category
                                            </label>
                                        </div>
                                        <div class="md:w-2/3">
                                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="file" type="text" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="md:flex md:items-center">
                                        <div class="md:w-1/3"></div>
                                        <div class="md:w-2/3">
                                            <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setShowModal(false)}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </AddQuiz>

                    </div>
                   
                </aside>
                
            </div>
        </Fragment>
    )
}


export default Quiz
