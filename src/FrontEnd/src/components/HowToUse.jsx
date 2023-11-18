import React from 'react';


const HowToUse = () => {
  return (
    <div className='w-full py-[8rem] px-4 bg-white' id="touse">
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <h1 className='text-black md:text-9xl p-10 pt-10 sm:text-4xl flex items-center justify-center text-xl font-bold py-4'>HOW TO USE.</h1>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-emerald-100 py-8 my-10'>Step 1</h2>
              <p className='text-center '>
                Drop the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-8 my-10'>Step 2</h2>
              <p className='text-center '>
                After the dataset is entered, insert an image that you want to search from the dataset.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-emerald-100 py-8 my-10'>Step 3</h2>
              <p className='text-center '>
                Select a search option, by color or texture. Then, press the search button. The program will then process, searching for images from the dataset that have similarities to the image entered earlier.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-8 my-10'>Step 4</h2>
              <p className='text-center '>
                The program will then process, searching for images from the dataset that have similarities to the image entered earlier.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-emerald-100 py-8 my-10'>Step 5</h2>
              <p className='text-center'>
                The program will display a collection of similar images, sorted from the highest to the lowest. The similarity percentage and the program's execution time will also appear.
              </p>
          </div>

      </div>
    </div>
  );
};

export default HowToUse;