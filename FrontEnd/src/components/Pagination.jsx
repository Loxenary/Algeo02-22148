import React, { useEffect, useState } from 'react';
import PaginationButton from "./PaginationButton";
import DataResult from './DataResult';
import ReactPaginate from 'react-paginate';
import {BeatLoader} from 'react-spinners';

const Pagination = ({ data, loading, setLoading, time}) => {
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
    }
  
    const renderImages = currentImages.map((data, index) => (
      <div key={index}>
        <img src={data.imageUrl} alt={`Image ${index}`} />
        <p>Similarity : {threeNumberRoundUp(Number(data.similarities), 3)}%</p>
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
      <div className='bg-white py-10 text-center'>
        {loading ? (
                  <div className=' py-24'>
                  {console.log('Loading is true')}
                  <BeatLoader color='rgba(128, 128, 128, 0.8)' loading={loading} css={{}} />
                  {/* This sets the color to a semi-transparent gray (rgba(128, 128, 128, 0.8)) */}
        
        
                </div>
        ) : (
          <div className="container mx-auto">
            
            {data.length > 0 && (
              <>
              <p className='text-end pb-5'>Result : {data.length} <span className='text-md'>images</span>
              <br></br>Time Taken: {Number(time).toFixed(3)}</p>
                <div className="grid grid-cols-3 gap-4">{renderImages}</div>
  
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination flex justify-center mt-4'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  pageClassName={'mx-2'}
                  previousClassName={'mx-2 px-2 py-1 border rounded'}
                  nextClassName={'mx-2 px-2 py-1 border rounded'}
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









// import React from "react";

// const Pagination = ({
//   totalPosts,
//   postsPerPage,
//   setCurrentPage,
//   currentPage,
// }) => {
//   let pages = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pages.push(i);
//   }

//   return (
//     <div className='flex flex-wrap justify-center mt-4'>
//       {pages.map((page, index) => (
//         <button
//           key={index}
//           onClick={() => setCurrentPage(page)}
//           className={`w-10 h-10 font-medium text-base mx-2 border border-eee rounded cursor-pointer transition-all duration-300 ${
//             page === currentPage ? 'font-extrabold border-101010 bg-ffe400 text-101010' : 'text-eee border-eee bg-transparent'
//           }`}
//         >
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;