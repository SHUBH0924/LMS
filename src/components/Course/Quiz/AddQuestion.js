import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../../../Auth/auth';  
import { FcQuestions } from "react-icons/fc";
import axios from 'axios';
import toast from 'react-hot-toast';
// import uuid from 'react-uuid';
// import FileUploader from '../../../hoc/fileHandler';

const AddQuestion = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const s = {
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
  }
  const [a, seta] = useState({
    question: "",
    answerSelectionType:"",
    answers:["ac","sdcsc"],
    ans:"",
    correctAnswer:1,
    point:0,
  })

  const handleSubmit = () => {
    props.createNewQuiz({ a })
    // seta({
    //   ...a,
    //   quizTitle: "",
    //   quizSynopsis: "",
    //   questions: []
    //   // grades: 0,     
    // })
    setShowModal(!showModal)
  }

  const addAnswer = (e) =>{
    e.preventDefault()
    let ar = a.answers
    ar.push(a.ans)
    console.log(a)
    seta({ ...a, answers: ar})
  }


  return (
    <>

      <div className='relative mt-3 mx-auto'>
        <div className='absolute animate-pulse mt-4 mb-1 mr-1 bg-gradient-to-r from-red-700 to-purple-700  blur-lg opacity-80  inset-0'></div>
        <div className='relative  mt-4 mx-auto'>

          <button
            className="bg-gray-700 w-56 flex flex-row text-white active:bg-gray-800 select-none px-6 py-3 mt-3 rounded-md shadow hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <span className='flex items-center'>
              {/* <FcQuestions
                size={30}
              /> */}
            <span className='ml-4 font-bold text-lg mx-auto'>Add Qustion</span> 
            </span>
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed mx-auto inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-full md:w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t mx-auto">
                  <h3 className="text-3xl text-white font-semibold mx-auto">
                    Add Question
                  </h3>

                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">


                  <form class="space-y-10 w-full">
                    <div>
                      <label for="Question" class="block mb-2 text-sm font-medium text-gray-300">Question</label>
                      <input type="text" name="Question" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.question} onChange={e => seta({ ...a, question: e.target.value })} />
                    </div>
                    <div>
                      <label for="AnswerType" class="block mb-2 text-sm font-medium text-gray-300">AnswerSelectionType</label>
                      <select value={a.answerSelectionType} name="AnswerType" onChange={e => seta({ ...a, answerSelectionType: e.target.value })} className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
                          <option value="single">Single</option>
                          <option value="multiple">multiple</option>
                      </select>
                    </div>
                    <div>
                    <label for="Answer" class="block mb-2 text-sm font-medium text-gray-300">Answers</label>
                      {a.answers.map((item,key)=>{
                        return(
                          // <li>{item}</li>
                          <>
                              <div className="radio">
                                <label>
                                  <input type="radio" value={key} 
                                                checked={a.correctAnswer === key} 
                                                onChange={(e)=>{
                                                  // console.log(a.correctAnswer,key,e.target.value)
                                                  seta({...a,correctAnswer:e.target.value})
                                                }} 
                                                />
                                  {item}
                                </label>
                              </div>
                          </>
                        )
                      })}
                    </div>
                    <div>
                      <label for="Answer" class="block mb-2 text-sm font-medium text-gray-300">option</label>
                      <input type="text" name="Question" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.ans} onChange={e => seta({ ...a, ans: e.target.value })} />
                      <button onClick={addAnswer}>Done</button>
                    </div>
                    {/* <div> */}
                      {/* <label for="Quiz" class="block mb-2 text-sm font-medium text-gray-300">Description</label>
                      <textarea name="description" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.quizSynopsis} onChange={e => seta({ ...a, quizSynopsis: e.target.value })} /> */}
                    {/* </div> */}
                  </form>


                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" opacity-50 fixed inset-0 z-40"></div>
        </>
      ) : null}
    </>
  );


}

export default AddQuestion