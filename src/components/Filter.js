import React, { useState } from "react";
import "../styles/Filter.css";
import { ImSortNumericAsc, ImSortNumbericDesc, ImSearch } from "react-icons/im";

const Filter = () => {
  const [ascDescOrder, setAscDescOrder] = useState("asc");

  const toggleAscDescOrder = () => {
    if (ascDescOrder === "asc") {
      setAscDescOrder("desc");
    } else {
      setAscDescOrder("asc");
    }
  };

  return (
    <div className="Filter">
      <div className="order-by-filter">
        <label htmlFor="order-by">Order by:</label>
        <select id="order-by" name="order-by">
          <option value="publishing">Publishing Date</option>
          <option value="insertion">Insertion Date</option>
        </select>

        <div className="asc-desc" onClick={() => toggleAscDescOrder()}>
          {ascDescOrder === "asc" ? (
            <ImSortNumericAsc />
          ) : (
            <ImSortNumbericDesc />
          )}
        </div>
      </div>

      <div className="search-filter">
        <input type="search" placeholder="Search.." />
        <ImSearch />
      </div>
    </div>
  );
};

export default Filter;
