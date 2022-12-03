import React, { useEffect, useState } from 'react';

import { useLocation,useParams } from 'react-router-dom';
import PDFViewer from '../Admin/AdminDashboard/CreateCourse/Course_Modules/Page/PDFViewer';
import axios from 'axios';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'
import { Input } from 'postcss';

const AssignmentPage = (props) => {

  const auth = useAuth()
  const userRole =  auth.user;
  const token = auth.token
  const location = useLocation();
  // const lec = location.state.assignmentDetail
  const URL = process.env.REACT_APP_SERVER
  const {assignmentId} = useParams()

  const [hasFile, setType] = useState(location.state.hasFile)

  const [content, setContent] = useState(location.state.content)
  const [Title, setTitle] = useState(location.state.Title)
  

  return (
    <>

      <div className='sticky  top-0 z-10 '>
        <Header />
      </div>
      <div className=' flex flex-row w-full overflow-x-hidden h-screen bg-white'>
        
        <div className=' flex flex-col w-full  mx-auto ' >

          <h1 className='text-4xl mx-auto mt-6 font-bold text-black '>
            {Title}
          </h1>
          <hr className='mt-8 w-3/5 mb-8 mx-auto' />
          
          <div 
            className='ml-12  mr-12 mb-8'
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          


          {
            (hasFile) ? (
              <div className='ml-12 mr-12'>
                <PDFViewer url={`assignment/file/${assignmentId}/${token}`}/>
              </div>) : null
          }
          
          <div>
              <div className='mt-8'>
                <span>
                <label className="appearance-none w-36 block mx-auto block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                 Upload Assignment  <input className='mx-auto mb-5'  type="file"  placeholder='Upload Assignment'/>
                </label>
                  <button className="appearance-none w-36 block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="update" type="file" >Upload</button>
                  </span>
              </div>
          </div>
          
        </div>
      </div>
    </>
  );
};


export default AssignmentPage