import {react,useState, useSyncExternalStore} from 'react';
import { useParams } from 'react-router-dom';

const CourseModule = (props) =>{
    
    const course = [{
        _id : "idewouih213134",
        name:"C",
        license:"Private(CopyRight)",
        published:false,
        price:200,
        modules:[]
    }]

    const { slug } = useParams();
    const [filedata,setfiledata] = useState(null)

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [warning,setWarning] = useState("")

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const handleSubmission = () => {
            const formData = new FormData();

            formData.append('File', selectedFile);
            console.log(formData)
            fetch(
                'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:',error);
                    setWarning("file didn't uploaded")
                });
        };
	

    return (
        <div>
             <div>
                <input type="file" name="file" onChange={changeHandler} />

                {isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}

                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CourseModule;