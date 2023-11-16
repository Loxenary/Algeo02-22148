import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebBG = 'WebBG.jpg'; // Assuming you have the image in your public folder

function Page() {
  const webcamRef = useRef(null);
  const [displayed, setDisplayed] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const captureInterval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setDisplayed(imageSrc);
        setCountdown(6);
      }
    }, 5000);

    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(captureInterval);
      clearInterval(countdownInterval);
    };
  }, []);


  return (
    <section className='bg-emerald-100 w-full h-full pb-20 flex flex-col items-center justify-center'>
      <img src={WebBG} alt="Background Website" className="h-full w-full fixed top-0 left-0 z-[-100] text-[#2F3238]" />

      <div className='mt-[75px]' />

      <div className="shadow-xl h-[350px] w-[800px] rounded-3xl bg-black bg-opacity-20 p-8 flex justify-between items-center backdrop-blur-sm">
        <div className='flex flex-col items-center gap-y-4'>
          <p className='font-bold text-2xl text-white'>Camera</p>
          <div className='text-4xl font-bold text-white absolute top-[175px]'>
            {countdown}
          </div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg" // You can add this line if needed
            videoConstraints={{
              width: 1280, // Specify your desired video width
              height: 720,  // Specify your desired video height
            }}
            className='rounded-lg h-[250px] w-[325px] '
          />
        </div>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='font-bold text-2xl text-white'>Result</p>
          <img
            src={displayed}
            alt="Captured Image"
            height={325}
            width={325}
            className='border-black border-2 border-opacity-5 rounded-xl '
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
