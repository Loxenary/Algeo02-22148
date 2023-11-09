import React from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Reverse from './components/Reverse';
import HowToUse from './components/HowToUse';


function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Reverse />
      <HowToUse />
    </div>
  );
}

export default App;
