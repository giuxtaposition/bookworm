import React, { useContext, useState } from "react";
import "../styles/Filter.css";
import { ImSortNumericAsc, ImSortNumbericDesc, ImSearch } from "react-icons/im";
import { LibraryContext } from "../context";

const Filter = () => {
  //CONTEXT
  const { sortByFilter, setSortByFilter, searchFilter, setSearchFilter } =
    useContext(LibraryContext);

  //STATES
  const [ascDescOrder, setAscDescOrder] = useState(sortByFilter.order);
  const [sortFilter, setSortFilter] = useState(sortByFilter.sort);

  const handleAscDescOrderChange = () => {
    if (ascDescOrder === "asc") {
      setAscDescOrder("desc");
      setSortByFilter({ ...sortByFilter, order: "desc" });
    } else {
      setAscDescOrder("asc");
      setSortByFilter({ ...sortByFilter, order: "asc" });
    }
  };

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
    if (e.target.value === "publishing") {
      setSortByFilter({ ...sortByFilter, sort: "publishing" });
    } else {
      setSortByFilter({ ...sortByFilter, sort: "insertion" });
    }
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <div className="Filter">
      <div className="order-by-filter">
        <label htmlFor="order-by">Order by:</label>
        <select
          id="order-by"
          name="order-by"
          value={sortFilter}
          onChange={(e) => handleSortChange(e)}
        >
          <option value="publishing">Publishing Date</option>
          <option value="insertion">Insertion Date</option>
        </select>

        <div className="asc-desc" onClick={() => handleAscDescOrderChange()}>
          {ascDescOrder === "asc" ? (
            <ImSortNumericAsc />
          ) : (
            <ImSortNumbericDesc />
          )}
        </div>
      </div>

      <div className="search-filter">
        <input
          type="search"
          placeholder="Search.."
          value={searchFilter}
          onChange={(e) => handleSearchChange(e)}
        />
        <ImSearch />
      </div>
    </div>
  );
};

export default Filter;
