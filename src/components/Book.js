import React, { useState, useEffect, useContext } from "react";
import "../styles/Book.css";
import { ImCross } from "react-icons/im";
import { LibraryContext } from "../context";

const Book = ({
  title,
  author,
  cover,
  pages,
  published,
  pagesRead,
  read,
  libraryBookOpen,
  setLibraryBookOpen,
  id,
}) => {
  //STATES
  const [open, setOpen] = useState(false);
  const [readState, setReadState] = useState(read);
  const [bookToDelete, setBookToDelete] = useState(undefined);

  //CONTEXT
  const { books, setBooks } = useContext(LibraryContext);

  const handleOpenClick = () => {
    if (open) {
      setLibraryBookOpen("");
      setOpen(false);
    } else {
      setLibraryBookOpen(id);
      setOpen(true);
    }
  };

  const handleDelete = () => {
    const newBooks = books.filter((book) => book.id !== id);

    if (newBooks.length === 0) {
      setBooks([]);
      localStorage.removeItem("books");
    } else {
      setBooks(newBooks);
      setBookToDelete("delete");
    }
  };

  useEffect(() => {
    if (bookToDelete) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books, bookToDelete]);

  // Handle Opened Book (can only be one)
  useEffect(() => {
    if (libraryBookOpen !== id) {
      setOpen(false);
    }
  }, [libraryBookOpen, id]);

  return (
    <div
      className={`Book ${open ? "open" : ""}`}
      onClick={() => handleOpenClick()}
    >
      <img src={cover} alt="book-cover" className="cover" />
      <div className="details">
        <div className="title">{title}</div>
        <div className="author">{author}</div>
        {open && (
          <>
            <div className="number-pages">Number of pages: {pages}</div>
            <div className="published-date">Published: {published}</div>
            <div className="read-state">
              <div className="title">Read:</div>
              <div className="pages-read">
                {pagesRead}/{pages}
              </div>
              <div className="read-switch" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="read-switch-checkbox"
                  name={`readSwitch-${id}`}
                  id={`readSwitch-${id}`}
                  checked={readState}
                  onChange={(e) => setReadState(e.target.checked)}
                />
                <label
                  className="read-switch-label"
                  htmlFor={`readSwitch-${id}`}
                >
                  <span className="read-switch-inner"></span>
                  <span className="read-switch-switch"></span>
                </label>
              </div>
            </div>
          </>
        )}
        <button
          className="delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <ImCross />
        </button>
      </div>
    </div>
  );
};

export default Book;
