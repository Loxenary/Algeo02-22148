import React, { useState } from 'react';
import UploadFile from './UploadFile';

const Reverse = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://fakeimg.pl/350x200");

    function handleImageUpload(url) {
        // Update the uploaded image URL
        setUploadedImageUrl(url);
    }

    function clickme(e) {
        document.getElementById("formFile").click();
    }

    return (
        <div className='w-full bg-white py-16 px-4' id='reverse'>
            <div className='w-full flex items-center justify-center '>
                <div className='flex flex-row items-center justify-between gap-36'>
                    <UploadFile onUploadChange={handleImageUpload} />
                    <div className='max-w-[1240px] mx-auto flex-col flex'>
                        <div className='flex-col flex gap-x-2'>
                            <div className='my-3 items-end'>
                                <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                                <div className='flex justify-center'>
                                    <input type='file' className='form-control hidden ' id='formFile' onChange={UploadFile.handleUploadChange} accept='image/*' />
                                    <button onClick={clickme} className='btn btn-primary w-100 mt-2 bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Save my photo</button>
                                </div>
                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-center text-[20px] font-bold'>Color</p>
                                {/* Add your Switch component here */}
                                <p className='text-center text-[20px] font-bold'>Texture</p>
                            </div>
                        </div>
                        <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reverse;
