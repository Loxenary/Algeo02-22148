import React from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Reverse from './components/Reverse';
import HowToUse from './components/HowToUse';
import DatasetUpload from './components/dummyDataset';


function App() {
  return (
    <div>
      <Navbar />
      <div className='mt-[250px]'/>
      <Hero />
      {/* <Test1 /> */}
      <Reverse />
      <DatasetUpload />
      <HowToUse />
      
    </div>
  );
}

export default App;
