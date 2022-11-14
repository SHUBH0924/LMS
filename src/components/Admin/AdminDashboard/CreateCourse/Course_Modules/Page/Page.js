import React, { useState } from 'react';
// import doc from "./Ashvani Resume (1).docx"
import VideoJS from './Video'
import videojs from 'video.js';
import PdfFile from './Introduction.pdf'
import { useLocation } from 'react-router-dom';
import PDFViewer from './PDFViewer';


export default props => {

  const location = useLocation();
  const type = location.state.type


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



      {type === "pdf" ? (
        <>
          <PDFViewer />
        </>) : (
        <>
          <div className='flex flex-row h-screen bg-gray-200'>
            <div className='w-1/4 float-left bg-gray-800'>
              <div className=" h-16 sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow">
                <form className="flex flex-row ">
                  <div className=" relative mt-3 mx-auto ">
                    <input type="text" id=" " className=" rounded-lg border-transparent py-2 px-4 bg-gray-600 text-gray-200 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search" />
                  </div>
                  <button className="mt-3 mx-auto relative -ml-4 px-4 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <h1 className='mt-2 ml-24 text-4xl font-semibold text-white capitalize'>
                Modules
              </h1>
              <hr className='mt-2 w-full ' />
              
            </div>
            <div className='w-3/4  content-end'>
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          </div>
        </>)
      }


    </>
  );
};


