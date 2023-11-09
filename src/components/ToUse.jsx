import React from 'react';
// import { TypeAnimation } from 'react-type-animation';

const ToUse = () => {
    return (
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='m-16 relative group'>
                <h1 className='font-bold'>HOW TO USE</h1>
                <span className='absolute -bottom-1 left-0 w-0 h-1 bg-blue-400 transition-all group-hover:w-full'></span>
            </p>
            <div className='text-white my-0 mx-10 text-center justify-center flex'>
                <div>
                    <h1 className='bg-[aquamarine] text-2xl w-10 h-10 rounded-3xl text-[black] font-bold text-center'>1.</h1>
                    <p>Enter the image dataset in the form of a folder containing a collection of images. This image dataset is needed before the searching process so that there is a comparison for the image you want to search for.
                    </p>
                </div>
                    <li>
                        2.  After the dataset is inserted, insert an image from the dataset.
                    </li>
                    <li>
                        3.  Select the search option, by color or texture.
                    </li>
                    <li>
                        4.  Press the search button, the program will then process, looking for images from the dataset that are similar to the image entered earlier.
                    </li>
                    <li>
                        5.  The program will display a collection of similar images, ordered from highest to lowest similarity. Each image that appears is given a percentage of similarity.
                    </li>
                    <li>
                        6.  The information regarding the number of images that appear and the program execution time will be displayed.
                    </li>
            </div>
        </div>
    )
}

export default ToUse