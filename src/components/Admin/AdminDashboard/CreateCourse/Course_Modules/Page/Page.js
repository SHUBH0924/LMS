import React, { useEffect, useState } from 'react';
// import doc from "./Ashvani Resume (1).docx"
import VideoJS from './Video'
import videojs from 'video.js';
// import PdfFile from './Introduction.pdf'
import { useLocation } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import axios from 'axios';
import { useAuth } from '../../../../../../Auth/auth';


export default props => {

  const auth = useAuth()
  const token = auth.token
  const location = useLocation();
  const lec = location.state.lectures
  
  const URL = "http://172.29.232.53:3000"
  
  const [type,setType] = useState(location.state.type)
  const [id,setId] = useState(location.state.lectureId)
  const [courseId,setCourseId] = useState(location.state.courseId)
  const [moduleId,setModuleId] = useState(location.state.moduleId)
  const [content,setContent] = useState("")

  useEffect(()=>{
    axios.post(`${URL}/course/content`,{
          courseId:courseId,
          moduleId:moduleId,
          lecId:id
        },{
          headers: {
              'Authorization': token
          }
      }).then(res=>{
          // console.log(res.data)
          setContent(res.data)
      })
  },[id])


  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://172.29.232.53:3000/playvideo',
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
      <div className='flex flex-row h-screen bg-gray-200'>
      <div className='w-1/4 float-left bg-gray-800'>
              <div className=" h-16 sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
                {/* <form className="flex flex-row ">
                  <div className=" relative mt-3 mx-auto ">
                    <input type="text" id=" " className=" rounded-lg border-transparent py-2 px-4 bg-gray-600 text-gray-200 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
                  </div>
                  <button className="mt-3 mx-auto relative -ml-4 px-4 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                    Search
                  </button>
                </form> */}
              </div>
              <h1 className='mt-2 ml-24 text-4xl font-semibold text-white capitalize'>
                Modules
              </h1>
              <hr className='mt-2 w-full ' />
              
              {lec.map((item,key)=>{
              
                  return(
                      <>
                        <details className="w-4/5 mx-auto mb-2 bg-gray-600 rounded-lg ring-1 ring-blue-600 ">
                                        <summary className="px-6 capitalize text-xl text-white font-semibold py-6 ">
                                            {item.name}
                                        </summary>
                                        {
                                            
                                            item.lectures.map((items,key)=>{
                                                // console.log(items,key)
                                                return(
                                                    <>
                                                    <div className="drop-file-preview__item mx-auto hover:bg-gray-300 active:bg-gray-300" 
                                                          style={{width:"80%"}} 
                                                          onClick={()=>{
                                                            setId(items._id)
                                                            setModuleId(item._id)
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
                      </>  
                  )
          })}
              
      </div>
          <div>


            <div dangerouslySetInnerHTML={{__html: content}} />
            {
              
            }
            {
            (type === "pdf")&&(
              <>
                <PDFViewer />
              </>)
            }  
            {(type === "mp4")&&(
              <>
                  <div className='w-3/4  content-end'>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                  </div>
              </>)
            }
          </div>
    </div>


    </>
  );
};


