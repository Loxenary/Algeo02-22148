import cv2
import os
import time
import numpy as np

def Color(filepath, folderpath):
    start_time = time.time()
    input_image = cv2.imread(filepath)
    #Global Dataset
    

    #Block Dataset
    img_h, img_s, img_v = block_processing(input_image)
    DataSetHSVBlockProcess(folderpath,img_h,img_v,img_s)
    end_time = time.time()  # Record the end time
    elapsed_time = end_time - start_time  # Calculate the elapsed time

    print("Time taken: {:.2f} seconds".format(elapsed_time))

def cosine_similarity(hist1, hist2):
    length1 = length_vec(hist1)
    length2 = length_vec(hist2)
    if length1 == 0 or length2 == 0:
        return 0
    
    similarity = dot(hist1, hist2) / (length1 * length2)
    return similarity

def dot(vec1, vec2):
    dot_product = 0
    for i in range(len(vec1)):
        dot_product += vec1[i] * vec2[i]
    return dot_product

def length_vec(vec1):
    length = 0
    for i in range(len(vec1)):
        length += (vec1[i])**2
    return length ** (1/2)



def HSVBlockProcessor(image, x_Start, x_End, y_Start, y_End):
    image = cv2.resize(image, (250,250))
    R,G,B = cv2.split(image)
    
    H = []
    S = []
    V = []

    R = R/255.0
    G = G/255.0
    B = B/255.0
    for i in range(y_Start, y_End):
        for j in range(x_Start,x_End):
            red = R[i][j] 
            green = G[i][j]
            blue = B[i][j]
            H.append(Hue(red, green, blue))
            S.append(Saturation(red, green, blue))
            V.append(cmax(red, green, blue))
    Hist_H = Histogram_Calculation(H,32)
    Hist_S = Histogram_Calculation(S,32)
    Hist_V = Histogram_Calculation(V,32)
    return Hist_H, Hist_S,Hist_V

def Histogram_Calculation(HSV_Value, bins = 32):
    histogram = [0 for i in range(bins)]
    for val in HSV_Value:
        idx = int(val * bins)
        if(idx >= bins):
            idx = bins-1
        if(0 <= idx < bins):
            histogram[idx] += 1
    sums_values = len(HSV_Value)
    if(sums_values > 0):
        histogram = [val/sums_values for val in histogram]
    
    return histogram

def DataSetHSVProcess(folder_path,img_h, img_s,img_v):

    # dataset_hist = []
    global dataArr
    i = 0
    for filename in os.listdir(folder_path):
        dataArr.append(filename)
        img = cv2.imread(os.path.join(folder_path, filename))
        if img is not None:
            
            hist_h, hist_s, hist_v = HSVBlockProcessor(img)
            similarity_h = cosine_similarity(img_h, hist_h)
            similarity_s = cosine_similarity(img_s,hist_s)
            similarity_v = cosine_similarity(img_v,hist_v)
            
            # dataset_hist.append((hist_h, hist_s, hist_v))
            similarity = ((similarity_h + similarity_s + similarity_v) / 3) * 100

            print(f"Similarity with dataset image {i}: {similarity}")
            i += 1  

def DataSetHSVBlockProcess(folder_path, img_h, img_v,img_s):
    global dataArr

    for filename in os.listdir(folder_path):
        dataArr.append(filename)
        img = cv2.imread(os.path.join(folder_path, filename))
        if img is not None:
            hist_h_list, hist_s_list, hist_v_list = block_processing(img)

            total_similarity = 0
            for i in range(9):
                similarity_h = cosine_similarity(img_h[i], hist_h_list[i])
                similarity_s = cosine_similarity(img_s[i], hist_s_list[i])
                similarity_v = cosine_similarity(img_v[i], hist_v_list[i])
                block_similarity = ((similarity_h + similarity_s + similarity_v) / 3) * 100
                total_similarity += block_similarity

            similarity = (total_similarity) 

            print(f"Similarity with dataset image {filename}: {similarity}")

def cmax(R, G, B):
    maximum = R
    if (R < G and B < G):
        maximum = G
    elif (G < B and R < B):
        maximum = B
    return maximum

def cmin(R, G, B):
    minimum = R
    if (R > G and B > G):
        minimum = G
    elif (G > B and R > B):
        minimum = B
    return minimum

def Delta(R, G, B):
    Cmax = cmax(R, G, B)
    Cmin = cmin(R, G, B)
    delta = Cmax - Cmin
    return delta

def Saturation(R, G, B):
    Cmax = cmax(R, G, B)
    delta = Delta(R, G, B)
    if (Cmax == 0):
        s = 0
    else:
        s = delta / Cmax
    return s

def Hue(R, G, B):
    delta = Delta(R, G, B)
    max_val = cmax(R, G, B)
    if delta == 0:
        return 0
    else:
        result = 0
        if max_val == R:
            result = (60 * (((G - B) / delta) % 6))
        elif max_val == G:
            result = (60 * (((B - R) / delta) + 2))
        elif max_val == B:
            result = (60 * (((R - G) / delta) + 4))
        return result

def block_Calculation(image):
    block = 3
    height,width = image.shape[:2]
    px_Separation= [0 for i in range(block*block)]
    py_Separation= [0 for j in range(block * block)]

    px = int(width / block)
    py = int(height / block)
    k = 0
    for i in range(block):
        for j in range(block):
            px_Separation[k] = int(px * (i + 1))
            py_Separation[k] = int(py * (j + 1))
            k += 1
    return px_Separation, py_Separation

def block_processing(image):
    px_Separation, py_Separation = block_Calculation(image)
    Hist_h_list = []
    Hist_s_list = []
    Hist_v_list = []

    for i in range(9):
        if(i == 0):
             H,S,V = HSVBlockProcessor(image,0,px_Separation[i],0,py_Separation[i])
        else:
            H,S,V = HSVBlockProcessor(image,px_Separation[i-1],px_Separation[i],py_Separation[i-1],py_Separation[i])
        Hist_h_list.append(H)
        Hist_s_list.append(S)
        Hist_v_list.append(V)
    return Hist_h_list,Hist_s_list,Hist_v_list

dataArr = []