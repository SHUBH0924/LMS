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
    const userRole = auth.user
    // const userId = auth.userId
    const [submited,setSubmited] = useState(false)
    const [ans,setans] = useState([])

    useEffect(() => {
        // auth.isAuthenticate()
        console.log(token)
        axios.get(`${process.env.REACT_APP_SERVER}/quiz/${QuizId}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                setQuizName(res.data.quizname)
                setQuestionList(res.data.questionSet)
                setDescription(res.data.description)
            }
            if(res.status === 208){
                setSubmited(true)
            }
        }).catch(error=>{
            console.log(error)
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

    const SubmitAnswer = (e) =>{
        // e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER}/quiz/addanswer`,{
            // studentId:userId,
            quizId:QuizId,
            answers:ans
        },{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            setSubmited(!submited)
        }).catch(err=>{
            console.log(err)
        })
    }

    const addAns = (e,questionKey,optionKey) =>{
        let tmp = ans;
        let obj = tmp.filter(i => (i.quesNo === questionKey))
        // console.log("obj",obj)
        if(obj.length === 0){
            obj.push({
                quesNo : questionKey,
                ans : [optionKey]
            })
            tmp.push(obj[0])
        }else{
            // console.log("pahle se hai : ",obj)
            const index = tmp.findIndex(object => {
                return object.quesNo === questionKey;
              });

            if(obj[0].ans.includes(optionKey)){
                tmp[index].ans.pop(optionKey)
                // obj[0].ans.pop(optionKey)
            }else{
                tmp[index].ans.push(optionKey)
                // obj[0].ans.push(optionKey)
            }
            // tmp.push(obj[0])
        }
        setans(tmp)
        // console.log(tmp)
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
                
                {!submited?
                
                <div className='flex flex-col w-full pb-20'>
                    <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                        {quizName}
                    </h1>
                    <hr className="w-3/5 mx-auto h-2 mb-5" />
                    {
                        userRole==="Admin"?(
                            <AddQuestion createNewAns={createNewQuestion} />
                        ):null
                    }
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
                                            
                                            <div className="md:grid grid-cols-12 gap-2 mx-auto pb-3 w-4/5">
                                                {items.options.map((i,keys) => {
                                                    return (
                                                            <div className="col-span-6">
                                                                <div className="w-full">
                                                                    <input 
                                                                            id={`${i.ansBody}+${items._id}`} 
                                                                            type="checkbox" 
                                                                            value={keys} 
                                                                            name={items._id} 
                                                                            onChange={e=>addAns(e,key,keys)}
                                                                            className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                                                    <label htmlFor={`${i.ansBody}+${items._id}`} className="flex cursor-pointer  bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">{i.ansBody}</label>
                                                                </div>
                                                            </div>
                                                            
                                                            )
                                                        })}
                                            </div>
                                            {userRole==="Admin"?(
                                                <div className="pb-3 w-4/5">
                                                    Correct Answer : 
                                                    <div>
                                                        {(items.options.filter(i=>(i.isCorrect)).map(i=>{
                                                            return <div>
                                                                {i.ansBody}
                                                            </div>
                                                        }))}
                                                    </div>
                                                </div>
                                                ):null
                                            }
                                        </div>
                                        {/* {(userRole==="Admin")&&<span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id,items._id)}>x</span>} */}
                                    </div>
                                </>
                            )
                        }) : null
                    }
                    {userRole === "Student" ? (
                    <div className='relative mx-auto' onClick={SubmitAnswer} >
                        {questionList.length > 0 ?<button
                            // onClick={SubmitAnswer} 
                            className="bg-gray-600 w-48 flex mx-auto text-white active:bg-gray-800 select-none px-6 py-3 mt-3 rounded-md shadow hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            Submit
                        </button>:null}
                    </div>):null}
                </div>
                : <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                        Quiz submitted
                    </h1> }
            </aside>
        </div>
    )
}

export default QuizPage