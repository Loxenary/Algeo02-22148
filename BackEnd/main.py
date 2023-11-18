from fastapi import FastAPI, UploadFile, File, HTTPException,Form, Depends
from typing import List
from pathlib import Path
from Texture_CBIR import Texture
from Color_CBIR import Color
import os
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI()

UPLOAD_IMAGE_DIR = Path("input_images")
UPLOAD_DATASET_DIR = Path("datasets")

origins = ["http://localhost:3000"]  # Replace "*" with your frontend domain(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AppState:
    isFunctionDone : bool = False
    data = None
    search_lock = asyncio.Lock()

app_state = AppState()

app.mount("/datasets", StaticFiles(directory=UPLOAD_DATASET_DIR), name = "datasets")

@app.post('/UploadImage/')

async def UploadImage(input_image: UploadFile):
    
    if(UPLOAD_IMAGE_DIR.exists() == False):
        os.makedirs(UPLOAD_IMAGE_DIR)

    existing_file= UPLOAD_IMAGE_DIR.glob("*")
    for file in existing_file:
        file.unlink()
    
    

    data = await input_image.read()
    save_to = UPLOAD_IMAGE_DIR / input_image.filename
    with open(save_to, 'wb') as f:
        f.write(data)
    return {"filenames": input_image.filename}

@app.get("/showFile")
async def showFile():
    global app_state
    async with app_state.search_lock:
        if(app_state.isFunctionDone and app_state.data is not None):
            if(app_state.data != None):
                app_state.isFunctionDone = False
                return app_state.data
    return {"message": "Function not done or data is None"}
# @app.delete('/deleteSingleImage/')
# async def deleteSingleImage(filename: str):
#     image_path = UPLOAD_DATASET_DIR/filename
#     if(image_path.exists()):
#         image_path.unlink()
#         return {"Image deleted successfully"}
#     else:
#         raise HTTPException(status_code= 404, detail= "image not found")


@app.post('/reset-data')
async def reset_data():
    global app_state
    async with app_state.search_lock:
        app_state.data = None
        app_state.isFunctionDone = False

        input_data = UPLOAD_IMAGE_DIR.glob("*")
        for file in input_data:
            file.unlink()
        existing_data= UPLOAD_DATASET_DIR.glob("*")
        for file in existing_data:
            file.unlink()

        return {"message": "Data reset successfully"}


@app.post('/search/')
async def search(state : bool = Form(...)):
    global app_state
    async with app_state.search_lock:
        dataset = f'{UPLOAD_DATASET_DIR}'
        fileset = f'{UPLOAD_IMAGE_DIR}'
        
        isDatasetEmpty = not any(os.listdir(dataset))
        isInputFileEmpty = not any(os.listdir(fileset))
        if(not isInputFileEmpty and not isDatasetEmpty):
            input_filename = [file for file in os.listdir(fileset)][0]
            filename = f'{UPLOAD_IMAGE_DIR/input_filename}'
            if(state):
                app_state.data = Texture(filename, dataset)
                app_state.isFunctionDone = True
            else:
                app_state.data = Color(filename, dataset)
                app_state.isFunctionDone = True

@app.post('/uploadDataset/')

async def uploadDataset(dataset: List[UploadFile] = File(...)):
    

    if(UPLOAD_DATASET_DIR.exists() == False):
        os.makedirs(UPLOAD_DATASET_DIR)
    existing_file= UPLOAD_DATASET_DIR.glob("*")
    for file in existing_file:
        file.unlink()
    
    filenames = []

    for file in dataset:
        if file.content_type.startswith('image/'):
            data = await file.read()
            save_to = UPLOAD_DATASET_DIR / file.filename.split('/')[-1]
            with open(save_to, 'wb') as f:
                f.write(data)
            filenames.append(save_to.relative_to(UPLOAD_DATASET_DIR).as_posix())

    # Check if no valid files were found
    if not filenames:
        raise HTTPException(status_code=422, detail="No valid image files provided")

    return {"filenames": filenames}

