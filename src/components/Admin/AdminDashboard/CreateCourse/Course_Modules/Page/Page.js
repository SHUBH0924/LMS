import React, { useEffect, useState } from 'react';
import VideoJS from './Video'
import videojs from 'video.js';
import { useLocation } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import axios from 'axios';
import { useAuth } from '../../../../../../Auth/auth';
import Header from '../../../../../Header'

const Page = () => {

  const auth = useAuth()
  const token = auth.token
  const location = useLocation();
  const lec = location.state.lectures
  const URL = process.env.REACT_APP_SERVER
  const [type, setType] = useState(location.state.type)
  const [id, setId] = useState(location.state.lectureId)
  const [courseId, setCourseId] = useState(location.state.courseId)
  const [moduleId, setModuleId] = useState(location.state.moduleId)
  const [content, setContent] = useState("")
  const [Title, setTitle] = useState(location.state.Title)

  const playerRef = React.useRef(null);

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
      <div className='fixed top-0 w-full z-10 '>
        <Header />
      </div>
      <div className='  flex mt-24 flex-row h-screen bg-white' style={{backgroundColor:"#ffffff"}}>
                <aside className='w-96 fixed top-28 left-0 h-screen overflow-y-scroll scrollbar-hide  border-t-8 border-gray-600' style={{backgroundColor:"#fcfcfa"}}>

                  <h1 className='mt-2 ml-4 text-4xl font-bold text-black capitalize'>
                    
                  </h1>

                  {lec.map((item, key) => {

                    return (
                      <div className='w-full'>

                        <details style={{"width":"95%",backgroundColor:"#f5f5f5",boxShadow:"0px 1px 0px 1px rgba(0, 0, 0, 0.1,)"  }} className=" mx-auto border-b-4 border-gray-300 my-8 rounded-lg bg-transparent hover:shadow-inner" >
                          <summary className="w-full capitalize text-xl select-none text-black font-semibold py-4 ml-4">
                          ➤ &ensp;{item.name}
                          </summary>
                          <hr className='mx-6 border border-gray-500 bg-gray-500'/>
                          {
                              
                            item.lectures.map((items, key) => {
                              return (
                                <>
                                
                                  <div className="flex my-5 mx-auto bg-transparent border-l-4 border-blue-300 mb-2 mt-4 pl-1 py-2"
                                    style={{ width: "60%", backgroundColor:"#fafaf7" }}
                                    
                                    onClick={() => {
                                      setId(items._id)
                                      setModuleId(item._id)
                                      setType(items.type.split('/')[1])
                                      setTitle(items.name)
                                      
                                    }
                                    }>
                                  <h2 className=' text-md font-sans capitalize select-none text-gray mx-1 align-baseline font-semibold text-lg'> ◆ {items.name}</h2>
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
                <PDFViewer url={`course/lecture/${courseId}/${moduleId}/${id}/${token}`}/>
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


export default Page;