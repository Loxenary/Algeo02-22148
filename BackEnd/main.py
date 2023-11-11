from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import List
from pathlib import Path


app = FastAPI()

UPLOAD_IMAGE_DIR = Path("input_images")
UPLOAD_DATASET_DIR = Path("datasets")

@app.post('/UploadImage/')

async def UploadImage(input_image: UploadFile):
    existing_file= UPLOAD_IMAGE_DIR.glob("*")
    for file in existing_file:
        file.unlink()
    
    data = await input_image.read()
    save_to = UPLOAD_IMAGE_DIR / input_image.filename
    with open(save_to, 'wb') as f:
        f.write(data)
    return {"filenames": input_image.filename}



@app.post('/uploadDataset/')

async def uploadDataset(dataset: List[UploadFile] = File(...)):
    
    existing_file= UPLOAD_DATASET_DIR.glob("*")
    for file in existing_file:
        file.unlink()
    
    filenames = []

    for file in dataset:
        if file.content_type.startswith('image/'):
            data = await file.read()
            save_to = UPLOAD_DATASET_DIR / file.filename
            with open(save_to, 'wb') as f:
                f.write(data)
            filenames.append(file.filename)

    # Check if no valid files were found
    if not filenames:
        raise HTTPException(status_code=422, detail="No valid image files provided")

    return {"filenames": filenames}
