import React from 'react'
import Chika from './images/chiks.jpg'
import Davis from './images/Dave.jpg'
import Rafa from './images/rafa.png'

const AboutUs = () => {
  return (
    <div className='w-full py-[8rem] px-4 bg-emerald-100' id="about">
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 gap-y-24'>
          <h1 className='text-black md:text-9xl p-10 pt-10 sm:text-4xl flex items-center justify-center text-xl font-bold py-4'>ABOUT US.</h1>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[450px] hover:scale-105 duration-300'>
              <img src={Davis} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Davis</h2>
              <p className='text-center pb-10 pt-8'>
              Hello, I'm Muhammad Davis Adhipramana, <br></br> you can call me Davis or Dave. I'm an IT student of ITB. currently living in Bandung. I have a wide range of interests, including Web Development, Game Development, Mobile Applications, and Cybersecurity. Currently, the main focus is on mastering Game Development and refining skills in Web Development.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[550px] hover:scale-105 duration-300'>
              <img src={Chika} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Chika</h2>
              <p className='text-center pb-10 pt-8'>
              Hey there, I'm Auralea, people call me Chika! I'm currently cruising through my sophomore year, majoring in Informatics Engineering at Institut Teknologi Bandung. When I'm not coding, you'll catch me jet-setting around the globe—traveling is my heartbeat. I'm currently interested in front-end web development, and still learning and exploring the vast world of webdev. Besides web development, I would also like to dive into the world of artificial intelligence as I have always been curious about how it works.
              </p>
          </div>
          <div className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg h-[550px] hover:scale-105 duration-300'>
              <img src={Rafa} alt="" className='rounded-full border-8 border-white mx-auto mt-[-5rem] object-cover w-[200px] h-[200px]'/> 
              <h2 className='text-2xl font-bold text-center rounded-full shadow-md bg-yellow-100 py-3 my-3'>Rafa</h2>
              <p className='text-center py-10'>
              Hello I'm Rafa a sophomore majoring in Informatics Engineering at the Bandung Institute of Technology, I'm a tech enthusiast navigating the ever-evolving landscape of technology. Between classes, you'll find me immersed in the worlds of movies and video games, deriving both inspiration and relaxation from these dynamic forms of entertainment. Beyond mere hobbies, I harbor a deep interest in the gaming industry, constantly exploring its trends and innovations. Currently, the focus is on website development, where I combine a keen eye for design with coding prowess to craft seamless online experiences.
              </p>
          </div>
      </div>
    </div>
  );
}

export default AboutUs;
