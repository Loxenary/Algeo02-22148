import React, { useEffect, useState } from 'react';
import DatasetUpload from './DatasetUpload';
import Switch from './Switch'
const Reverse = () => {
    // const [uploadedImageUrl, setUploadedImageUrl] = useState("https://fakeimg.pl/350x200");

    // function handleImageUpload(url) {
    //     // Update the uploaded image URL
    //     setUploadedImageUrl(url);
    // }

    // function clickme(e) {
    //     document.getElementById("formFile").click();
    // }
    const [image, setImage] = useState("https://fakeimg.pl/350x200");
    const [isChecked, setIschecked] = useState(false)
    const [data, setData] = useState({})
    const [Loading, setLoading] = useState(false);

    const getData  = async() => {
        try{
          const endpoint = "http://localhost:8000/showFile"
          const response = await fetch(endpoint);
          const file = await response.json();
          setData(file);
          console.log("getData called successfully");
        }catch(error){
          console.error("error:",error);
        }
      };

    const resetData = async() => {
        try{ 
            const endpoint = "http://localhost:8000/reset-data"
            const response = await fetch(endpoint, {
                method : 'POST',
            });
            if (response.ok) {
                console.log('Data reset successfully');
            } else {
                console.error('Failed to reset data');
            }
            
        }catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUploadChange = async (e) =>{
        console.log(e.target.files[0]);
        const uploaded = e.target.files[0];
        const url = URL.createObjectURL(uploaded);
        console.log(uploaded);
        setImage(url)
        e.preventDefault();

        let formData = new FormData();
        formData.append('input_image', uploaded);
        try{
            const endpoint = "http://localhost:8000/UploadImage/";
            const response = await fetch(endpoint, {
                method : "POST",
                body: formData
            });

            if(response.ok){
                console.log("Besok Berhasil")
            }
            else{
                console.error("Upload failed");
            }
        } catch(error){
            console.error("Error during fethc: ",error);
        }
    }
    // const HandleSubmit = async (event) =>{
    //     event.preventDefault();

    //     let formData = new FormData();
    //     formData.append('input_image', file);
    //     try{
    //         const endpoint = "http://localhost:8000/UploadImage/";
    //         const response = await fetch(endpoint, {
    //             method : "POST",
    //             body: formData
    //         });

    //         if(response.ok){
    //             console.log("Besok Berhasil")
    //         }
    //         else{
    //             console.error("Upload failed");
    //         }
    //     } catch(error){
    //         console.error("Error during fethc: ",error);
    //     }
    // }

    function handleSwitchChange () {
        setIschecked(!isChecked);

    }
    const switchpost = async (event) => {
        event.preventDefault();
        let switchstate = new FormData()
        setLoading(true);
        switchstate.append('state',isChecked.toString());
        try {
            const endpoint = "http://localhost:8000/search/"
            const response = await fetch(endpoint, {
                method : 'POST',
                body : switchstate,
            });
            if (response.ok) {
                console.log('Switch state updated successfully');
            } else {
                console.error('Failed to update switch state');
            }
            await(getData());
        }
        catch (error){
            console.error('Error: ',error);
        }
    }
    
    useEffect(() => {
        const handleBeforeRestart = async () => {
            await resetData();
        };
        window.addEventListener('beforeunload',handleBeforeRestart);

        return () => {
            window.removeEventListener('beforeunload',handleBeforeRestart);
                };
    }, [])

    function clickme(e){
        document.getElementById("input_image").click();
    }

    return  (
        <div className='w-full bg-white py-16 px-4' id='reverse'>
            <div className='w-full flex items-center justify-center '>
                <div className='flex flex-row items-center justify-between gap-36'>
                    <div className='Upload'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='w-25 mt-5 mx-auto float-left'>
                                <div>
                                    <img src={image} alt="" className='img-thumbnail' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[1240px] mx-auto flex-col flex'>
                        <div className='flex-col flex gap-x-2'>
                        
                            <div className='my-3 items-end'>
                                <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                                <div className='flex justify-center'>
                                    <form>
                                        <input type='file' className='form-control hidden ' id='input_image' onChange={handleUploadChange} accept='image/*' />
                                    </form>
                                    <button onClick={clickme} className='btn btn-primary w-100 mt-2 bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Insert Image</button>
                                </div>
                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-center text-[20px] font-bold'>Color</p>
                                <Switch isChecked={isChecked} onSwitchChange={handleSwitchChange}/>
                                <p className='text-center text-[20px] font-bold'>Texture</p>
                            </div>
                        </div>
                        <form onSubmit={switchpost}>
                            <button type="submit" className='bg-[black] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[aquamarine]'>Search</button>
                            </form>
       
                   
                    </div>
                </div>
            </div>
            <DatasetUpload Data={data} Loading={Loading} setLoading={setLoading}/>
        </div>
    )
}

export default Reverse;
