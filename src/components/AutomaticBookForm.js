import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { BsXCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import Book from "./Book";

import "../styles/AutomaticBookForm.css";
import axios from "axios";
import { useSpring, animated } from "react-spring";

const AutomaticBookForm = () => {
  //STATES
  const [search, SetSearch] = useState("");
  const [searchBookOpen, setSearchBookOpen] = useState("");
  const apiKey = "AIzaSyDi5VwAtZHab0ufcOB8xeHWESepbyjdvbs";
  const [results, setResults] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState("all");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  //ANIMATIONS
  const successAlertAnimation = useSpring({
    transform: showSuccessAlert ? "translateY(0)" : "translateY(20)",
    opacity: showSuccessAlert ? 1 : 0,
    config: { duration: 500 },
  });

  //FUNCTIONS
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  return (
    <div className="AutomaticBookForm">
      <div className="search">
        <input
          type="search"
          placeholder="Search.."
          value={search}
          onChange={(e) => handleSearchChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
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
      {showSuccessAlert && (
        <animated.div className="alert-success" style={successAlertAnimation}>
          <div className="alert-icon">
            <AiFillCheckCircle />
          </div>
          <div className="alert-content">Book Added Successfully!</div>
          <div className="alert-close">
            <BsXCircle onClick={() => setShowSuccessAlert(false)} />
          </div>
        </animated.div>
      )}
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
            searchResultsBooks={results}
            setSearchResultsBooks={setResults}
            setShowSuccessAlert={setShowSuccessAlert}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomaticBookForm;
