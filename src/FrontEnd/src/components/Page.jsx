import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebBG = 'WebBG.jpg'; // Assuming you have the image in your public folder


function Page({onDataUpdate, setImages}) {
  const webcamRef = useRef(null);
  const [displayed, setDisplayed] = useState("https://fakeimg.pl/350x200");
  const [countdown, setCountdown] = useState(5);

  const handleUploadChange = useCallback(async (event) => {

    if (event) {
      console.log(event);
      let formData = new FormData();
      formData.append('input_image', dataURLtoFile(event, "Cam.jpg"));
      try {
        const endpoint = "http://localhost:8000/UploadImage/";
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Besok Berhasil");
          if (onDataUpdate) {
            onDataUpdate();
          }
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error during fetch: ", error);
      }
    }
  }, [onDataUpdate]);


  useEffect(() => {
    const captureInterval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setDisplayed(imageSrc);
        handleUploadChange(imageSrc);
        setImages(imageSrc);
        setCountdown(6);
      }
    }, 5000);

    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return (event) => {
      clearInterval(captureInterval);
      clearInterval(countdownInterval);
    };
  }, [onDataUpdate, handleUploadChange]);

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const arr8bit = new Uint8Array(n);
  
    while (n--) {
      arr8bit[n] = bstr.charCodeAt(n);
    }
  
    return new File([arr8bit], filename, { type: mime });
  };




  return (
    <section className='bg-yellow-100 w-full h-full pb-20 flex flex-col items-center justify-center'>
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
              screenshotFormat="image/jpeg" 
              videoConstraints={{
                width: 1920, // Specify your desired video width
                height: 1080,  // Specify your desired video height
              }}
              className='rounded-lg h-[250px] w-[325px]'
            />
          </div>
          <div className='flex flex-col items-center gap-y-4'>
            <p className='font-bold text-2xl text-white'>Result</p>
            <img
              src={displayed}
              alt="Captured Image"
              height={250}
              width={325}
              className='border-black border-2 border-opacity-5'
            />
          </div>
        </div>

    </section>
    
  );
}

export default Page;
