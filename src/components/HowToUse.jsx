import React from 'react';


const HowToUse = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full bg-[aquamarine] py-8 my-10'>Step 1</h2>
              <p className='text-center '>
                Enter the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full bg-[aquamarine] py-8 my-10'>Step 2</h2>
              <p className='text-center '>
                Enter the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full bg-[aquamarine] py-8 my-10'>Step 3</h2>
              <p className='text-center '>
                Enter the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>

      </div>
    </div>
  );
};

export default HowToUse;