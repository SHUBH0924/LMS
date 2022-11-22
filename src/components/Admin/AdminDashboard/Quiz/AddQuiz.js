import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../Auth/auth';  
import { FcQuestions } from "react-icons/fc";
import axios from 'axios';
import toast from 'react-hot-toast';
// import uuid from 'react-uuid';
// import FileUploader from '../../../hoc/fileHandler';

const AddQuiz = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const [a, seta] = useState({
    quiz: "",
    grades: 0,
    
  })

  const AddQuiz = () => {
    props.createNewQuiz({ a })
    seta({
      ...a,
      quiz: "",
      grades: 0,
     
    })
    setShowModal(!showModal)
  }

  const auth = useAuth()
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = 'http://172.29.110.209:3000'
    
    const [AnnouncementList, setAnnouncementList] = useState([])
    

    useEffect(() => {
       
        axios.get(`${URL}/announcement/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if(res.status===200){
                setAnnouncementList(res.data)
            }
        }).catch(err => console.log(err))
    },[])

    
    const handleSubmission = (id,content,Title) => {
        
        const data = {
            'title':Title,
            'content':content,
            'courseId':slug
        }

            axios.post(`${URL}/announcement`, data , {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                toast.success("Announcement added!")
                console.log(res)
                axios.get(`${URL}/announcement/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status===200){
                        setAnnouncementList(res.data)
                    }
                }).catch(err => console.log(err))

                
            }).catch((err) => {
                    toast.error(err.message)
                    console.error('Error:', err);
                });

    };


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
              <FcQuestions
                size={30}
              />
            <span className='ml-4 font-bold text-lg'>Create Quiz   </span> 
            </span>
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-full md:w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-white font-semibold">
                    Create Quiz
                  </h3>

                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form class="space-y-10 w-full">
                    <div>
                      <label for="Quiz" class="block mb-2 text-sm font-medium text-gray-300">Quiz Name</label>
                      <input type="text" name="quiz" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.quiz} onChange={e => seta({ ...a, quiz: e.target.value })} />
                    </div>
                    <div>
                      <label for="Quiz" class="block mb-2 text-sm font-medium text-gray-300">Grades</label>
                      <input type="number" name="grades" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.grades} onChange={e => seta({ ...a, grades: e.target.value })} />
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
                    onClick={AddQuiz}
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

export default AddQuiz