import React, { useContext, useState } from "react";
import "../styles/Filter.css";
import { ImSortNumericAsc, ImSortNumbericDesc, ImSearch } from "react-icons/im";
import { LibraryContext } from "../context";

const Filter = () => {
  //CONTEXT
  const { sortByFilter, setSortByFilter } = useContext(LibraryContext);

  //STATES
  const [ascDescOrder, setAscDescOrder] = useState(sortByFilter.order);
  const [sortFilter, setSortFilter] = useState(sortByFilter.sort);

  const toggleAscDescOrder = () => {
    if (ascDescOrder === "asc") {
      setAscDescOrder("desc");
      setSortByFilter({ ...sortByFilter, order: "desc" });
    } else {
      setAscDescOrder("asc");
      setSortByFilter({ ...sortByFilter, order: "asc" });
    }
  };

  const handleOrderChange = (e) => {
    setSortFilter(e.target.value);
    if (e.target.value === "publishing") {
      setSortByFilter({ ...sortByFilter, sort: "publishing" });
    } else {
      setSortByFilter({ ...sortByFilter, sort: "insertion" });
    }
  };

  return (
    <div className="Filter">
      <div className="order-by-filter">
        <label htmlFor="order-by">Order by:</label>
        <select
          id="order-by"
          name="order-by"
          value={sortFilter}
          onChange={(e) => handleOrderChange(e)}
        >
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
