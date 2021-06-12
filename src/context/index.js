import React, { createContext, useState, useEffect } from "react";

const LibraryContext = createContext();

function LibraryContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [sortByFilter, setSortByFilter] = useState({
    sort: "insertion",
    order: "asc",
  });

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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export { LibraryContextProvider, LibraryContext };
