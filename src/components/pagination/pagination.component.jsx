import React from "react";

import "./pagination.styles.scss";

const Pagination = ({ productsPerPage, noOfproducts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(noOfproducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.length > 1
        ? pageNumbers.map((number) => (
            <li className="page-number" key={number}>
              <button
                className="page-link"
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))
        : null}
    </ul>
  );
};

export default Pagination;
