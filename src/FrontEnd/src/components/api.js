// api.js
const API = {
    switchpost: async (event,isChecked, setLoading, setData, data) => {   // calling search backend server
      if(event){
        event.preventDefault();
      }
      try {
        let switchstate = new FormData();
          
          
          switchstate.append('state', isChecked.toString());
          setLoading(true);
          const endpoint = "http://localhost:8000/search/";
          const response = await fetch(endpoint, {
            method: 'POST',
            body: switchstate,
          });
    
          if (response.ok) {
            console.log('Switch state updated successfully');
            
            await API.getData(setData,setLoading); 
          } else {
            console.error('Failed to update switch state');
          }
    
          
        } catch (error) {
          console.error('Error: ', error);
        }
    
    },
  
    getData: async (setData,setLoading) => { // get all the similarities and filenames data to the server
      try {
        const endpoint = "http://localhost:8000/showFile";
        const response = await fetch(endpoint);
        const file = await response.json();

        if(Object.keys(file).length > 1){
            setData(file);
        }
        else{
          alert("PLEASE INPUT DATASET of images !! or INPUT IMAGE FIRST!!");
          setLoading(false)
        }
        console.log("getData called successfully");
      } catch (error) {
        console.error("error:", error);
      }
    },
  
    handleUploadChange: async (event, setImage) => { // Handling single input image
        let uploaded = event.target.files[0];
      try {
        const url = URL.createObjectURL(uploaded);
        setImage(url);
  
        let formData = new FormData();
        formData.append('input_image', uploaded);
  
        const endpoint = "http://localhost:8000/UploadImage/";
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          console.log("Besok Berhasil");
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error during fetch: ", error);
      }
    },
  };
  
  export default API;
  