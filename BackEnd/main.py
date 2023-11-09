from fastapi import FastAPI
from fastapi import UploadFile, File


app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile):
    # Process the uploaded file here
    # Example: Save the file to the server
    with open(file.filename, "wb") as f:
        f.write(file.file.read())
    return {"filename": file.filename}
