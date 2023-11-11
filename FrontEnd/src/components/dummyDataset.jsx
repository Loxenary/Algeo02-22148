import React, { useState } from 'react';

const DatasetUpload = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleDatasetUpload = async (event) => {
    const uploadedFiles = event.target.files;

    const uploadedImages = Array.from(uploadedFiles).map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return { file, imageUrl, id: index };
    });

    // Replace the existing files and images with the newly uploaded ones
    setFiles(uploadedFiles);
    setImages(uploadedImages);

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
        console.log("Worked");
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
        {images.map(({ imageUrl, id }) => (
          <div key={id} className="relative inline-block mr-4 mb-4">
            <img src={imageUrl} alt={`Uploaded ${id}`} className="w-32 h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatasetUpload;

