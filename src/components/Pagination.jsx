import React from 'react';
import PaginationButton from "./PaginationButton";
import UseDataFetcher from './UseDataFetcher';
import DataResult from './DataResult';

const Pagination = () => {
    const {loading, pages, totalPages, currentPage, setCurrentPage} = UseDataFetcher();
    return (
    <div className='bg-white py-10'>
        {loading ? (
            <div className='text-center text-5xl'>Loading...</div>
        ) : (
            <>
                <div className='grid grid-cols-3 gap-10'>
                    {pages.map((page) => {
                        return <DataResult key={page.id} {...page} />;
                    })}
                </div>
                <PaginationButton
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </>
        )}
        
    </div>
    )
}

export default Pagination











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