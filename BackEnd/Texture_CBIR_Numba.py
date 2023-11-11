import cv2
import numpy as np
import os
import time
from multiprocessing import Pool
from numba import njit

def Texture(filepath, folderpath): # Main Function
    start_time = time.time()
    input_image = cv2.imread(filepath)
    vec1 = calculate_texture_features(input_image)
    DataSetSimilarityProcess(folderpath, vec1)
    end_time = time.time()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time

    print("Time taken: {:.2f} seconds".format(elapsed_time))

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

def DataSetSimilarityProcess(folder_path, input_image_vec): # Data set Processor
    global dataArr
    i = 0
    for filename in os.listdir(folder_path):
        img = cv2.imread(os.path.join(folder_path, filename))
        if img is not None:
            vec2 = calculate_texture_features(img)
            similarity = cosine_similarity(input_image_vec, vec2)
            print(f"Similarity with dataset image {i}: {similarity * 100}")
            i += 1
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