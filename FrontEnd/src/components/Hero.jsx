import React from 'react';
// import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className='text-white' id='home'>
            <div className='max-w-[800px] w-full mb-[96px] mx-auto text-center flex flex-col mt-[50px]'>
                <h1 className='md:text-7xl sm:text-4xl text-xl font-bold py-4'>Welcome to LENS !</h1>
                <p className='md:text-2xl text-xl text-[aquamarine]'>blablabla</p>
                <a  className='bg-[aquamarine] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' href='#reverse'>Get Started</a>
            </div>

        </div>
    )
}

export default Hero;