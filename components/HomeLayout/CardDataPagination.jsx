import React, { useState, useEffect } from "react";

const CardDataPagination = ({ cardDataPerPage, totalCardData, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when new data is loaded
  }, [cardDataPerPage, totalCardData]);

  for (let i = 1; i <= Math.ceil(totalCardData / cardDataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
            style={{marginRight: '5px', borderRadius: '0'}}
              onClick={() => {
                setCurrentPage(number);
                paginate(number);
              }}
              className={`page-link ${number === currentPage ? "active" : ""} `}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CardDataPagination;
