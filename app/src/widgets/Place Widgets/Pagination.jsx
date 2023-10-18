import React from 'react';

const PaginationButtons = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'pagination_active' : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default PaginationButtons;