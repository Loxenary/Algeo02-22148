import React from 'react'
import Page from './Page'

const Modal = ({open, onClose}) => {
    if(!open) return null
  return (
    <div className='overlay relative justify-center items-center'>
      <p onClick={onClose} className='closeBtn text-white absolute right-[14%] my-8 font-bold bg-black bg-opacity-20 text-center w-[30px] h-[30px] rounded-md'>X</p>
      <Page />
    </div>
  )
}

export default Modal
