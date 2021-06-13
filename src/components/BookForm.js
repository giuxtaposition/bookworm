import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BiX } from "react-icons/bi";
import "../styles/BookForm.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AutomaticBookForm from "./AutomaticBookForm";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

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
  cover,
  setCover,
  errors,
}) => {
  const [tab, setTab] = useState("manually");

  useEffect(() => {
    if (read) {
      setReadPages(pages);
    }
  }, [read, pages, setReadPages]);

  return (
    <div className="BookForm">
      <div className="heading">{heading}</div>

      <div className="tab-header">
        <div
          className={`tab ${tab === "manually" ? "active" : ""}`}
          onClick={() => setTab("manually")}
        >
          Manually
        </div>
        <div
          className={`tab ${tab === "automatic" ? "active" : ""}`}
          onClick={() => setTab("automatic")}
        >
          Google Books API
        </div>
      </div>
      {tab === "manually" && (
        <>
          <ThemeProvider theme={darkTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form onSubmit={handleSubmit}>
                <div className="book-title form-field">
                  <div className="title">Title*</div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    autoFocus
                  />
                  {errors.title.length > 0 && (
                    <div className="form-error">{errors.title}</div>
                  )}
                </div>
                <div className="book-author form-field">
                  <div className="title">Author*</div>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    autoFocus
                  />
                  {errors.author.length > 0 && (
                    <div className="form-error">{errors.author}</div>
                  )}
                </div>
                <div className="book-published form-field">
                  <div className="title">Publishing Date*</div>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={published}
                    onChange={(published) => setPublished(published)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  {errors.published.length > 0 && (
                    <div className="form-error">{errors.published}</div>
                  )}
                </div>
                <div className="book-cover form-field">
                  <div className="title">Book Cover (optional)</div>
                  <input
                    type="text"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    placeholder="Cover"
                    autoFocus
                  />
                </div>
                <div className="book-pages form-field">
                  <div className="title">Read/Total* Pages</div>
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
                  {errors.pages.length > 0 && (
                    <div className="form-error">{errors.pages}</div>
                  )}
                  {errors.readPages.length > 0 && (
                    <div className="form-error">{errors.readPages}</div>
                  )}
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
                <div className="submit add-button" onClick={() => handleSubmit}>
                  <button>Add</button>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setShowModal(false)}
                >
                  <BiX />
                </button>
              </form>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </>
      )}

      {tab === "automatic" && (
        <>
          <AutomaticBookForm />
        </>
      )}
    </div>
  );
};

export default BookForm;
