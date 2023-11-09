import React, { useState } from 'react';

function UploadFile({ onUploadChange }) {
    const [image, setImage] = useState("https://fakeimg.pl/350x200");
    const [saveImage, setSaveImage] = useState(null);

    function handleUploadChange(e) {
        console.log(e.target.files[0]);
        let uploaded = e.target.files[0];
        const url = URL.createObjectURL(uploaded);
        console.log(uploaded);
        setImage(url);

        // Call the callback function when the upload changes
        if (onUploadChange) {
            onUploadChange(url);
        }
    }

    return (
        <div className='Upload'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-25 mt-5 mx-auto float-left'>
                    <div>
                        <img src={image} alt="" className='img-thumbnail' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;
