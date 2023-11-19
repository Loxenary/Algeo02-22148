import React, { useState} from 'react';

const WebBG = 'WebBG.jpg'; // Assuming you have the image in your public folder


function PageScrapping({onDataUpdate, setImages}) {
  const [displayed, setDisplayed] = useState("");
      
  const handleImageScrapping = async ()=> {
    if(displayed === ""){
        alert("PLS INPUT URL IMAGE BEFORE PROCEED")
        return;
    }

    try {
        const file = await fetch(displayed);
        if(!file.ok){
            console.error("Image Error, URL Invalid");
            alert("IMAGE ERROR URL NOT FOUND");
            return;
        }
        const blob = await file.blob();
        const files = new File([blob], "Scrap.jpg", {type: blob.type});
        if(files == null){
            alert("URL ERROR");
            return;
        }
        
        setImages(displayed)
        let formData = new FormData();
        formData.append('input_image',files);
        console.log("TEst: ",files);
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
    
  };


  return (
    <section className='bg-yellow-100 w-full h-full pb-20 flex flex-col items-center justify-center'>
      <img src={WebBG} alt="Background Website" className="h-full w-full fixed top-0 left-0 z-[-100] text-[#2F3238]" />

      <div className='mt-[75px]' />
      <div className='flex flex-col items-center justify-center'>
        <div className="shadow-xl h-[350px] w-[800px] rounded-3xl bg-black bg-opacity-20 p-8 flex gap-y-2 items-center backdrop-blur-sm flex-col ">
          <div className='flex flex-col items-center '>
            <p className='font-bold text-3xl text-white'>IMAGE SCRAPPING</p>
          </div>
          <div className='flex flex-col items-center'>
            <textarea
              placeholder="Paste image URL for scrapping..."
              value={displayed}
              onChange={(e) => setDisplayed(e.target.value)}
              className='mt-4 px-40 p-10 border-2 border-black rounded-md text-xl text-center'
            />
            <button onClick={handleImageScrapping} className='bg-[black] w-[200px] rounded-full font-medium mt-4 mx-auto py-3 text-[aquamarine]'>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageScrapping;
