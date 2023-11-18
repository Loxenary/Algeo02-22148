import React from 'react'


const Information = () => {
  return (
    <div className='bg-emerald-100 max-w w-full py-20 px-16 text-justify h-scr mx-auto flex flex-col items-center' id='info'>
        <h1 className='text-black text-9xl font-[Poppins-Bold] p-10'>CBIR.</h1>
        <div className='font-[Poppins-Regular] text-lg'>
            <p className='py-5'>
                Our program implements an image retrieval system utilizing Vector Algebra. This approach is crucial in the realm of data processing and information retrieval.
                In this context, vector algebra is employed to represent and analyze data using a content-based classification approach, known as Content-Based Image Retrieval (CBIR).
            </p>
            <p className='py-5'>
            <span className='font-[Poppins-SemiBold]'>Content-Based Image Retrieval (CBIR)</span> is a process used to search for and retrieve images based on their content. The process begins with the extraction of important features from the images, such as color, texture, and shape.
                After extracting these features, they are represented in the form of vectors or numerical descriptions that can be compared with other images. Subsequently, CBIR employs matching algorithms to compare the feature vectors of the sought-after image with those of images in the dataset.
                The results of this matching are used to rank the images in the dataset and display the ones most similar to the queried image.
            </p>
            <p className='pt-5 pb-10'>
                CBIR facilitates efficient access and exploration of image collections for users, as it doesn't rely on text or keyword searches but rather on the similarity of visual content values among the images. There are two popular parameters in CBIR:
            </p>
            <div className='py-10 flex items-center text-center gap-12'>
                <div className='bg-white rounded-xl p-6'>
                    <h2 className='bg-yellow-200 w-12 h-12 rounded-full text-3xl font-bold mx-auto mt-[-45px] object-cover'>1</h2>
                    <h2 className='p-7 font-[Poppins-SemiBold]'>CBIR with color parameter</h2>
                    <p className='text-justify'>In this CBIR approach, the input image is compared with images in the dataset by converting RGB images into a more common color histogram method. A color histogram represents the frequency of different colors in a specific color space, allowing for the distribution of colors in the image to be analyzed.</p>
                </div>
                <div className='bg-white rounded-xl p-6'>
                    <h2 className='bg-yellow-200 w-12 h-12 rounded-full text-3xl font-bold mx-auto mt-[-45px] object-cover'>2</h2>
                    <h2 className='p-7 font-[Poppins-SemiBold]'>CBIR with texture parameter</h2>
                    <p className='text-justify'>CBIR with a texture comparison involves using a matrix known as a co-occurrence matrix. This matrix is chosen for its ease and speed of processing, producing smaller-sized vectors. For instance, considering an image I with n × m pixels and a parameter offset (Δx,Δy), the co-occurrence matrix is employed for texture analysis.</p>
                </div>
            </div>
            
        </div>





      
    </div>
  )
}

export default Information
