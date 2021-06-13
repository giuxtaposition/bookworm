import React, { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../context";
import "../styles/Stats.css";

const Stats = () => {
  //CONTEXT
  const { books } = useContext(LibraryContext);

  //STATES
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalRead, setTotalRead] = useState(0);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    // Total Count
    setTotalBooks(books.length);

    // Total Read
    let readCount = 0;
    books.forEach((book) => {
      if (book.read === true) {
        readCount++;
      }
    });
    setTotalRead(readCount);

    // Total Unread
    setTotalUnread(books.length - readCount);
  }, [books]);

  return (
    <div className="Stats">
      <div className="title">My Stats</div>
      <div className="books-number">Total Books: {totalBooks}</div>
      <div className="read-number">Read: {totalRead}</div>
      <div className="unread-number">Not Read: {totalUnread}</div>
    </div>
  );
};

export default Stats;
