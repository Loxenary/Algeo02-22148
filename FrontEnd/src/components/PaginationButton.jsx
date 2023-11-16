import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

const PaginationButton = ({setCurrentPage, currentPage, totalPages}) => {
    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    };
    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 2,
            },
        },
    };
    const showNextButton = currentPage !== totalPages - 1;
    const showPrevButton = currentPage !== 0;
    return (
        <motion.div 
            variants={paginationVariants} initial="hidden" animate="visible">
            <ReactPaginate
                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                    showNextButton ? (
                        <span className="w-10 h-10 flex items-center shadow-xl hover:bg-emerald-200 justify-center hover:text-black bg-[lightgray] rounded-md text-white">
                            <BsChevronRight />
                        </span>
                    ) : null
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel={
                    showPrevButton ? (
                        <span className="w-10 h-10 flex items-center shadow-xl hover:bg-emerald-200 justify-center hover:text-black bg-[lightgray] rounded-md mr-4 text-white">
                            <BsChevronLeft />
                        </span>
                    ) : null
                }
                containerClassName="flex items-center justify-center mt-8 mb-0"
                pageClassName="block bg-[lightgray] hover:bg-emerald-200 w-10 h-10 flex shadow-xl items-center text-white hover:text-black font-semibold justify-center rounded-md mr-4"
                activeClassName="text-[aquamarine]"
            />
        </motion.div> 
    )
}

export default PaginationButton