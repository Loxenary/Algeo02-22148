import React from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Reverse from './components/Reverse';
import HowToUse from './components/HowToUse';
import AboutUs from './components/AboutUs';
import Information from './components/Information';




function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Reverse />
      {/* <Page /> */}
      {/* <DatasetUpload /> */}
      <Information />
      <HowToUse />
      <AboutUs />
    </div>
  );
}

export default App;
