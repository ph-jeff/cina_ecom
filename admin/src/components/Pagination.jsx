import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    function prevPage() {
        if (currentPage == 0) {
            return
        }
        setCurrentPage(currentPage - 1)
    }

    function nextPage() {
        if (currentPage == totalPages - 1) {
            return
        }
        setCurrentPage(currentPage + 1)
    }

    function changePage(index) {
        setCurrentPage(index);
    }

    // Calculate the range of page numbers to display (limited to 3 pages)
    const startPage = Math.max(0, currentPage - 1);
    const endPage = Math.min(totalPages - 1, startPage + 2);

    return (
        <>

            <nav className="mx-4 my-5">
                <ul className="list-style-none flex">
                    <li>
                        <button className={`relative block rounded bg-primary-100 px-3 py-1.5 text-sm transition-all duration-300`} onClick={prevPage} >
                            Prev
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => {
                        if (index >= startPage && index <= endPage) {
                            return (
                                <li
                                    key={index}
                                    className={`relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 ${currentPage === index ? 'bg-blue-200' : ''}`}
                                >
                                    <button onClick={() => changePage(index)}>{index + 1}</button>
                                </li>
                            );
                        }
                        return null; // Hide page numbers outside the range
                    })}
                    <li>
                        <button className={`relative block rounded bg-primary-100 px-3 py-1.5 text-sm transition-all duration-300`} onClick={nextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;