import cv2
import numpy as np
import os

def Texture(filepath, folderpath): # Main Function
    input_image = cv2.imread(filepath)
    vec1 = calculate_texture_features(input_image)
    DataSetSimilarityProcess(folderpath, vec1)
 
def greyscaleTransform(image): # GreyScale Extracting
    height, width = image.shape[:2]
    bluePixels, greenPixels, redPixels = cv2.split(image)

    greyimage = np.zeros((height, width), dtype=int)
    for i in range(height):
        for j in range(width):
            greyimage[i][j] = int(0.29 * redPixels[i][j] + 0.587 * greenPixels[i][j] + 0.114 * bluePixels[i][j])
    return greyimage

def calculate_texture_features(image): # Vector Occurence Extracting
    # Perform grayscale transformation
    grey_image = greyscaleTransform(image)
    
    # Calculate GLCM features

    glcm_features = [GLMCMatrixProcessingUnit(co_occurance_mat(grey_image,angle)) for angle in [0,45,135,180,225,270,315]]

    # Combine all features into a single vector
    combined_features = np.concatenate(glcm_features)

    return combined_features

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

def co_occurance_mat(image, angle): # Normalized Co Occurence Matrix
    height, width = image.shape
    co_occurrence = np.zeros((256, 256), dtype=float)

    sudut = angle * (np.pi / 180)
    offset_x = int(np.cos(sudut))
    offset_y = int(np.sin(sudut))

    for i in range(height):
        for j in range(width):
            off_y = int(i + offset_y)
            off_x = int(j + offset_x)
            if 0 <= off_x < width and 0 <= off_y < height:
                co_occurrence[image[i,j],image[off_y][off_x]] = 1
    return NormSymmetric(co_occurrence)

                
def TranposeAndSum(mat): # Get Tranpose and Sums Value of a Matriks

    matTrans = np.zeros((len(mat[0]), len(mat)),dtype= float)
    matSum = 0
    for i in range(len(mat)):
        for j in range(len(mat[i])):
            matTrans[i,j] = mat[j,i]
            matSum += mat[i,j] 
    return matTrans, matSum

def NormSymmetric(mat): # Get the Normalized Value of Matriks (for Co-Occurence)
    tranpose, sums = TranposeAndSum(mat)
    
    return (tranpose/sums)
    
def GLMCMatrixProcessingUnit(mat): # Get All of the Property of GLCM matriks
    level = 255
    mean_i, mean_j, std_i, std_j = 0,0,0,0
    contrast, dissimiliarity,homogeniety,asm,energy,Entropy, correlation = 0,0,0,0,0,0,0
    for i in range(level):
        for j in range(level):
            px = mat[i,j]
            contrast += (px * (i-j)**2)
            homogeniety += (px/ (1 + (i-j)**2))
            dissimiliarity += (px* abs(i-j))
            asm +=  (px**2)
            
            if px != 0:
                Entropy -=  (px * np.log(px))

            mean_i += i * px
            mean_j += j * px
            std_i += ((i - mean_i) **2)  * px
            std_j += ((j - mean_j) **2) * px
    std_i = np.sqrt(std_i)
    std_j = np.sqrt(std_j)
    for i in range(level):
        for j in range(level):
            correlation += ((i - mean_i) * (j - mean_j) * mat[i,j]) / (std_i * std_j)
    
    energy = np.sqrt(asm)
    return contrast, dissimiliarity, homogeniety, asm, energy, Entropy, correlation


def cosine_similarity(vec1, vec2): # get the similarity of 2 Vector, In this case(2 property vectors)
    dot,l1,l2 = DotAndLength(vec1,vec2)
    similarity = dot/ (l1 * l2)

    return similarity

def DotAndLength(vec1, vec2): # get the dot and a length(panjang satuan) matriks
    dot_product = 0
    length_vec1 = 0
    length_vec2 = 0
    for i in range(len(vec1)):
        dot_product += vec1[i] * vec2[i]
        length_vec1 += vec1[i]**2
        length_vec2 += vec2[i]**2
    length_vec1 = np.sqrt(length_vec1)
    length_vec2 = np.sqrt(length_vec2)

    return dot_product,length_vec1,length_vec2

