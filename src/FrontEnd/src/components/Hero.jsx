import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import {Link} from 'react-scroll'

const Hero = () => {
    return (
        <div className='bg-gradient-to-r py-20 from-teal-400 to-yellow-200' id='home'>
            <div className='max-w mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <h1 className='text-white pt-[100px] pb-10 drop-shadow-lg md:text-[90px] text-4xl px-0 font-bold py-4'>Welcome to LENS !</h1>
                <div className='p-10'>
                    <TypeAnimation
                        sequence={[
                            'Explore the visual world like never before.',
                            2000,
                            'Unlock a wealth of knowledge, art, and inspiration in an instant.',
                            2000,
                            'Discover, Connect, and Transform your visual experiences with LENS today.',
                            2000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '2em', display: 'inline-block',  color: 'white', fontFamily: 'Poppins-Regular, sans-serif'}}
                        repeat={Infinity}
                        />
                </div>
                <div className='bg-[#FEFBF3] w-[200px] shadow-lg rounded-md font-medium my-6 mx-auto py-4 hover:text-emerald-300 text-black'>
                <Link to="reverse" spy={true} smooth={true} offset={10} duration={500}>Get Started</Link>
                </div>
            </div>

        </div>
    )
}

export default Hero;