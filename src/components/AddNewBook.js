import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "../styles/AddNewBook.css";

const AddNewBook = () => {
  return (
    <div className="AddNewBook">
      <div className="container">
        <AiOutlinePlus />
      </div>

      <div className="label-container">
        <div className="label-text">Add New Book</div>
      </div>
    </div>
  );
};

export default AddNewBook;
