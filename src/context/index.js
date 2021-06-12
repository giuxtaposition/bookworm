import React, { createContext, useState, useEffect } from "react";

const LibraryContext = createContext();

function LibraryContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [sortByFilter, setSortByFilter] = useState({
    sort: "insertion",
    order: "asc",
  });

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (localStorage.getItem("books")) {
      setBooks(JSON.parse(localStorage.getItem("books")));
    }
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        books,
        setBooks,
        sortByFilter,
        setSortByFilter,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export { LibraryContextProvider, LibraryContext };
