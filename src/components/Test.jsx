import React, { useState } from 'react';
import Switch from './Switch';

function Test1(){

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
        <div className='Upload'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-25 mt-5 mx-auto float-left'>
                    <div>
                        <img src={image} alt="" className='img-thumbnail' />
                    </div>
                    <div className='my-3 items-end'>
                        <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                        {/* <label htmlFor='formFile' className='form-label font-bold text-2xl text-center'>Upload Image here </label> */}
                        <div className='w-full flex justify-center'>
                            <input type='file' className='form-control hidden ' id='formFile' onChange={handleUploadChange} accept='image/*' />                           
                            <button onClick={clickme} className='btn btn-primary w-100 mt-2 bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Save my photo</button>
                        </div>
                        {/* <div className='max-w-[1240px] mx-auto grid grid-cols-3'>
                            <p className='text-center text-[20px] font-bold'>Color</p>
                            <Switch />
                            <p className='text-center text-[20px] font-bold'>Texture</p>
                        </div> */}
                        <div className='flex gap-x-2'>
                                <p className='text-center text-[20px] font-bold'>Color</p>
                                {/* Add your Switch component here */}
                                <p className='text-center text-[20px] font-bold'>Texture</p>
                        </div>
                        {/* <input type='file' className='form-control' id='formFile' onChange={handleUploadChange} accept='image/*' /> */}
                    </div>
                    <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Test1