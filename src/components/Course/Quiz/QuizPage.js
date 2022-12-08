import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../../Auth/auth'
import AddQuestion from './AddQuestion'

const QuizPage = () =>{

    const [questionList,setQuestionList] = useState([{
        question:"Whats is the solution",
        answers:["Hello","world"]
    }])
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


    const createNewQuestion = ({a}) =>{
        console.log(a)
      }

      
    return(
        <>
            <h1>{quizName}</h1>

            <AddQuestion createNewQuiz={createNewQuestion} />
            <p>{description}</p>
            {  (questionList)? 
            questionList.map((items,key)=>{
                
                return(
                    <>
                    
                    <div className="drop-file-preview__item mx-auto border-2 border-gray-500" style={{width:"80%"}} >
                    
                        <div className="drop-file-preview__item__details mx-auto mr-12 ml-4" 
                            style={{width:"100%"}} 
                            // onClick={()=> onPageOpen(item,items)}
                            >
                            {/* <img className="opacity-50 w-24" src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                            <div className="drop-file-preview__item__info" >
                                <h2>{items.question}</h2>
                                {/* <p>{items.size}B</p> */}
                            </div>
                            <div>
                            {items.answers.map(i=>{
                                return(
                                    
                                        <h2>{i}</h2>
                                    
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