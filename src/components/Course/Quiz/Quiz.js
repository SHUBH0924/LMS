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

function Quiz() {
    const [showModal, setShowModal] = useState(false)

    const [quiz,setQuiz] =  useState([{
        quizTitle: "React Quiz Component Demo",
        quizSynopsis: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
        // nrOfQuestions: "4",
        questions: [
          {
            "question": "How can you access the state of a component from inside of a member function?",
            "questionType": "text",
            "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
            "answerSelectionType": "single",
            answers: [
              "this.getState()",
              "this.prototype.stateValue",
              "this.state",
              "this.values"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "ReactJS is developed by _____?",
            "questionType": "text",
            "answerSelectionType": "single",
            answers: [
              "Google Engineers",
              "Facebook Engineers"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "ReactJS is an MVC based framework?",
            "questionType": "text",
            "answerSelectionType": "single",
            answers: [
              "True",
              "False"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "10"
          },
          {
            "question": "Which of the following concepts is/are key to ReactJS?",
            "questionType": "text",
            "answerSelectionType": "single",
            answers: [
              "Component-oriented design",
              "Event delegation model",
              "Both of the above",
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "30"
          },
          {
            "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
            "questionType": "photo",
            "answerSelectionType": "single",
            answers: [
              "https://dummyimage.com/600x400/000/fff&text=A",
              "https://dummyimage.com/600x400/000/fff&text=B",
              "https://dummyimage.com/600x400/000/fff&text=C",
              "https://dummyimage.com/600x400/000/fff&text=D"
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "What are the advantages of React JS?",
            "questionType": "text",
            "answerSelectionType": "multiple",
            answers: [
              "React can be used on client and as well as server side too",
              "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
              "React components have lifecycle events that fall into State/Property Updates",
              "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
            ],
            "correctAnswer": [1, 2, 4],
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
        ]
      } ])


    const createNewQuiz = ({a}) =>{
        setQuiz(oldarray=>[...oldarray,a])
    }

    const createNewQuestion = ({a}) =>{
      console.log(a)
    }
    
    return (
        <>
            <div className='relative'>
                <div className='sticky top-0 '>
                    <Header />
                </div>
                <aside className="flex">
                    {/* <Sidenav /> */}
                    <div className='flex -mt-6 '>
                                    <Courses />
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                            Quizzes
                        </h1>
                        <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                        <AddQuiz createNewQuiz={createNewQuiz} />
                        <h2 className='mt-5 mb-2 capitalize text-2xl ml-20 font-bold'>
                            Active Quizzes
                        </h2>
                        <hr className='w-1/4 ml-20 h-3' />
                        
                        {quiz ? (quiz.map((item,key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">

                                    <details  className="w-4/5  mx-auto mb-2 bg-gray-50 hover:bg-gray-100  rounded-3xl  ring-1 ring-gray-500 ">
                                    
                                        <summary className="item__preview__mod select-none transition px-6 capitalize text-xl text-black font-semibold py-6">
                                            {item.quizTitle}
                                            {/* <Link onClick={() => DeleteModule(item._id)}>
                                                <span className='item__preview__mod__del   float-right bg-red-500 text-center pt-1 text-black font-bold text-md -mt-2 h-9 w-9  rounded-full'>
                                                    X
                                                </span>
                                            </Link> */}
                                            
                                        </summary>
                                        <AddQuestion createNewQuiz={createNewQuestion} />
                                        <p>{item.quizSynopsis}</p>
                                        {   
                                            item.questions.map((items,key)=>{
                                                
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
                                            })
                                        }
            
                            </details>
                        </div>
                    )
                    })) : (
                    <div>
                        <h1 className='mt-6 mb-4 capitalize text-4xl mx-auto font-bold' style={{ textAlign: "center" }}>
                            There are no modules
                        </h1>
                    </div>
                    )
                    }


                    </div>
                   
                </aside>
                
            </div>
        </ >
    )
}


export default Quiz
