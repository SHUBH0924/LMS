import React, { useEffect, useState } from 'react';

import { useLocation,useParams } from 'react-router-dom';
import PDFViewer from '../Admin/AdminDashboard/CreateCourse/Course_Modules/Page/PDFViewer';
import axios from 'axios';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'

const AssignmentPage = (props) => {

  const auth = useAuth()
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

      <div className='sticky top-0 z-10 '>
        <Header />
      </div>
      <div className=' flex flex-row h-screen bg-white'>

        <div className=' flex flex-col w-3/4 ' >

          <h1 className='text-4xl mx-auto mt-6 font-bold text-black '>
            {Title}
          </h1>
          <hr className='mt-8 w-3/5 mx-auto' />
          <div 
            className='ml-12 mr-12 mb-8'
            dangerouslySetInnerHTML={{ __html: content }} 
          />

          {
            (hasFile) ? (
              <div className='ml-12 mr-12'>
                <PDFViewer url={`assignment/file/${assignmentId}/${token}`}/>
              </div>) : null
          }
          
        </div>
      </div>
    </>
  );
};


export default AssignmentPage