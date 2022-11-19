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
  const lec = location.state.lectures

  const URL = "http://192.168.108.232:3000"

  const [type, setType] = useState(location.state.type)
  const [id, setId] = useState(location.state.lectureId)
  const [courseId, setCourseId] = useState(location.state.courseId)
  const [moduleId, setModuleId] = useState(location.state.moduleId)
  const [content, setContent] = useState("")
  const [Title, setTitle] = useState(location.state.Title)
  const VideoURL = `${URL}/playvideo/${courseId}/${moduleId}/${id}/${token}`




  useEffect(() => {
    axios.post(`${URL}/course/content`, {
      courseId: courseId,
      moduleId: moduleId,
      lecId: id
    }, {
      headers: {
        'Authorization': token
      }
    }).then(res => {
      // console.log(res.data)
      setContent(res.data)
    })
  }, [id])


  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: `${URL}/playvideo/${courseId}/${moduleId}/${id}/${token}`,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
      // console.log('player is waiting')
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
      // console.log('player will dispose')
    });
  };



  return (
    <>
      {/* {console.log(type,id,courseId,moduleId)} */}
      <div className='fixed top-0 w-full z-10 '>
        <Header />
      </div>
      <div className='  flex mt-24 flex-row h-screen  bg-white'>
        <aside className='w-96 fixed top-28 left-0 h-screen overflow-y-scroll scrollbar-hide border-t-8 border-gray-600 bg-gray-800'>

          <h1 className='mt-2 ml-4 text-4xl font-bold text-white capitalize'>
            Modules
          </h1>
          <hr className='mt-2 w-full border-2 border-gray-500 bg-gray-500 ' />

          {lec.map((item, key) => {

            return (
              <div className='last:mb-8 w-full'>

                <details style={{"width":"95%"}} className=" mx-auto border border-l-8 border-blue-700 mb-2 mt-4 rounded-lg  ">
                  <summary className="w-full capitalize text-xl last:mb-8 text-white font-semibold py-5 ml-4 ">
                    {item.name}
                  </summary>
                  <hr className='mx-6 border border-gray-500 bg-gray-500'/>
                  {
                      
                    item.lectures.map((items, key) => {
                      // console.log(items,key)
                      return (
                        <>
                        
                          <div className="flex my-5 rounded-lg mx-auto bg-blue-800 "
                            style={{ width: "80%" }}
                            
                            onClick={() => {
                              setId(items._id)
                              setModuleId(item._id)
                              setType(items.type.split('/')[1])
                              setTitle(items.name)
                              
                            }
                            
                            }>

                            {/* <img src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                            <div className=" mx-auto h-auto mt-1 mb-1  bg-blue-800" >
                              <h2 className=' text-md  capitalize  text-white'>{items.name}</h2>
                              {/* <p>{items.size}B</p> */}
                            </div>


                          </div>
                        </>
                      )
                    })
                  }
                </details>

               

              </div>
            )
          })}

        </aside>
        <div className=' flex-1 flex-col ml-96 ' >

          <h1 className='text-5xl ml-8 mt-8 font-semibold text-black '>
            {Title}
          </h1>
          <hr className='mt-8 w-full h-2 border-2 border-black bg-black mx-auto' />
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
          {(type === "mp4") ? (
            <>

              <div className='w-3/4 mt-2 mx-auto  my-auto'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                {/* <video>
                      <source src={VideoURL} ></source>
                    </video> */}
              </div>
            </>) : null
          }
        </div>
      </div>


    </>
  );
};


