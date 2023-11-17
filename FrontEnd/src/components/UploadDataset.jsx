// import React, {useState} from 'react'
// import axios from "axios";

// function UploadDataset() {
//     const [files, setFiles] = useState(null);
//     const [progress, setProgress] = useState({started: false, pc: 0});
//     const [msg, setMsg] = useState(null);

//     function handleUpload() {
//         if(!files){
//             setMsg("No file selected");
//             return;
//         }

//         const fd = new FormData();
//         for(let i=0; i<files.length; i++){
//             fd.append(`file${i+1}`, files[i]);
//         }

//         setMsg("Uploading...");
//         fetch('http://httpbin.org/post', fd, {
//             method: "POST",
//             body: fd,
//             headers: {
//                 "Custom-Header": "value",
//             }
//         })
//         .then(res => {
//             if (!res.ok){
//                 throw new Error("Bad response");
//             }
//             setMsg("Upload successful");
//             return res.json();
//         })
//         .then(data => console.log(data))
//         .catch(err => {
//             setMsg("Upload failed");
//             console.error(err);
//         });
        
        
//     }

//     return (
//         <div className='Uploadata'>
//             <input onChange={ (e)=> {setFiles(e.target.files)}} type="file" multiple/>
//             <button onClick={handleUpload}>Upload Dataset</button>

//             {/* {progress.started && <progress max="100" value={progress.pc}></progress>} */}
//             {msg && <span>{msg}</span>}
//         </div>
//     )
// }

// export default UploadDataset


import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UploadDataset = ({ Data }) => {
  const [ObjArr, setObj] = useState([]);
  const [estTime, setTime] = useState(null)

  const dataSet = () => {
    const obj = [];

    if(Data !== null){

      for(const[key,value] of Object.entries(Data)){
        if(key == 'Time'){
          setTime(value);
        }
        else{
          const filename = key
          const imageUrl = `http://localhost:8000/datasets/${filename}`;
          const id = uuidv4();
          obj.push({file: null, id, imageUrl, similarities : value})
        }
      }
      setObj(obj);
    }  

    
  };

  useEffect(() => {
    console.log("Data: ", Data)
    dataSet();
     // Call dataSet when the component mounts or when Data prop changes
  }, [Data]);

  const handleDatasetUpload = async (event) => {
    const uploadedFiles = event.target.files[0];

    // Replace the existing files and images with the newly uploaded ones
    const formData = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('dataset', uploadedFiles[i]);
    }

    try {
      const endpoint = "http://localhost:8000/uploadDataset/";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Trigger the update of images by updating the Data prop
        console.log("aman")
      } else {
        console.error("Upload Dataset Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center py-14 w-full' id='dataset'>
      <form>
        <input type="file" onChange={handleDatasetUpload} multiple accept="image/*" />
      </form>
      {/* Display uploaded images */}
      <div>
        {ObjArr.map(({ imageUrl, id, similarities}) => (
          <div key={id} className="relative inline-block mr-4 mb-4">
            <img src={imageUrl} alt={`Uploaded ${id}`} className="w-32 h-32 object-cover" />
            <p>Similarity : {similarities}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDataset;