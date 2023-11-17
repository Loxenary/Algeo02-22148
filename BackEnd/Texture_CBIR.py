import cv2
import numpy as np
import os
import time
from numba import njit
import cache as cc

def Texture(filepath, folderpath): # Main Function

    dataFile = []
    dataSimilarity = []
    start_time = time.time()
    input_image = cv2.imread(filepath)
    vec1 = calculate_texture_features(input_image)
    DataSetSimilarityProcess(folderpath, vec1, dataFile, dataSimilarity)


    end_time = time.time()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time
    dataFile, dataSimilarity = mergeSort(dataFile,dataSimilarity) 


    dataFile.append("Time")
    dataSimilarity.append(elapsed_time)
    sim_dict = dict(zip(dataFile,dataSimilarity))


    return sim_dict
    

def greyscaleTransform(image): # GreyScale Extracting
    height, width = image.shape[:2]
    bluePixels, greenPixels, redPixels = image[:, :, 0], image[:, :, 1], image[:,:,2]


    greyimage = np.zeros((height, width), dtype=float)
    greyimage = 0.29 * redPixels + 0.587 * greenPixels + 0.114 * bluePixels
    return greyimage

def calculate_texture_features(image): # Vector Occurence Extracting
    # Perform grayscale transformation
    
    grey_image= greyscaleTransform(image)
    # Calculate GLCM features

    # glcm_features = [GLMCMatrixProcessingUnit(co_occurance_mat_Backup(grey_image,angle,max)) for angle in [0]]

    glcm_features = GLMCMatrixProcessingUnit(co_occurance_mat(grey_image,0))
    glcm_features = list(glcm_features)
    return glcm_features

def DataSetSimilarityProcess(folder_path, input_image_vec,dataFile, dataSimilarity): # Data set Processor
    cache_file = "cacheTextur.csv"
    f = open(cache_file,'r')
    df = f.readlines()
    for filename in os.listdir(folder_path):
        idx = -1
        img = cv2.imread(os.path.join(folder_path, filename))
        idx = cc.isinCache(filename,cache_file)
        if img is not None:
            if(idx != -1):
                vec2 = cc.readHSV(df[idx])
            else:
                vec2 = calculate_texture_features(img)
            cc.write_list_to_file(cache_file,filename,vec2)
            similarity = cosine_similarity(input_image_vec, vec2)
            if(similarity * 100 > 40):
                dataFile.append(filename)
                dataSimilarity.append(similarity*100)

    


def merge(firstfile, lastfile, firstsim, lastsim):
    i,j = 0,0
    file = []
    sim = []
    while i < len(firstsim) and j < len(lastsim):
        if(firstsim[i] > lastsim[j]):
            sim.append(firstsim[i])
            file.append(firstfile[i])
            i += 1
        else:
            sim.append(lastsim[j])
            file.append(lastfile[j])
            j+=1
    while i < len(firstsim):
        sim.append(firstsim[i])
        file.append(firstfile[i])
        i += 1
    while j < len(lastsim):
        sim.append(lastsim[j])
        file.append(lastfile[j])
        j+=1
    return file,sim

def mergeSort(file, similarity):
    if(len(similarity) <= 1):
        return file,similarity
    middle = len(similarity) // 2
    firstFile, firstSim = mergeSort(file[:middle],similarity[:middle])
    lastFile, lastSim = mergeSort(file[middle:],similarity[middle:])

    return merge(firstFile,lastFile,firstSim,lastSim)

@njit
def co_occurance_mat(image, angle):
    height, width = image.shape[:2] # get the image height and width
    co_occurrence = np.zeros((256,256), dtype=np.float64)

    sudut = angle * (np.pi / 180)
    offset_x = int(np.cos(sudut))  # Cast the result to int
    offset_y = int(np.sin(sudut))  # Cast the result to int

    for i in range(height):
        for j in range(width):
            off_y = i + offset_y
            off_x = j + offset_x
            if 0 <= off_x < width and 0 <= off_y < height:
                curr_val = int(image[i, j])  # Cast the result to int
                off_val = int(image[off_y, off_x])  # Cast the result to int
                co_occurrence[curr_val, off_val] += 1
    NormMatrix = NormSymmetric(co_occurrence)
    return NormMatrix

@njit
def Tranpose(mat): # Get Tranpose and Sums Value of a Matriks

    matTrans = np.zeros((len(mat[0]), len(mat)),dtype= np.float64)
    for i in range(len(mat)):
        for j in range(len(mat[0])):
            matTrans[i,j] = mat[j,i]
    return matTrans
@njit
def NormSymmetric(mat): # Get the Normalized Value of Matriks (for Co-Occurence)
    mats = Tranpose(mat) + mat 
    sums = np.sum(mats)
    
    #sumsB = np.sum(mat)
        
    return (mats/sums)


def GLMCMatrixProcessingUnit(mat):
    i, j = np.indices(mat.shape)
    px = mat

    contrast = np.sum(px * (i - j) ** 2)
    homogeneity = np.sum(px / (1 + np.abs(i - j)))
    dissimilarity = np.sum(px * np.abs(i - j))
    asm = np.sum(px ** 2)
    entropy = -np.sum(px * np.log(np.where(px != 0, px, 1)))
    energy = np.sqrt(asm)

    return contrast, dissimilarity, homogeneity, asm, energy, entropy

def cosine_similarity(vec1, vec2): # get the similarity of 2 Vector, In this case(2 property vectors)
    dot,l1,l2 = DotAndLength(vec1,vec2)
    similarity = dot/ (l1 * l2)

    return similarity

def DotAndLength(vec1, vec2): # get the dot and a length(panjang satuan) matriks
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    dot_product = np.sum(vec1 * vec2)
    length_vec1 = np.sqrt(np.sum(vec1 ** 2))
    length_vec2 = np.sqrt(np.sum(vec2 ** 2))


    return dot_product,length_vec1,length_vec2