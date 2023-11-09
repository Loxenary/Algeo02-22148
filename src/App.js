import React from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Reverse from './components/Reverse';
import HowToUse from './components/HowToUse';


function App() {
  return (
    <div>
      <Navbar />
      <div className='mt-[250px]'/>
      <Hero />
      <Reverse />
      <HowToUse />
    </div>
  );
}

export default App;
