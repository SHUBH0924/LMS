import React,{useEffect, useState} from 'react'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
// import pdf from "./Introduction.pdf"
import axios from 'axios';

const PDFViewer = () =>{

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
    // const [viewPdf, setViewPdf]=useState();

 
    return(
        <div className='container'>

      <div className='pdf-container' >
        {/* show pdf conditionally (if we have one)  */}

        {<>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        
                <Viewer fileUrl={'http://172.29.235.99:3000/course/lecture'}
                    plugins={[defaultLayoutPluginInstance]} />
        
            </Worker>
        </>}

      </div>

    </div>
    )
}

export default PDFViewer