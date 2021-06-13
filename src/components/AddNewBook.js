import React, { useContext, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { LibraryContext } from "../context";
import "../styles/AddNewBook.css";
import BookForm from "./BookForm";
import Modal from "./Modal";
import moment from "moment";
import defaultCover from "../images/default-cover.jpg";
import { v4 as uuidv4 } from "uuid";
import useWindowSize from "../utils/useWindowSize";
import Stats from "./Stats";

const AddNewBook = () => {
  //STATES
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [published, setPublished] = useState(undefined);
  const [read, setRead] = useState(false);
  const [readPages, setReadPages] = useState(0);
  const [cover, setCover] = useState("");
  const { books, setBooks } = useContext(LibraryContext);
  const [addNewBook, setAddNewBook] = useState(undefined);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const { width } = useWindowSize();

  //ERRORS
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    pages: "",
    readPages: "",
    published: "",
  });

  const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
      (value) => value.length > 0 && (count = count + 1)
    );
    return count;
  };

  const formValidation = () => {
    errors.title = title.length < 1 ? "Please  add a Title" : "";

    errors.author = author.length < 1 ? "Please  add a Author" : "";

    errors.pages =
      pages < 1 ? "Please  add total number of pages in the book" : "";

    errors.readPages =
      readPages > pages
        ? "Read pages cannot be more than total number of pages"
        : "";

    errors.published = !moment.isDate(published)
      ? "Please  set a publishing date"
      : "";

    setErrors({
      title: errors.title,
      author: errors.author,
      pages: errors.pages,
      readPages: errors.readPages,
      published: errors.published,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation();

    if (countErrors(errors) === 0) {
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
          insertion: moment(new Date()).format("DD/MM/YYYY-HH:mm:ss"),
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
          insertion: moment(new Date()).format("DD/MM/YYYY-HH:mm:ss"),
        };
      }

      setBooks((books) => [...books, book]);
      setAddNewBook(book);

      setTitle("");
      setAuthor("");
      setPages(0);
      setPublished(undefined);
      setRead(false);
      setReadPages(0);
      setCover("");
    }
  };

  useEffect(() => {
    if (addNewBook) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [addNewBook, books]);

  return (
    <div className="AddNewBook">
      {width > 800 && (
        <>
          <div className="container" onClick={() => setShowModal(true)}>
            <AiOutlinePlus />
          </div>
          <div className="label-container">
            <div className="label-text">Add New Book</div>
          </div>
        </>
      )}
      {width <= 800 && openMobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-menu-stats">
            <div className="container" onClick={() => setShowStats(true)}>
              <IoStatsChart />
            </div>
            <div className="label-container">
              <div className="label-text">Stats</div>
            </div>
          </div>

          <div className="mobile-menu-add">
            <div className="container" onClick={() => setShowModal(true)}>
              <AiOutlinePlus />
            </div>
            <div className="label-container">
              <div className="label-text">Add New Book</div>
            </div>
          </div>
        </div>
      )}
      {width <= 800 && (
        <>
          <div
            className="container"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <AiOutlineMenu />
          </div>
          <div className="label-container">
            <div className="label-text">Menu</div>
          </div>
        </>
      )}

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
          errors={errors}
          formValidation={formValidation}
          countErrors={countErrors}
        />
      </Modal>
      <Modal showModal={showStats} setShowModal={setShowStats}>
        <Stats />
      </Modal>
    </div>
  );
};

export default AddNewBook;
