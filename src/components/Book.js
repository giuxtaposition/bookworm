import React, { useState, useEffect } from "react";
import "../styles/Book.css";
import { ImCross } from "react-icons/im";

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
  const [open, setOpen] = useState(false);
  const [readState, setReadState] = useState(read);

  const handleOpenClick = () => {
    if (open) {
      setLibraryBookOpen("");
      setOpen(false);
    } else {
      setLibraryBookOpen(id);
      setOpen(true);
    }
  };

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
        <button className="delete">
          <ImCross />
        </button>
      </div>
    </div>
  );
};

export default Book;
