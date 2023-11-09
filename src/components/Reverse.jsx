import React from 'react';
import Test from '../assets/bg jurnal harian ami.png';
import Switch from './Switch';
import UploadFile from './UploadFile';


const Reverse = () => {
    return (
        <div className='w-full bg-white py-16 px-4' id='reverse'>
            <div className='max-w-[1240px] mx-auto flex '>
                {/* <div className='ml-10 w-100 border-solid border-2 border--400'>
                <img className='w-80 mx-auto my-4 mb-20' src={Test} />
                </div> */}
                <div className='flex flex-col justify-center'>
                    {/* <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                    <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine] mb-20'>Insert an Image</button> */}
                    <UploadFile />
                    <div className='max-w-[1240px] mx-auto grid grid-cols-3'>
                        <p className='text-center text-[20px] font-bold'>Color</p>
                        <Switch />
                        <p className='text-center text-[20px] font-bold'>Texture</p>
                    </div>
                    <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Search</button>

                </div>

            </div>

        </div>
    )
}

export default Reverse