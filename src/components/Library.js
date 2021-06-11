import React, { useState } from "react";
import "../styles/Library.css";
import Book from "./Book";

const Library = () => {
  const [libraryBookOpen, setLibraryBookOpen] = useState("");

  const books = [
    {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      cover: "https://m.media-amazon.com/images/I/51KGc0Yxl1L._SL500_.jpg",
      pages: "342",
      published: "June 21, 2003",
      pagesRead: "225",
      read: false,
      id: 1,
    },
    {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      cover: "https://m.media-amazon.com/images/I/51KGc0Yxl1L._SL500_.jpg",
      pages: "342",
      published: "June 21, 2003",
      pagesRead: "225",
      read: false,
      id: 2,
    },
    {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      cover: "https://m.media-amazon.com/images/I/51KGc0Yxl1L._SL500_.jpg",
      pages: "342",
      published: "June 21, 2003",
      pagesRead: "225",
      read: false,
      id: 3,
    },
  ];
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
