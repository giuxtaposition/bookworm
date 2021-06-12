import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BiX } from "react-icons/bi";
import "../styles/BookForm.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const foreground = "#f8f8f2";
const background = "#2a2e37";
const lighterBackground = "#44475a";
const green = "#228174";

const draculaTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: green,
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: background,
      },
      toolbarBtnSelected: {
        color: "#494c62",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: background,
        color: foreground,
      },
      iconButton: {
        backgroundColor: lighterBackground,
        color: foreground,
      },
      dayLabel: {
        color: foreground,
      },
    },
    MuiPickersDay: {
      current: {
        "& .MuiIconButton-label": {
          color: foreground,
        },
        backgroundColor: lighterBackground,
        "&:hover": {
          filter: "brightness(60%)",
          backgroundColor: green,
          "& .MuiIconButton-label": {
            color: background,
          },
        },
      },
      daySelected: {
        backgroundColor: green,
        "& .MuiIconButton-label": {
          color: background,
        },
        "&:hover": {
          filter: "brightness(60%)",
          backgroundColor: green,
        },
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        backgroundColor: background,
      },
    },
    MuiDialogActions: {
      root: {
        MuiButton: {
          label: {
            color: foreground,
          },
        },
      },
    },
    MuiInputBase: {
      input: {
        color: foreground,
      },
    },
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
  return (
    <ThemeProvider theme={draculaTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form onSubmit={handleSubmit} className="BookForm">
          <div className="heading">{heading}</div>
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
            <DatePicker
              value={published}
              onChange={(published) => setPublished(published)}
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
    </ThemeProvider>
  );
};

export default BookForm;
