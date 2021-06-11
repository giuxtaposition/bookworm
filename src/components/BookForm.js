import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BiX } from "react-icons/bi";
import "../styles/BookForm.css";

const BookForm = ({
  setShowModal,
  handleSubmit,
  heading,
  title,
  setTitle,
  author,
  setAuthor,
  pages,
  setPages,
  published,
  setPublished,
  read,
  setRead,
  readPages,
  setReadPages,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit} className="BookForm">
        <div className="heading">{heading}</div>
        <div className="book-title form-field">
          <div className="title">Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            autoFocus
          />
        </div>
        <div className="book-author form-field">
          <div className="title">Author</div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            autoFocus
          />
        </div>
        <div className="book-published form-field">
          <div className="title">Publishing Date</div>
          <DatePicker
            value={published}
            onChange={(published) => setPublished(published)}
          />
        </div>
        <div className="book-pages form-field">
          <div className="title">Read/Total Pages</div>
          <input
            type="number"
            value={readPages}
            onChange={(e) => setReadPages(e.target.value)}
            placeholder=""
            autoFocus
          />
          /
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder=""
            autoFocus
          />
        </div>
        <div className="book-read form-field">
          <div className="title">Read Status</div>
          <div className="read-switch">
            <input
              type="checkbox"
              className="read-switch-checkbox"
              name="readSwitch"
              id="readSwitch"
              checked={read}
              onChange={(e) => setRead(e.target.checked)}
            />
            <label className="read-switch-label" htmlFor="readSwitch">
              <span className="read-switch-inner"></span>
              <span className="read-switch-switch"></span>
            </label>
          </div>
        </div>
        <div className="submit" onClick={() => handleSubmit}>
          <button>Add</button>
        </div>
        <button className="close-modal" onClick={() => setShowModal(false)}>
          <BiX />
        </button>
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default BookForm;
