import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import  './drop-file-input.css';
import { ImageConfig } from '../../../ImageConfig'; 
import uploadImg from '../../../../assets/cloud-upload-regular-240.png';


const DropFileInput = ({handleSubmission,id}) => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState(null);
    // const [selectedFile, setSelectedFile] = useState(null);


    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        setFileList(newFile)
        // if (newFile) {
        //     const updatedList = [...fileList, newFile];
        //     setFileList(updatedList);
        //     props.onFileChange(updatedList);
        // }
    }

    const fileRemove = (file) => {
        // const updatedList = [...fileList];
        // updatedList.splice(fileList.indexOf(file), 1);
        // setFileList(updatedList);
        setFileList(null)
        // props.onFileChange(updatedList);
    }

    const submitHandle = () => {
        setFileList(null)
        handleSubmission(id,fileList)
    }

    return (
        <>
            <div style={{
                
            }}
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here or Click to browse files</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            
            {
                // fileList.length > 0 ? (
                fileList ? (
                    <div className="drop-file-preview">
                        {
                            // fileList.map((item, index) => (

                                <div className="drop-file-preview__item">
                                    <img src={ImageConfig[fileList.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    {/* {item.type.split('/')[1]} */}
                                    <div className="drop-file-preview__item__info">
                                        <p>{fileList.name}</p>
                                        <p>{fileList.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(fileList)}>x</span>
                                </div>
                            // ))

                        }
                    </div>
                ) : null
            }
            
            <div className='flex items-center justify-end p-6'>
                <button
                    className="mx-auto bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button" onClick={submitHandle}>
                    Submit
                </button>
            </div>
            
            
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;