import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LibraryContext } from "../context";
import "../styles/AddNewBook.css";
import BookForm from "./BookForm";
import Modal from "./Modal";
import moment from "moment";
import defaultCover from "../images/default-cover.jpg";
import { v4 as uuidv4 } from "uuid";

const AddNewBook = () => {
  //STATES
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [published, setPublished] = useState(new Date());
  const [read, setRead] = useState(false);
  const [readPages, setReadPages] = useState(0);
  const [cover, setCover] = useState("");
  const { books, setBooks } = useContext(LibraryContext);
  const [addNewBook, setAddNewBook] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    var book = [];
    if (cover !== "") {
      book = {
        title: title,
        author: author,
        cover: cover,
        pages: pages,
        published: moment(published).format("DD/MM/YYYY"),
        pagesRead: readPages,
        read: read,
        id: uuidv4(),
      };
    } else {
      book = {
        title: title,
        author: author,
        cover: defaultCover,
        pages: pages,
        published: moment(published).format("DD/MM/YYYY"),
        pagesRead: readPages,
        read: read,
        id: uuidv4(),
      };
    }

    setBooks((books) => [...books, book]);
    setAddNewBook(book);

    setTitle("");
    setAuthor("");
    setPages(0);
    setPublished(new Date());
    setRead(false);
    setReadPages(0);
    setCover("");
  };

  useEffect(() => {
    if (addNewBook) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [addNewBook, books]);

  return (
    <div className="AddNewBook">
      <div className="container" onClick={() => setShowModal(true)}>
        <AiOutlinePlus />
      </div>

      <div className="label-container">
        <div className="label-text">Add New Book</div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <BookForm
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          heading="Add New Book"
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          pages={pages}
          setPages={setPages}
          published={published}
          setPublished={setPublished}
          read={read}
          setRead={setRead}
          readPages={readPages}
          setReadPages={setReadPages}
          cover={cover}
          setCover={setCover}
        />
      </Modal>
    </div>
  );
};

export default AddNewBook;
