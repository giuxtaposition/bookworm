import React, { useContext, useState, useMemo } from "react";
import { LibraryContext } from "../context";
import "../styles/Library.css";
import Book from "./Book";
import moment from "moment";

const Library = () => {
  //STATES
  const [libraryBookOpen, setLibraryBookOpen] = useState("");

  //CONTEXT
  const { books, sortByFilter } = useContext(LibraryContext);

  const sortedBooks = useMemo(() => {
    console.log("Filter ", sortByFilter);
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

  return (
    <div className="Library">
      {sortedBooks.map((book, key) => (
        <Book
          title={book.title}
          author={book.author}
          cover={book.cover}
          pages={book.pages}
          published={book.published}
          pagesRead={book.pagesRead}
          read={book.read}
          key={key}
          id={book.id}
          libraryBookOpen={libraryBookOpen}
          setLibraryBookOpen={setLibraryBookOpen}
        />
      ))}
      {console.log("sortedBooks ", sortedBooks)}
    </div>
  );
};

export default Library;
