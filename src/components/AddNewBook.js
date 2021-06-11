import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "../styles/AddNewBook.css";
import BookForm from "./BookForm";
import Modal from "./Modal";

const AddNewBook = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [published, setPublished] = useState(new Date());
  const [read, setRead] = useState(false);
  const [readPages, setReadPages] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

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
        />
      </Modal>
    </div>
  );
};

export default AddNewBook;
