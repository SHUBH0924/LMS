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
import { AiOutlineArrowDown } from "react-icons/ai";

export default props => {

  const auth = useAuth()
  const token = auth.token
  const location = useLocation();
  const lec = location.state.lectures

  const URL = "http://172.29.232.251:3000"

  const [type, setType] = useState(location.state.type)
  const [id, setId] = useState(location.state.lectureId)
  const [courseId, setCourseId] = useState(location.state.courseId)
  const [moduleId, setModuleId] = useState(location.state.moduleId)
  const [content, setContent] = useState("")
  const [Title, setTitle] = useState(location.state.Title)
  const VideoURL = `${URL}/playvideo/${courseId}/${moduleId}/${id}/${token}`

  function dropDown() {
    document.querySelector('#submenu').classList.toggle('hidden')
    document.querySelector('#arrow').classList.toggle('rotate-0')
  }
 



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
      <div className='sticky top-0 z-10 '>
        <Header />
      </div>
      <div className=' flex flex-row h-screen bg-white'>
        <div className='w-1/4 static bg-gray-800'>

          <h1 className='mt-2 ml-28 text-4xl font-semibold text-white capitalize'>
            Modules
          </h1>
          <hr className='mt-2 w-full ' />

          {lec.map((item, key) => {

            return (
              <div className='w-full'>

                <details className="w-4/5 mx-auto mb-2 bg-gray-600 rounded-lg ring-1 ring-blue-600 ">
                  <summary className="w-4/5 capitalize text-xl text-white font-semibold py-6 ">
                    {item.name}
                  </summary>
                  {

                    item.lectures.map((items, key) => {
                      // console.log(items,key)
                      return (
                        <>
                          <div className="drop-file-preview__item mx-auto hover:bg-gray-300 active:bg-gray-300"
                            style={{ width: "80%" }}
                            onClick={() => {
                              setId(items._id)
                              setModuleId(item._id)
                              setType(items.type.split('/')[1])
                              setTitle(items.name)
                            }
                            }>

                            {/* <img src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                            <div className="drop-file-preview__item__info" >
                              <h2>{items.name}</h2>
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

        </div>
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
                <PDFViewer courseId={courseId} moduleId={moduleId} id={id} />
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


