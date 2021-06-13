import React, { useContext, useState } from "react";
import { ImSearch } from "react-icons/im";
import Book from "./Book";

import "../styles/AutomaticBookForm.css";
import { LibraryContext } from "../context";

const AutomaticBookForm = () => {
  const { books } = useContext(LibraryContext);
  const [search, SetSearch] = useState("");
  const [searchBookOpen, setSearchBookOpen] = useState("");

  const handleSearchChange = (e) => {};

  return (
    <div className="AutomaticBookForm">
      <div className="search">
        <input
          type="search"
          placeholder="Search.."
          value={search}
          onChange={(e) => handleSearchChange(e)}
        />
        <ImSearch />
      </div>
      <div className="filter">
        <div>
          <input id="option-all" name="radio" value="all" type="radio" />
          <label for="option-all">
            <span />
            All
          </label>
        </div>
        <div>
          <input id="option-title" name="radio" value="title" type="radio" />
          <label for="option-title">
            <span />
            Title
          </label>
        </div>
        <div>
          <input id="option-author" name="radio" value="author" type="radio" />
          <label for="option-author">
            <span />
            Author
          </label>
        </div>
        <div>
          <input id="option-ISBN" name="radio" value="ISBN" type="radio" />
          <label for="option-ISBN">
            <span />
            ISBN
          </label>
        </div>
      </div>
      <div className="results">
        {books.map((book) => (
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
            libraryBookOpen={searchBookOpen}
            setLibraryBookOpen={setSearchBookOpen}
            addButton={true}
            deleteButton={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomaticBookForm;
