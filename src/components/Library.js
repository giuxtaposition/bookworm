import React, { useContext, useState, useMemo } from "react";
import { LibraryContext } from "../context";
import "../styles/Library.css";
import Book from "./Book";
import moment from "moment";

const Library = () => {
  //STATES
  const [libraryBookOpen, setLibraryBookOpen] = useState("");

  //CONTEXT
  const { books, sortByFilter, searchFilter } = useContext(LibraryContext);

  //Sort Books
  const sortedBooks = useMemo(() => {
    if (sortByFilter.sort === "insertion") {
      if (sortByFilter.order === "asc") {
        return books.sort((a, b) =>
          moment(a.insertion, "DD/MM/YYYY-HH:mm:ss").isBefore(
            moment(b.insertion, "DD/MM/YYYY-HH:mm:ss")
          )
            ? -1
            : 1
        );
      } else {
        return books.sort((a, b) =>
          moment(a.insertion, "DD/MM/YYYY-HH:mm:ss").isBefore(
            moment(b.insertion, "DD/MM/YYYY-HH:mm:ss")
          )
            ? 1
            : -1
        );
      }
    } else if (sortByFilter.sort === "publishing") {
      if (sortByFilter.order === "asc") {
        return books.sort((a, b) =>
          moment(a.published, "DD/MM/YYYY").isBefore(
            moment(b.published, "DD/MM/YYYY")
          )
            ? -1
            : 1
        );
      } else {
        return books.sort((a, b) =>
          moment(a.published, "DD/MM/YYYY").isBefore(
            moment(b.published, "DD/MM/YYYY")
          )
            ? 1
            : -1
        );
      }
    }
  }, [books, sortByFilter]);

  //Search Books
  const searchedBooks = useMemo(() => {
    if (searchFilter === "") {
      return sortedBooks;
    } else {
      return sortedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchFilter.toLowerCase()) |
          book.author.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
  }, [sortedBooks, searchFilter]);

  return (
    <div className="Library">
      {searchedBooks.map((book) => (
        <Book
          title={book.title}
          author={book.author}
          cover={book.cover}
          pages={book.pages}
          published={book.published}
          pagesRead={book.pagesRead}
          read={book.read}
          key={book.id}
          id={book.id}
          libraryBookOpen={libraryBookOpen}
          setLibraryBookOpen={setLibraryBookOpen}
        />
      ))}
    </div>
  );
};

export default Library;
