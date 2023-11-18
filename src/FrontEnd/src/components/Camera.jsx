import React, { useState } from 'react'
import Modal from './Modal'
import ModalScrapping from './Modal_Scrapping';


function Camera({setCam, switchPost,onDataUpdate, setImages}) {
    const [openModal, setOpenModal] = useState(false)
    const [openScrapping, setOpenScrapping] = useState(false)

    const handleButtonClick = (event) => {
        setOpenModal(event);
        setOpenScrapping(false);
        setCam(event);
    }

    const handleScrappingClick = (event) => {
        setOpenModal(false);
        setOpenScrapping(event);
        setCam(event);
    }

    return (
        <div className='bg-emerald-100 justify-center py-6 items-center h-full'>
            <h1 className='text-black text-2xl text-center font-[Poppins-SemiBold] pb-8'>Want to use another input ?</h1>
            <div className='flex  justify-center space-x-20'>
                <button className='bg-[black] w-[200px] rounded-md font-medium my-6  py-3 text-[aquamarine] ' onClick={() => handleButtonClick(!openModal)}>Open Camera</button>
                <button className='bg-[black] w-[200px] rounded-md font-medium my-6  py-3 text-[aquamarine] ' onClick={() => handleScrappingClick(!openScrapping)}>Image Scrapping</button>
            </div>
            <Modal open={openModal} onClose={() => handleButtonClick(false)} switchPost={switchPost} onDataUpdate={onDataUpdate} setImages={setImages}/>
            <ModalScrapping open={openScrapping} onClose={() => handleScrappingClick(false)} switchPost={switchPost} onDataUpdate={onDataUpdate} setImages={setImages}/>
        </div>
    )
}
export default Camera
