# Project Name
> TUGAS ALGEO KELOMPOK CBIR.

> WEB untuk melakukan data similarity Extracting untuk Image dengan Dataset dengan 2 teknik utama yaitu CBIR melalui tekstur dan CBIR melalui Color

# Table Of Contents
* [General Inforamation About Website](#Information)
* [Technology Involved in the Project](#Technology-Involved)
* [Web Setup](#SETUP)
* [How to use](#how-to-use)
* [Features](#Features)
* [Screenshots of our website](#Screenshots)
  
## Information
- A website that can do a data similarity checking of a dataset and an input image
- This website is a starter for us to learn a machine learning as how it works is basically the smae
- This website is also a task completion of a geometrical Algebra 

## Technology-Involved
> Backend : Fastapi, python

> Frontend : React, Typescript
## SETUP
- Download all of the files in this github repository
- Backend
  - python that is used has to be with version > 8 and < 12
  - Install Virtual Environment (if not installed yet). Run 'pip install virtualenv'
  - Create the virtual environtment
    - go to the project directory, proceed to src/BackEnd
    - Create virtual environtment by running 'virtualenv venv' (this venv is optional) in terminal
  - Run the virtual environtment
    - Proceed to the backend directory at src/BackEnd
    - run 'venv/Scripts/activate.ps1' (windows)
    - run 'source env/bin/activate.ps1' (macOS or Unix)
    - if in the terminal there has been "(venv)" in the right side, the virtual environtment has been completely executed
  - Install Dependencies
    - after run the virtual environtment
    - run commands 'pip install -r requirement.txt'
  - Start the server
    - try 'uvicorn main:app --reload' 
    - if it doesn't works try 'python -m uvicorn main:app --reload'
    - if it still doesn't work it might be your python problems or you haven't create a virtual environtment
- Frontend
    - Download node-js. The version we use are 18.17.1. Download Link: (https://nodejs.org/en/download)
    - Download dependencies
      - run 'npm install' to get all of the frontend dependencies
    - Build the web
      - run 'npm run build'
      - then run 'serve -s build'
      - go to localhost 'http://localhost:3000'
    - If the builds didn't work try Start development server
      - run 'npm run start'
> Make sure to run both backend server and frontend server at the same times

## How To Use
- SETUP The Web. Checks on [SETUP](#SETUP)
- there are 3 ways to input
- Click insert images to input any images from file explorer
- Click open camera to use camera as an input
- Click open Scraping to use scrapping url as an input
- Then insert your datasets using upload datasets
- lastly click on search button to see the result
- 
## Features
- Input using Camera
- Input using Image Scrapping
- Input from file
- Switch between Color and Texture
## Screenshots
### HOME Screen
<img src="img/Home.png" alt="Home Screen" width="400" />

### Not Inputted Image
<img src="img/Uninput.png" alt="Not Inputted Image" width="400" />

### Inputted Image
<img src="img/Inputted.png" alt="Inputted Image" width="400" />

### Camera
<img src="img/Camera.png" alt="Camera" width="400" />

### Image Scrapping
<img src="img/ImageScrapping.png" alt="Image Scrapping" width="400" />

### Penjelasan Program
<img src="img/PenjelasanProgram.png" alt="Penjelasan Program" width="400" />

### How To Use
<img src="img/HowToUse.png" alt="How To Use" width="400" />

### About Us
<img src="img/About-us.png" alt="About Us" width="400" />
