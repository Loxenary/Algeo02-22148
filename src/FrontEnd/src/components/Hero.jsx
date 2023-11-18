import React from 'react';
// import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className='bg-gradient-to-r py-20 from-teal-400 to-yellow-200' id='home'>
            <div className='max-w mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <h1 className='text-white pt-[100px] pb-10 drop-shadow-lg md:text-[90px] text-4xl px-0 font-bold py-4'>Welcome to LENS !</h1>
                <p className='md:text-xl text-sm text-white p-10 px-40 font-[Poppins-Light]'>Our Content-Based Image Retrieval technology empowers you to explore the visual world like never before. Simply upload or capture images, and let LENS unlock a wealth of knowledge, art, and inspiration in an instant. Discover, Connect, and Transform your visual experiences with LENS today</p>
                <a  className='bg-[#FEFBF3] w-[200px] shadow-lg rounded-md font-medium my-6 mx-auto py-4 hover:text-emerald-300 text-black' href='#reverse'>Get Started</a>
            </div>

        </div>
    )
}

export default Hero;