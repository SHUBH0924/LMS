import React, { useEffect, useState } from 'react';
// import doc from "./Ashvani Resume (1).docx"
import VideoJS from './Video'
import videojs from 'video.js';
// import PdfFile from './Introduction.pdf'
import { useLocation } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import axios from 'axios';
import { useAuth } from '../../../../../../Auth/auth';
import Header from '../../../../../Header'

export default props => {

  const auth = useAuth()
  const token = auth.token
  const location = useLocation();
//   const lec = location.state.lectures

  const URL = "http://172.29.235.107:3000"

//   const [type, setType] = useState(location.state.type)
//   const [id, setId] = useState(location.state.lectureId)
//   const [courseId, setCourseId] = useState(location.state.courseId)
//   const [moduleId, setModuleId] = useState(location.state.moduleId)
//   const [content, setContent] = useState("")
//   const [Title, setTitle] = useState(location.state.Title)
//   const VideoURL = `${URL}/playvideo/${courseId}/${moduleId}/${id}/${token}`


//   useEffect(() => {
//     axios.post(`${URL}/course/content`, {
//       courseId: courseId,
//       moduleId: moduleId,
//       lecId: id
//     }, {
//       headers: {
//         'Authorization': token
//       }
//     }).then(res => {
//       // console.log(res.data)
//       setContent(res.data)
//     })
//   }, [id])


  return (
    <>
      {/* {console.log(type,id,courseId,moduleId)} */}
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
            (type === "pdf") ? (
              <div className='ml-12 mr-12'>
                <PDFViewer courseId={courseId} moduleId={moduleId} id={id} url={`course/lecture/${courseId}/${moduleId}/${id}/${token}`}/>
              </div>) : null
          }
          
        </div>
      </div>
    </>
  );
};


