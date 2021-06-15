import React, { createContext, useState, useEffect } from 'react'

const LibraryContext = createContext()

function LibraryContextProvider({ children }) {
  const [books, setBooks] = useState([])

  const [searchFilter, setSearchFilter] = useState('')
  const [searchFilterType, setSearchFilterType] = useState('all')

  useEffect(() => {
    if (localStorage.getItem('books')) {
      try {
        setBooks(JSON.parse(localStorage.getItem('books')))
      } catch (error) {
        console.log('localStorage books data corrupted, scrubbing data')
        localStorage.removeItem('books')
      }
    }
  }, [])

  return (
    <LibraryContext.Provider
      value={{
        books,
        setBooks,
        searchFilter,
        setSearchFilter,
        searchFilterType,
        setSearchFilterType,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export { LibraryContextProvider, LibraryContext }
