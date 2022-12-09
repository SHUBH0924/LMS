import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Auth/auth'
import AddQuestion from './AddQuestion'
import toast from 'react-hot-toast'
import Header from '../../Header'
import Courses from '../Courses';

const QuizPage = () => {

    const [questionList, setQuestionList] = useState([])
    const location = useLocation();
    const QuizId = location.state.quizId
    const courseId = location.state.courseId
    const auth = useAuth()
    const [quizName, setQuizName] = useState()
    const [description, setDescription] = useState()
    const token = auth.token

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/quiz/${QuizId}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            setQuizName(res.data.quizname)
            setQuestionList(res.data.questionSet)
            setDescription(res.data.description)
        })
    }, [])


    const createNewQuestion = (a) => {
        axios.post(`${process.env.REACT_APP_SERVER}/quiz/addques/${QuizId}`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                toast.success('Question added ...')
                axios.get(`${process.env.REACT_APP_SERVER}/quiz/${QuizId}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    setQuizName(res.data.quizname)
                    setQuestionList(res.data.questionSet)
                    setDescription(res.data.description)
                })
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(a)
    }


    return (

        <div className='relative'>
            <div className='sticky top-0 z-20'>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                    <Courses />
                </div>
                <div className='flex flex-col w-full pb-20'>
                    <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                        {quizName}
                    </h1>
                    <hr className="w-3/5 mx-auto h-2 mb-5" />
                    <AddQuestion createNewAns={createNewQuestion} />
                    <p className='text-xl my-6 ml-40 text-black '>
                        {description}
                    </p>
                    {(questionList.length > 0) ?
                        questionList.map((items, key) => {

                            return (
                                <>
                                    <div className="py-4 px-4 rounded-xl max-h-max mt-5 select-none flex border w-4/5 mx-auto justify-center items-center bg-gray-50">
                                        <div className="w-full mx-6">
                                            <div className="flex mt-2">
                                                <p className="text-xl capitalize font-semibold text-black">Q - &ensp;{items.question}</p>
                                            </div>
                                            
                                                {console.log(items)}
                                                <div className="md:grid grid-cols-12 gap-2 mx-auto pb-3 w-4/5">
                                                    {items.options.map(i => {
                                                        return (
                                                                <div className="col-span-6">
                                                                    <div className="w-full">
                                                                        <input id={i.ansBody} type="radio" value="" name={items._id} className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                                                        <label for={i.ansBody} className="flex cursor-pointer  bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">{i.ansBody}</label>
                                                                    </div>
                                                                </div>
                                                                
                                                                )
                                                            })}
                                                </div>
                                            
                                        </div>
                                        {/* {(userRole==="Admin")&&<span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id,items._id)}>x</span>} */}
                                    </div>
                                </>
                            )
                        }) : null
                    }
                </div>
            </aside>
        </div>
    )
}

export default QuizPage