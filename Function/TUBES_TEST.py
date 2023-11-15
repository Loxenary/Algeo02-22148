import tkinter as tk
import Texture_CBIR as texture
import Color_CBIR as color
#import Texture_CBIR_Numba as nnn
from tkinter import ttk, filedialog
from PIL import Image, ImageTk
import os

def open_file():
    global filename
    global image_default_value
    global the_image
    global resized_image

    file_path = filedialog.askopenfilename(title="Select an Image", filetypes=[('Image files', '*.png *.jpg *.jpeg')])
    if file_path:
        filename.set(file_path)
        image_default_value = file_path
        image = Image.open(image_default_value)
        resized_image = image.resize((300, 300), Image.LANCZOS)
        the_image = ImageTk.PhotoImage(resized_image)
        image_displayer.config(image=the_image)

def upload_dataset():
    filepath = filedialog.askdirectory(title= "Select a Folder")
    global folderpath
    if filepath:
        folderpath = filepath
        image_files = [f for f in os.listdir(filepath) if f.lower().endswith(('.jpg','.png','jpeg'))]
        if image_files:
            canvas3 = tk.Canvas(fifth_container)
            canvas3.grid(row=0,column = 0)

            max_col = 3
            max_row = 2
            image_width = 150
            image_heigth = 150
            row,col = 0,0
            for image in image_files:
                image_path = os.path.join(filepath, image)
                image = Image.open(image_path)
                resized_image = image.resize((image_width, image_heigth),Image.LANCZOS)
                the_image = ImageTk.PhotoImage(resized_image)

                image_label = ttk.Label(canvas3, image=the_image)
                image_label.photo = the_image
                image_label.grid(row = row, column= col, padx=5,pady= 5)
                col+= 1
                if(col > max_col):
                    col = 0
                    row+= 1
                if(row >= max_row):
                    break

def update_selection():
    selection = slider.get()
    if selection == 0:
        slider.configure(troughcolor="red")
    else:
        slider.configure(troughcolor="green")
def search(slider):
    #called when the search button is clicked
    global folderpath
    if(slider.get() == 0):
        if(folderpath):
            color.Color(image_default_value,folderpath)
    else:
        if(folderpath):
            # texture.Texture(image_default_value, folderpath)
            texture.Texture(image_default_value,folderpath)

window = tk.Tk()
window.geometry('1000x800')
window.title('REVERSE IMAGE SEARCH')

title = ttk.Label(master=window, text="REVERSE IMAGE SEARCH", font="Calibri 24")
title.pack()

main_container = ttk.Frame(master=window)

second_container = ttk.Frame(master=main_container)

image_default_value = 'Tubes_Algeo2_IF2110\Function\imagenotfound2.png'

images = Image.open(image_default_value)
resized_image = images.resize((350, 330), Image.LANCZOS)
the_image = ImageTk.PhotoImage(resized_image)
image_displayer = ttk.Label(master=second_container, image=the_image)

filename = tk.StringVar(value="No File Chosen")

third_container = ttk.Frame(master=second_container)
input_text = ttk.Label(master=third_container, text="Image Input")
file_chooser = tk.Button(master=third_container, text="Insert an Image", command=lambda: open_file(), width=15, height=2)
file_path_text = ttk.Label(master=third_container, text="No File Chosen", textvariable=filename)

slider_container = ttk.Frame(master=third_container)
label_color = tk.Label(slider_container, text="Color", width=5)
slider = tk.Scale(slider_container, from_=0, to=1, orient="horizontal", length=50, sliderlength=10, showvalue=False)
label_texture = tk.Label(slider_container, text="Texture", width=5)

folderpath = ""
search_button = tk.Button(third_container, text="Search", width=18, height=2,command= lambda : search(slider))


slider.bind("<ButtonRelease-1>", lambda event: update_selection())
slider.set(0)
update_selection()

# Create a canvas for the line
canvas = tk.Canvas(main_container, width=1000, height= 20)
x1 = 1000

# Draw a horizontal line at the top of the window
canvas.create_line(0.1 * x1, 10, 0.9 * x1, 10, width=2)

# Data set
fourth_container = tk.Frame(main_container)

_progress = tk.StringVar(value="No Result")

Result_Text = tk.Label(fourth_container, text="Result: ", width=10)
Progression = tk.Label(fourth_container, text="No Result", textvariable=_progress)
fifth_container = tk.Frame(fourth_container) #image

sixth_container = tk.Frame(fourth_container) #button, sementara blm
canvas2 = tk.Canvas(fourth_container, width=1000,height=20)
x1 = 1000

# Draw a horizontal line at the top of the window
canvas2.create_line(0.1 * x1, 10, 0.9 * x1, 10, width=2)
upload_button = tk.Button(fourth_container, text="Upload Dataset",width=20, height=2,command=lambda: upload_dataset())

Result_Text.grid(row=0, column= 0)
Progression.grid(row = 0, column= 1)
fifth_container.grid(row = 1, column = 0)
sixth_container.grid(row = 2, column = 0)

# PACKERS
image_displayer.grid(row=0, column=0, sticky='w', padx=(0, 40))

label_color.grid(row=0, column=0)
slider.grid(row=0, column=1)
label_texture.grid(row=0, column=2)

input_text.grid(row=0, column=0, sticky='w', pady=(0, 10))
file_chooser.grid(row=1, column=0, sticky='w')
file_path_text.grid(row=2, column=0, sticky='w')
slider_container.grid(row=3, column=0, pady=(60, 0))
search_button.grid(row=4, column=0, sticky='w')

third_container.grid(row=0, column=1, padx=10, sticky='ne', pady=(30, 0))
second_container.grid(row=0, column=0, pady=(20, 0))
canvas.grid(row=1, column=0, pady=(40,0))
fourth_container.grid(row = 2, column = 0,sticky='n')
canvas2.grid(row = 3, column= 0)
upload_button.grid(row= 4, column = 0)
main_container.pack()

window.mainloop()