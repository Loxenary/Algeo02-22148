import React, { useState } from 'react'
import Modal from './Modal'

function Camera({setCam, switchPost,onDataUpdate, setImages}) {
    const [openModal, setOpenModal] = useState(false)

    const handleButtonClick = (event) => {
        setOpenModal(event);
        setCam(event);
    }

    return (
        <div className='bg-emerald-100 justify-center py-6 items-center h-full'>
            <h1 className='text-black text-2xl text-center font-[Poppins-SemiBold]'>Want to use camera ?</h1>
            <div className='flex justify-center items-center h-full'>
                <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine] ' onClick={() => handleButtonClick(true)}>Open Camera</button>
            </div>
            <Modal open={openModal} onClose={() => handleButtonClick(false)} switchPost={switchPost} onDataUpdate={onDataUpdate} setImages={setImages}/>
            
        </div>
    )
}
export default Camera
