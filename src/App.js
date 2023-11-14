import React from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Reverse from './components/Reverse';
import HowToUse from './components/HowToUse';
import Pagination from './components/Pagination';
import Page from './components/Page';
import Camera from './components/Camera';
import DatasetUpload from './components/DatasetUpload';




function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Test1 /> */}
      <Reverse />
      {/* <Page /> */}
      <DatasetUpload />
      <Camera />
      <HowToUse />
    </div>
  );
}

export default App;
