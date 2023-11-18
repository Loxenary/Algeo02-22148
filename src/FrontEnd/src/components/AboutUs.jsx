import React from 'react'
import Chika from './images/chiks.png'
import Davis from './images/Dave.jpg'
import Rafa from './images/rafa.png'

const AboutUs = () => {
  return (
    <div className='w-full py-[8rem] px-4 bg-emerald-100' id="about">
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 gap-y-24'>
          <h1 className='text-black md:text-9xl p-10 pt-10 sm:text-4xl flex items-center justify-center text-xl font-bold py-4'>ABOUT US.</h1>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <img src={Davis} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Davis</h2>
              <p className='text-center pb-10 pt-2'>
              A sophomore IT student at ITB with the id of 13522157. <br></br>currently living in Bandung. I have a wide range of interests, including Web Development, Game Development, Mobile Applications, and Cybersecurity. Currently, the main focus is on mastering Game Development and refining skills in Web Development.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <img src={Chika} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Chika</h2>
              <p className='text-center py-10'>
                Drop the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[400px] hover:scale-105 duration-300'>
              <img src={Rafa} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Rafa</h2>
              <p className='text-center py-10'>
                Drop the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
              </p>
          </div>
      </div>
    </div>
  );
}

export default AboutUs;
