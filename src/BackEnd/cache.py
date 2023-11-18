
def clearCache(file_path):
    f = open(file_path,'w')
    f.write("")
    f.close()

def write_to_file(file_path,filename,data1,data2,data3): # menulis cache color
    f = open(file_path, 'a')
    f.write(filename+";"+data1+";"+data2+";"+data3+"\n")

def write_list_to_file(file_path,filename,list): # menulis cache tekstur
    f = open(file_path,'a')
    f.write(filename+";"+str(list)+"\n")

def isinCache(filename,cachefile):
    idx = -1
    file_list = cachefilelist(cachefile)
    for i in range (len(file_list)):
        if file_list[i] == filename:
            idx = i
    
    return idx


    
def cachefilelist(cachefile): #list dari nama file yang ada di cache
    f = open(str(cachefile),'r')
    df = f.readlines()
    file_list = []
    for i in range (len(df)):
        x = df[i].split(';')
        file_list.append(x[0])
    return file_list


def readHSV(txt): #untuk membaca cache color
    temp = []
    tempmatrix = []
    list_h = []
    list_s = []
    list_v = []
    x = txt.split(";")
    #print(x)
    a = ''
    b = ''
    filename = x[0]
    #print(filename)
    for i in range (1,4) :
        a = x[i].strip("\n");a = a.strip("]]") ; b = a.strip("[[") ; x[i] = b.split("], [")
        
    for i in range (1,4):
        tempmatrix = []
        for j in range(len(x[i])):
                a = x[i][j].split(",")
                #print(a)
                temp = []
                for k in range (len(a)):
                    num = float(a[k])
                    temp.append(num)
                tempmatrix.append(temp)
        if i == 1:
            list_1 = tempmatrix
        elif i == 2:
            list_2 = tempmatrix
        else:
            list_3 = tempmatrix
    '''print(list_h)
    print(list_s)
    print(list_v)'''
    return list_1,list_2,list_3

def readTexture(txt): #untuk membaca cache texture
    x = txt.split(";")
    temp = []
    a = ''
    a = x[1].strip("\n")
    a = a.strip("[")
    a = a.strip("]")
    a = a.split(",")
    for i in range (len(a)):
        b = float(a[i])
        temp.append(b)
    return temp