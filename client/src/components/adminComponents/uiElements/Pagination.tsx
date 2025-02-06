import React from "react";

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`join-item btn ${
            currentPage === index + 1 ? "active btn-active" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
