import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { BeatLoader } from 'react-spinners';
const Pagination = ({ data, loading, setLoading, time }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const currentImages = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const threeNumberRoundUp = (num, amount) => {
    const str = num.toString();
    const decimalIdx = str.indexOf('.');
    return Number(str.slice(0, decimalIdx + amount + 1));
  };

  const renderImages = currentImages.map((data, index) => (
    <div key={index} className=" h-auto w-auto mb-8 p-4 bg-gradient-to-l from-gray-800 to-black rounded-lg shadow-lg  transform hover:scale-105 transition-transform duration-300">
      <img
        src={data.imageUrl}
        alt={`Image ${index}`}
        className="rounded-lg"
      />
      <div className="p-4">
        <p className="text-white font-[Poppins-SemiBold] text-2xl">
          Similarity: {threeNumberRoundUp(Number(data.similarities), 3)}%
        </p>
      </div>
    </div>
  ));

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data, setLoading]);

  return (
    <div className="py-10 text-center">
     
      {loading ? (
        <div className="py-24">
          <BeatLoader color="rgba(128, 128, 128, 0.8)" loading={loading} css={{}} />
        </div>
      ) : (
        
        <div className="container mx-auto">
          
          {data.length > 0 && (
            <>
              <div className=' justify-end items-end'>
                <h2 className='text-4xl py-4 bg-gray-950 text-white font-[Poppins-SemiBold]'>RESULT</h2>
                <p className="text-start pb-5 pt-10 text-black font-medium">
                  Result: {data.length} <span className="text-md ">images</span>
                  <br />Time Taken: {Number(time).toFixed(3)}
                </p>
                
              </div>
              <div className="grid grid-cols-3 gap-10 ">{renderImages}</div>

              <ReactPaginate
              
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination flex justify-center mt-4'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageClassName={'mx-2 text-black font-mono text-[20px]'} // Set text color to white
                previousClassName={'mx-2 px-4 py-2 border rounded bg-white text-black shadow-md hover:bg-gradient-to-l from-gray-800 to-black hover:text-white transition-all duration-300'}
                nextClassName={'mx-2 px-4 py-2 border rounded bg-white text-black shadow-md hover:bg-gradient-to-l from-gray-800 to-black hover:text-white transition-all duration-300'}
                pageLinkClassName={'cursor-pointer'}
                previousLinkClassName={'cursor-pointer'}
                nextLinkClassName={'cursor-pointer'}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
