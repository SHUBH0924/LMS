import React,{useState} from 'react';
// import doc from "./Ashvani Resume (1).docx"
import VideoJS from './Video'
import videojs from 'video.js';
import { Document, Page } from 'react-pdf';
import PdfFile from './Introduction.pdf'


export default props => {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // const source="http://172.29.110.12:3000/playvideo"

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://172.29.110.12:3000/playvideo',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
      console.log('player is waiting')
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
      console.log('player will dispose')
    });
  };


  return (
    <>
    {/* <div style={{width:"100%",height:"100vh",background:"green"}}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div> */}



      <Document file={PdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    
    </>
  );
};


