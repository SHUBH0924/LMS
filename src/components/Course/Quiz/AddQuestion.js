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
  const [question,setquestion] = useState("");
  const [options,setOptions] = useState([]);
  const [answerSelectionType,setanswerSelectionType] = useState("single")
  const [point,setPoint] = useState(0)

  const [a, seta] = useState({
    answerSelectionType:"single",
    ans:"",
    correctAnswer:-1,
    point:0,
  })

  const handleSubmit = () => {
    props.createNewAns({ 
        question,
        options,
        answerSelectionType,
        point
     })
    // seta({ ...a, 
    //       question: "",
    //       answerSelectionType:"single",
    //       ans:"",
    //       correctAnswer:-1,
    //       point:0,})
      setquestion("")
      setanswerSelectionType('single')
      setOptions([])
      setPoint(0)
      setShowModal(!showModal)
    // setOptions([])
  }

  const onRadioChange = (key,ansbody,iscorrect) => {
      let tmp = options
      tmp[key].isCorrect = iscorrect
      setOptions(tmp)
    }

  const addAnswer = (e) =>{
    e.preventDefault()
    const tmp = {
      ansBody:a.ans,
      isCorrect:false
    }
    setOptions(options=>[...options,{
      ansBody:a.ans,
      isCorrect:false
    }])
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
                      <label for="Question" className="block mb-2 text-sm font-medium text-gray-300">Question</label>
                      <input type="text" name="Question" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={question} onChange={e => setquestion(e.target.value)} />
                    </div>
                    <div>
                      <label for="AnswerType" className="block mb-2 text-sm font-medium text-gray-300">AnswerSelectionType</label>
                      <select value={answerSelectionType} name="AnswerType" onChange={e => setanswerSelectionType(e.target.value)} className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
                          <option value="single">Single</option>
                          <option value="multiple">multiple</option>
                      </select>
                    </div>
                    <div>
                    <label for="Answer" class="block mb-2 text-sm font-medium text-gray-300">Answers</label>
                      
                      {options.map((item,key)=>{
                        return(
                          // <li>{item}</li>
                          <>
                              <div className="radio">
                                <label>
                                  <input type="checkbox" 
                                          value={item.ansBody} 
                                          // checked={a.correctAnswer == key}
                                          onChange={()=>onRadioChange(key,item.ansBody,!item.isCorrect)}
                                            />
                                  {item.ansBody}
                                </label>
                              </div>
                          </>
                        )
                      })}
                    </div>
                    <div>
                      <label for="Answer" class="block mb-2 text-sm font-medium text-gray-300">Option</label>
                      <input type="text" name="Question" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.ans} onChange={e => seta({ ...a, ans: e.target.value })} />
                      <button onClick={addAnswer}>Done</button>
                    </div>
                    
                    <div>
                      <label for="Question" className="block mb-2 text-sm font-medium text-gray-300">Points</label>
                      <input type="number" name="grades" id="grades" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={point} onChange={e => setPoint(e.target.value )} />
                    </div>
                    
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