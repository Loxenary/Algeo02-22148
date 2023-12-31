// import React, {useState} from 'react';
// import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

// const Navbar = () => {
//     const [click, setClick] = useState(false)
//     const handleClick = () => setClick(!click)

//     const [nav, setNav] = useState(false)

//     const handleNav = () => {
//         setNav(!nav)
//     }
//     return (
//         <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
//             <nav className='navbar'>
//                 <h1 className='w-full text-3xl font-bold text-[aquamarine]'>LENS.</h1>
//                     <ul className='hidden md:flex'>
//                         <li className='nav-item p-4 text-sm'><a href='/'>Home</a></li>
//                         <li className='nav-item p-4 text-sm'><a href='/'>Information</a></li>
//                         <li className='nav-item p-4 text-sm'><a href='/'>How To Use</a></li>
//                         <li className='nav-item p-4 text-sm'><a href='/'>About Us</a></li>
//                     </ul>
//                     <div onClick={handleNav} className='block'>
//                         {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
//                     </div>
//                     <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-black ease-in-out duration-500' : 'fixed left-[-100%]'}>
//                     <h1 className='w-full text-3xl font-bold text-[aquamarine] m-4'>LENS.</h1>
//                         <ul className='uppercase p-4'>
//                             <li className='nav-item p-4 border-b border-gray-600'><a href='/'>Home</a></li>
//                             <li className='nav-item p-4 border-b border-gray-600'><a href='/'>Information</a></li>
//                             <li className='nav-item p-4 border-b border-gray-600'><a href='/'>How To Use</a></li>
//                             <li className='nav-item p-4'><a href='/'>About Us</a></li>
//                         </ul>
//                     </div>
//             </nav>
//         </div>
//     )
// }

// export default Navbar

import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logotrans from './images/logotrans.png'
import {Link} from 'react-scroll'


const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className='header bg-[#FEFBF3] fixed w-full top-0 left-0 transition duration-300 ease-in overflow-hidden p-5 z-10'>
            <nav className='navbar flex justify-between items-center max-w-7xl mx-auto h-full px-4'>
                <a href='/' className='logo'>
                    <img src={logotrans} alt='logo' className='h-[50px]' />
                </a>
                <div className='hamburger hidden'>
                    {click ? (
                        <FaTimes className='text-white text-2xl' />
                    ) : (
                        <FaBars className='text-white text-2xl' />
                    )}
                </div>
                <ul className={`${click ? 'nav-menu active' : 'nav-menu'} md:flex md:ml-0 md:space-x-4`}>
                    <li className='nav-item font-semibold hover:text-emerald-300'>
                        <Link to="home" spy={true} smooth={true} offset={-90} duration={500}>Home</Link>
                    </li>
                    <li className='nav-item font-semibold hover:text-emerald-300'>
                        <Link to="info" spy={true} smooth={true} offset={-90} duration={500}>Information</Link>
                    </li>
                    <li className='nav-item font-semibold hover:text-emerald-300'>
                        <Link to="touse" spy={true} smooth={true} offset={-90} duration={500}>How To Use</Link>
                    </li>
                    <li className='nav-item font-semibold hover:text-emerald-300'>
                        <Link to="about" spy={true} smooth={true} offset={-90} duration={500}>About Us</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar

{/* <a href='/' onClick={closeMenu} className='font-semibold hover:text-emerald-300'>Home</a> */}