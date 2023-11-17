import React from 'react'

const DataResult = ({url}) => {

  return (  
    <div className='flex justify-center items-center flex-col gap-4 bg-lightGray rounded-lg py-10'>
        <img
            src={url}
            alt=""
            className='w-[200px] p-2 border-[2px] border-solid border-black rounded-xl object-cover'
        />
    </div>
  )
}

export default DataResult
