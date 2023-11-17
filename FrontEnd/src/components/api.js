// api.js
const API = {
    switchpost: async (isChecked, setLoading, setData, data) => {        
        try {
          let switchstate = new FormData();
          if(Object.keys(data).length > 1){
              setLoading(true);
          }
          switchstate.append('state', isChecked.toString());
    
          const endpoint = "http://localhost:8000/search/";
          const response = await fetch(endpoint, {
            method: 'POST',
            body: switchstate,
          });
    
          if (response.ok) {
            console.log('Switch state updated successfully');
            await API.getData(setData); 
          } else {
            console.error('Failed to update switch state');
          }
    
          
        } catch (error) {
          console.error('Error: ', error);
        }
    
    },
  
    getData: async (setData) => {
      try {
        const endpoint = "http://localhost:8000/showFile";
        const response = await fetch(endpoint);
        const file = await response.json();
        // Assuming setData is also part of the API

        if(Object.keys(file).length > 1){
            setData(file);
        }
        else{
          alert("PLEASE INPUT DATASET or INPUT IMAGE FIRST")
        }
        console.log("getData called successfully");
      } catch (error) {
        console.error("error:", error);
      }
    },
  
    handleUploadChange: async (event, setImage) => {
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
  