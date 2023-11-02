import cv2 
import numpy as np

def Texture(filepath):
    greyscaleTransform(filepath)

def greyscaleTransform(filepath):
    image = cv2.imread(filepath)
    height, width = image.shape[:2]
    bluePixels, greenPixels, redPixels = cv2.split(image)


    hasimage = [[0 for j in range(width)] for i in range(height)]
    greyimage = np.zeros((height, width), dtype=np.uint8)

    print(greyimage)

    # for i in range(width):
    #     for j in range(height):
    #         val = 0.29 * redPixels[j][i] + 0.587 * greenPixels[j][i] + 0.114 * bluePixels[j][i]
    #         greyimage[j][i] = val

    # cv2.imshow('Grayscale Image', greyimage)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

