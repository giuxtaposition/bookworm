import React, { useContext, useState } from "react";
import { ImSearch } from "react-icons/im";
import Book from "./Book";

import "../styles/AutomaticBookForm.css";
import { LibraryContext } from "../context";
import axios from "axios";

const AutomaticBookForm = () => {
  const { books } = useContext(LibraryContext);
  const [search, SetSearch] = useState("");
  const [searchBookOpen, setSearchBookOpen] = useState("");
  const [apiKey, setApiKey] = useState(
    "AIzaSyDi5VwAtZHab0ufcOB8xeHWESepbyjdvbs"
  );
  const [results, setResults] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState("all");

  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setCheckedFilter(e.target.value);
  };

  const submitSearch = () => {
    let filter = "";

    if (checkedFilter === "title") {
      filter = "+intitle:";
    } else if (checkedFilter === "author") {
      filter = "+inauthor:";
    } else if (checkedFilter === "ISBN") {
      filter = "+isbn:";
    }

    let url =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      filter +
      search +
      "&key=" +
      apiKey +
      "&maxResults=5";

    axios.get(url).then((data) => {
      const books = data.data.items.map((book) => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          cover:
            book.volumeInfo.imageLinks === undefined
              ? ""
              : book.volumeInfo.imageLinks.thumbnail,
          pages: book.volumeInfo.pageCount,
          published: book.volumeInfo.publishedDate,
          pagesRead: 0,
          read: false,
        };
      });
      setResults(books);
    });
  };

  return (
    <div className="AutomaticBookForm">
      <div className="search">
        <input
          type="search"
          placeholder="Search.."
          value={search}
          onChange={(e) => handleSearchChange(e)}
        />
        <ImSearch onClick={() => submitSearch()} />
      </div>
      <div className="filter">
        <div>
          <input
            id="option-all"
            name="radio"
            value="all"
            type="radio"
            onChange={(e) => handleFilterChange(e)}
            checked={checkedFilter === "all"}
          />
          <label htmlFor="option-all">
            <span />
            All
          </label>
        </div>
        <div>
          <input
            id="option-title"
            name="radio"
            value="title"
            type="radio"
            onChange={(e) => handleFilterChange(e)}
            checked={checkedFilter === "title"}
          />
          <label htmlFor="option-title">
            <span />
            Title
          </label>
        </div>
        <div>
          <input
            id="option-author"
            name="radio"
            value="author"
            type="radio"
            onChange={(e) => handleFilterChange(e)}
            checked={checkedFilter === "author"}
          />
          <label htmlFor="option-author">
            <span />
            Author
          </label>
        </div>
        <div>
          <input
            id="option-ISBN"
            name="radio"
            value="ISBN"
            type="radio"
            onChange={(e) => handleFilterChange(e)}
            checked={checkedFilter === "ISBN"}
          />
          <label htmlFor="option-ISBN">
            <span />
            ISBN
          </label>
        </div>
      </div>
      <div className="results">
        {results.map((book) => (
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
            inLibrary={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomaticBookForm;
