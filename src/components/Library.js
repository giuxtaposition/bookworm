import React, { useContext, useState } from "react";
import { LibraryContext } from "../context";
import "../styles/Library.css";
import Book from "./Book";

const Library = () => {
  const [libraryBookOpen, setLibraryBookOpen] = useState("");
  const { books } = useContext(LibraryContext);

  return (
    <div className="Library">
      {books.map((book, key) => (
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
    </div>
  );
};

export default Library;
