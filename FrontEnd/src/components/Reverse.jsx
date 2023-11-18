import React, { useEffect, useState } from 'react';
import DatasetUpload from './DatasetUpload';
import Switch from './Switch'
import Camera from './Camera';
import API from './api';


const Reverse = () => {
    const [image, setImage] = useState("https://fakeimg.pl/350x200");
    const [isChecked, setIschecked] = useState(false)
    const [data, setData] = useState({})
    const [Loading, setLoading] = useState(false);
    const [isCamOn, setCam] = useState(false);



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

    const handleCameraChange = async (event) => {
        if(isCamOn){
            await API.switchpost(event,isChecked, setLoading, setData, data);

        }
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        API.switchpost(event,isChecked, setLoading, setData ,data);
    }

    const handleFileChange = async (event) =>{
        event.preventDefault();
        API.handleUploadChange(event, setImage);
    }

    return  (
        <div className='w-full bg-white py-10 px-0' id='reverse'>
            <div className='w-full flex py-20 items-center justify-center '>
                <div className='flex flex-row mx-20 items-center justify-between gap-36'>
                    <div className='Upload'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='w-25 mt-5 mx-auto float-left'>
                                <div>
                                    <img src={image} alt="" className='img-thumbnail' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[1240px] mx-auto flex-col flex items-center'>
                        <div className='flex-col flex gap-x-2'>
                            <div className='my-3 items-end'>
                                <h2 className='font-bold text-2xl text-center'>Image Input</h2>
                                <div className='flex justify-center'>
                                    <form>
                                        <input type='file' className='form-control hidden ' id='input_image' onChange={handleFileChange} accept='image/*' />
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
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className='bg-[black] w-[200px] rounded-full font-medium my-6 mx-auto py-3 text-[aquamarine]'>
                              Search
                            </button>

                        </form>            
                    </div>
                </div>
            </div>
            <Camera setCam={setCam} onDataUpdate={handleCameraChange} setImages={setImage}/>
            {image !== "https://fakeimg.pl/350x200" ? ( <DatasetUpload Data={data} Loading={Loading} setLoading={setLoading}/>) : (<h3 className='pt-12 text-center text-2xl font-[Poppins-SemiBold]'>PLS UPLOAD YOUR IMAGE INPUT FIRST !!!</h3>)}
           
        </div>
    )
}

export default Reverse;
