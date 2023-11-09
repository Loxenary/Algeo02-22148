import React, { useState } from 'react';
import Switch from './Switch'

const Reverse = () => {
    // const [uploadedImageUrl, setUploadedImageUrl] = useState("https://fakeimg.pl/350x200");

    // function handleImageUpload(url) {
    //     // Update the uploaded image URL
    //     setUploadedImageUrl(url);
    // }

    // function clickme(e) {
    //     document.getElementById("formFile").click();
    // }
    const [image, setImage] = useState("https://fakeimg.pl/350x200");
    const [saveImage, setSaveImage] = useState(null);

    function handleUploadChange(e){
        console.log(e.target.files[0]);
        let uploaded = e.target.files[0];
        const url = URL.createObjectURL(uploaded);
        console.log(uploaded);
        setImage(url)

    }
    
    function clickme(e){
        document.getElementById("formFile").click();
    }

    return (
        <div className='w-full bg-white py-16 px-4' id='reverse'>
            <div className='w-full flex items-center justify-center '>
                <div className='flex flex-row items-center justify-between gap-36'>
                    <div className='Upload'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='w-25 mt-5 mx-auto float-left'>
                                <div>
                                    <img src={image} alt="" className='img-thumbnail' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[1240px] mx-auto flex-col flex'>
                        <div className='flex-col flex gap-x-2'>
                            <div className='my-3 items-end'>
                                <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                                <div className='flex justify-center'>
                                    <input type='file' className='form-control hidden ' id='formFile' onChange={handleUploadChange} accept='image/*' />
                                    <button onClick={clickme} className='btn btn-primary w-100 mt-2 bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Save my photo</button>
                                </div>
                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-center text-[20px] font-bold'>Color</p>
                                <Switch />
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
