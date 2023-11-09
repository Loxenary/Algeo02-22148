import React from 'react';

const Switch = () => {
    return (
        <label for='check' className='bg-gray-300 cursor-pointer relative w-20 h-10 rounded-full'>
            <input type='checkbox' id='check' className='sr-only peer' />
            <span className='w-2/5 h-4/5 bg-teal-400 absolute rounded-full left-1 top-1 peer-checked:bg-teal-600 peer-checked:left-11 transition-all duration-500'></span>
        </label>
    );
}

export default Switch


