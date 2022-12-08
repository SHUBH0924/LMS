import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../../Auth/auth'
import AddQuestion from './AddQuestion'
import toast from 'react-hot-toast'

const QuizPage = () =>{

    const [questionList,setQuestionList] = useState([])
    const location = useLocation();
    const QuizId = location.state.quizId
    const courseId = location.state.courseId
    const auth = useAuth()
    const [quizName,setQuizName] = useState() 
    const [description,setDescription] = useState() 
    const token = auth.token

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER}/quiz/${QuizId}`, {
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            setQuizName(res.data.quizname)
            setQuestionList(res.data.questionSet)
            setDescription(res.data.description)
        })
    },[])


    const createNewQuestion = (a) =>{
        axios.post(`${process.env.REACT_APP_SERVER}/quiz/addques/${QuizId}`,a,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            if(res.status==200){
                toast.success('Question added ...')
                axios.get(`${process.env.REACT_APP_SERVER}/quiz/${QuizId}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res=>{
                    console.log(res)
                    setQuizName(res.data.quizname)
                    setQuestionList(res.data.questionSet)
                    setDescription(res.data.description)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(a)
      }

      
    return(
        <>
            <h1>{quizName}</h1>

            <AddQuestion createNewAns={createNewQuestion} />
            <p>{description}</p>
            {  (questionList.length>0 )? 
            questionList.map((items,key)=>{
                
                return(
                    <>
                    
                    <div className="drop-file-preview__item mx-auto border-2 border-gray-500" style={{width:"80%"}} >
                    
                        <div className="drop-file-preview__item__details mx-auto mr-12 ml-4" 
                            style={{width:"100%"}} 
                            >
                            <div className="drop-file-preview__item__info" >
                                <h2>{items.question}</h2>
                            </div>
                            <div>
                            {console.log(items)}
                            {items.options.map(i=>{
                                return(
                                    <>
                                        <div>
                                            <list>{i.ansBody}</list>
                                        </div>
                                    </>
                                )
                            })}
                            </div>
                        </div>
                        {/* {(userRole==="Admin")&&<span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id,items._id)}>x</span>} */}
                    </div>
                    </>  
                )
            }):null
        }
        </>
    )
}

export default QuizPage