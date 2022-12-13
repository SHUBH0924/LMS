import axios from 'axios'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { MdCategory } from 'react-icons/md'
import Header from '../../Header'
import Sidenav from '../../Layout/Sidenav'
import AddQuiz from './AddQuiz'
import Courses from '../Courses'
import AddQuestion from './AddQuestion'
import { useAuth } from '../../../Auth/auth'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import quizimg from '../../../assets/test.png'
import { Dna } from 'react-loader-spinner'
import './quiz.css';
import toast from 'react-hot-toast'

function Quiz() {
    const [showModal, setShowModal] = useState(false)
    const URL = process.env.REACT_APP_SERVER
    const auth = useAuth()
    const { slug } = useParams()
    const token = auth.token
    const userRole = auth.user
    const [quiz, setQuiz] = useState([])
    const Navigate = useNavigate()
    const [loading,setloading] = useState(true)

    useEffect(() => {

        axios.get(`${URL}/quiz/all`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res.data)
            setQuiz(res.data.quiz)
            setloading(false)
        }).catch(err=>{
            setloading(false)
            toast.error(err.message)
        })

    }, [])


    const createNewQuiz = ({ a }) => {
        axios.post(`${URL}/quiz`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
        })
        setQuiz(oldarray => [...oldarray, a])
    }



    const onPageOpen = (quizid) => {
        // if(Enroll || userRole==="Admin"){
        console.log(quizid)
        Navigate(`/QuizPage`, {
            state: {
                courseId: slug,
                quizId: quizid
            }
        })
    }

    return (
        <>
            <div className='relative select-none'>
                <div className='sticky top-0 z-20'>
                    <Header />
                </div>
                <aside className="flex">
                    {/* <Sidenav /> */}
                    <div className='flex -mt-6 '>
                        <Courses courseId={slug} />
                    </div>
                    <div className='flex flex-col z-10 w-full'>
                        <h1 className=' select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            quizzes
                        </h1>

                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        {userRole=="ADMIN"?
                            <AddQuiz createNewQuiz={createNewQuiz} />:null
                            }
                        <h2 className='mt-5 mb-2 capitalize text-2xl ml-20 font-bold'>
                            Active Quizzes
                        </h2>
                        <hr className='w-1/5 ml-12 h-3' />

                        {loading?
                           ( <Dna
                            visible={true}
                            height="120"
                            width="120"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                          />)
                        :
                          (quiz.length > 0 ? (
                            <div className="container flex-shrink-0 flex grid-flow-col justify-items-center px-4 w-full">
                                <div className="mx-auto md:w-full grid grid-col-1 sm:grid-cols-2 shrink-0 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:mx-auto w-full py-3">
                                    {quiz.map((item, key) => {
                                        return (
                                            <button className="wrapper  hover:scale-105 hover:duration-300 hover:transition-all duration-300 " onClick={() => onPageOpen(item._id)}>
                                                <div className="borders"></div>
                                                <div className="main-element relative bg-[linear-gradient(120deg,_#dafdff_50%,_#faeff5_50%)] px-3">
                                                    <img className='w-20 opacity-80 mx-auto mt-3 h-20 ' src={quizimg} alt="product image" />
                                                    <div className=" mt-3 capitalize font-semibold text-lg ">{item.quizname}</div>
                                                </div>
                                            </button>

                                            // <div className="container flex flex-col  px-5 mx-auto p-4" onClick={() => onPageOpen(item._id)}>
                                            //     {/* {console.log(item._id)} */}
                                            //     <div className="w-4/5  mx-auto mb-2 bg-gray-50 hover:bg-gray-100  rounded-3xl  ring-1 ring-gray-500 ">

                                            //         <div className="item__preview__mod select-none transition px-6 capitalize text-xl text-black font-semibold py-6">
                                            //             {item.quizname}
                                            //             {/* <Link onClick={() => DeleteModule(item._id)}>
                                            //                 <span className='item__preview__mod__del   float-right bg-red-500 text-center pt-1 text-black font-bold text-md -mt-2 h-9 w-9  rounded-full'>
                                            //                     X
                                            //                 </span>
                                            //             </Link> */}

                                            //         </div>



                                            //     </div>
                                            // </div>
                                        )

                                    })}
                                </div>
                            </div>
                        )
                            : (
                                <div>
                                    <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold' style={{ textAlign: "center" }}>
                                        There are no Quizzes
                                    </h1>
                                </div>
                            )
                          )
                        }
                    


                    </div>

                </aside>

            </div>
        </ >
    )
}


export default Quiz
