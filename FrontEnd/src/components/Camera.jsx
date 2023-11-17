import React, { useState } from 'react'
import Modal from './Modal'
function Camera() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='bg-emerald-100 justify-center py-6 items-center h-full'>
            <h1 className='text-black text-2xl text-center font-[Poppins-SemiBold]'>Want to use camera ?</h1>
            <div className='flex justify-center items-center h-full'>
                <button className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine] ' onClick={() => setOpenModal(true)}>Open Camera</button>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}
export default Camera
