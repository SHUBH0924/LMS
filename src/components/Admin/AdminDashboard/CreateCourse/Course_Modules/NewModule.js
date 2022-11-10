import React from 'react'
import { useState } from 'react'
import uuid from 'react-uuid';

const NewModule = (props) =>{
  const [showModal, setShowModal] = React.useState(false);
  const [a,seta] = useState({
        // _id:uuid(),
        name:"",
        desc:"",
        lectures:[]
    })

    const Create_Course = () =>{
        props.createNewCourse({a})
        seta({...a,
          name:"",
          desc:""
        })
        setShowModal(!showModal)
    }

  return (
    <> 
      <div className='w-56 ml-36 mt-3'>
        <button
          className="bg-blue-600 text-white active:bg-blue-400 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Create New Module
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-white font-semibold">
                    Create Module
                  </h3>
                  
                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form class="space-y-10 w-full">
                      <div>
                          <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">Module Name</label>
                          <input type="text" name="Course" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.name} onChange={e=>seta({...a,name:e.target.value})}/>
                      </div>
                      <div>
                          <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">Description</label>
                          <textarea name="Price" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.price} onChange={e=>seta({...a,desc:e.target.value})}/>
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
                    onClick={Create_Course}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
        

}

export default NewModule