import React from 'react'
import { useState } from 'react'
import uuid from 'react-uuid';
import FileUploader from '../../../hoc/fileHandler';

const Create_Course = (props) =>{
  const [showModal, setShowModal] = React.useState(false);
  
  const [a,seta] = useState({
        // _id:uuid(),
        name:"",
        license:"Private(CopyRight)",
        published:false,
        price:0,
        // imgFile:null
    })

    const Create_Course = () =>{
        props.createNewCourse({a})
        seta({...a,
            name:"",
            license:"Private(CopyRight)",
            published:false,
            price:0,
            imgFile:null
        })
        setShowModal(!showModal)
    }

    
  return (
    <>
    <div className='mt-2 mx-auto'>
      <button
        className="bg-blue-600 text-white active:bg-blue-400 font-bold uppercase text-sm px-6 py-3 mt-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Course
      </button>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-white font-semibold">
                    Create Course
                  </h3>
                  
                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form class="space-y-10 w-full">
                      <div>
                          <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">Course Name</label>
                          <input type="text" name="Course" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.name} onChange={e=>seta({...a,name:e.target.value})}/>
                      </div>
                      <div>
                          <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">Price</label>
                          <input type="number" name="Price" id="text" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.price} onChange={e=>seta({...a,price:e.target.value})}/>
                      </div>
                      <div>
                          <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">Content License</label>
                          <select name="cars" id="cars" class=" text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={a.license} onChange={e=>seta({...a,license:e.target.value})}>
                            <option selected>Choose type</option>
                              <option value="Private(CopyRight)">Private(CopyRight)</option>
                              <option value="Public">Public</option>
                              <option value="opel">Opel</option>
                              <option value="audi">Audi</option>
                            </select>
                      </div>
                      <div>
                          {/* <label for="Course" class="block mb-2 text-sm font-medium text-gray-300">/image</label> */}
                          {/* <input type="file" name="file" id="file" class=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required value={a.file} onChange={FileSet} /> */}
                          {/* <FileUploader
                            onFileSelectSuccess={(imgFile) => seta({...a,imgFile})}
                            onFileSelectError={({ error }) => alert(error)}
                          /> */}
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
          <div className=" opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
        

}

export default Create_Course