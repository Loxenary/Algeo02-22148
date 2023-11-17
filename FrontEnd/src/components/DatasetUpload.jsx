import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';
import {PulseLoader} from 'react-spinners';

const DatasetUpload = ({ Data, Loading, setLoading}) => {
  const [ObjArr, setObj] = useState([]);
  const [estTime, setTime] = useState(null);
  const [fileCount, setFileCount] = useState(0);

  const dataSet = () => {
    const obj = [];

    if (Data !== null) {
      for (const [key, value] of Object.entries(Data)) {
        if (key === 'Time') {
          setTime(value);
        } else {
          const filename = key;
          const imageUrl = `http://localhost:8000/datasets/${filename}`;
          const id = uuidv4();
          obj.push({ file: null, id, imageUrl, similarities: value });
        }
      }
      setObj(obj);
    }
  };

  useEffect(() => {
    console.log('Data: ', Data);
    dataSet();
    // Call dataSet when the component mounts or when Data prop changes
  }, [Data]);

  function clickme(e) {
    document.getElementById('input_images').click();
  }

  const handleDatasetUpload = async (event) => {
   
    const uploadedFiles = event.target.files;

    // const imageFiles = Array.from(uploadedFiles).filter(file => file.type.startsWith('image/'));
    // Replace the existing files and images with the newly uploaded ones
    const formData = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      console.log("TEST",uploadedFiles[i]);
      formData.append('dataset', uploadedFiles[i]);
    }

    try {
      const endpoint = 'http://localhost:8000/uploadDataset/';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        mode : 'no-cors'
      });

      if (response.ok) {
        // Trigger the update of images by updating the Data prop
        console.log('Dataset uploaded successfully');
      } else {
        console.error('Upload Dataset Failed');
      }
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className='flex flex-col justify-center items-center py-14 w-full' id='dataset'>
      <form>
        <input
          type='file'
          className='form-control hidden'
          id='input_images'
          directory =""
          webkitdirectory = ""
          onChange={(event) => {
            handleDatasetUpload(event);
            setFileCount(event.target.files.length);
          }}
          multiple
          accept='image/*'
        />
      </form>
      <button
        onClick={clickme}
        className='btn btn-primary w-100 mt-2 bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'
        multiple
      >
        Upload Dataset
      </button>
      {fileCount > 0 ? (
        <p>Files upload: {fileCount}</p>
      ) : null}
      {/* Display uploaded images */}
      <div>
        <Pagination data={ObjArr} loading = {Loading} setLoading={setLoading} time = {estTime}/>
      </div>
    </div>
  );
};

export default DatasetUpload;