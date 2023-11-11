import cv2
import numpy as np
import os
import time
from multiprocessing import Pool

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
    bluePixels, greenPixels, redPixels = cv2.split(image)


    greyimage = np.zeros((height, width), dtype=int)
    greyimage = 0.29 * redPixels + 0.587 * greenPixels + 0.114 * bluePixels
    max_grey_val = int(np.ceil(np.max(greyimage)))
    print(greyimage)
    return greyimage,max_grey_val

def calculate_texture_features(image): # Vector Occurence Extracting
    # Perform grayscale transformation
    grey_image, max = greyscaleTransform(image)
    
    # Calculate GLCM features

    # glcm_features = [GLMCMatrixProcessingUnit(co_occurance_mat_Backup(grey_image,angle,max)) for angle in [0]]

    glcm_features = GLMCMatrixProcessingUnit(co_occurance_mat(grey_image,0,max))
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

def co_occurance_mat(image, angle, max): # Normalized Co Occurence Matrix
    co_occurrence = np.zeros((max+1,max+1), dtype=int)

    sudut = angle * (np.pi / 180)
    offset_x = int(np.cos(sudut))
    offset_y = int(np.sin(sudut))

    
    for i in range(max+1):
        for j in range(max+1):
            off_y = int(i + offset_y)
            off_x = int(j + offset_x)
            if 0 <= off_x < max + 1 and 0 <= off_y < max+1:
                co_occurrence[int(image[i,j]),int(image[off_y][off_x])] += 1
    return NormSymmetric(co_occurrence)         

def Tranpose(mat): # Get Tranpose and Sums Value of a Matriks

    matTrans = np.zeros((len(mat[0]), len(mat)),dtype= int)
    for i in range(len(mat)):
        for j in range(len(mat[i])):
            matTrans[j,i] = mat[i,j]
    return matTrans
def Tranpose2(mat): # Get Tranpose and Sums Value of a Matriks

    matTrans = np.zeros((len(mat[0]), len(mat)),dtype= int)
    i,j = np.indices(np.shape(mat))
    matTrans[i,j] = mat[j,i]
    return matTrans

def NormSymmetric(mat): # Get the Normalized Value of Matriks (for Co-Occurence)
    mats = Tranpose2(mat) + mat 
    sums = np.sum(mat)
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
# def GLMCMatrixProcessingUnitTest(mat,level): # Get All of the Property of GLCM matriks
#     level = level-1
#     mean_i, mean_j, std_i, std_j = 0,0,0,0
#     contrast, dissimiliarity,homogeniety,asm,energy,Entropy, correlation = 0,0,0,0,0,0,0

#     contrast = np.sum()
#     for i in range(level):
#         for j in range(level):
#             px = mat[i,j]
#             contrast += (px * (i-j)**2)
#             homogeniety += (px/ (1 + (i-j)**2))
#             dissimiliarity += (px* abs(i-j))
#             asm +=  (px**2)
            
#             if px != 0:
#                 Entropy -=  (px * np.log(px))

#             mean_i += i * px
#             mean_j += j * px
#             std_i += ((i - mean_i) **2)  * px
#             std_j += ((j - mean_j) **2) * px
#     std_i = np.sqrt(std_i)
#     std_j = np.sqrt(std_j)
#     for i in range(level):
#         for j in range(level):
#             correlation += ((i - mean_i) * (j - mean_j) * mat[i,j]) / (std_i * std_j)
    
#     energy = np.sqrt(asm)
#     return contrast, dissimiliarity, homogeniety, asm, energy, Entropy, correlation


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