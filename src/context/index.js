import React, { createContext, useState, useEffect } from "react";

const LibraryContext = createContext();

function LibraryContextProvider({ children }) {
  const [books, setBooks] = useState([]);

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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export { LibraryContextProvider, LibraryContext };
