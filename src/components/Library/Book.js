import React, { useState, useEffect, useContext } from 'react'
import '../styles/Book.css'
import { LibraryContext } from '../../context'
import moment from 'moment'
import defaultCover from '../images/default-cover.jpg'
import {
  Tr,
  Td,
  Image,
  Center,
  NumberInput,
  NumberInputField,
  IconButton,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import { MdLibraryAdd } from 'react-icons/md'

const Book = ({
  title,
  author,
  cover,
  pages,
  published,
  insertion,
  pagesRead,
  read,
  id,
  inLibrary = true,
  searchResultsBooks = false,
  setSearchResultsBooks = false,
  setShowSuccessAlert = false,
}) => {
  //STATES
  const [readState, setReadState] = useState(read)
  const [readPages, setReadPages] = useState(pagesRead)
  const [bookToDelete, setBookToDelete] = useState(undefined)
  const [addNewBook, setAddNewBook] = useState(undefined)

  //CONTEXT
  const { books, setBooks } = useContext(LibraryContext)

  // Handle Book Deleted
  const handleDelete = () => {
    const newBooks = books.filter(book => book.id !== id)

    if (newBooks.length === 0) {
      setBooks([])
      localStorage.removeItem('books')
    } else {
      setBooks(newBooks)
      setBookToDelete('delete')
    }
  }

  useEffect(() => {
    if (bookToDelete === 'delete') {
      localStorage.setItem('books', JSON.stringify(books))
    }
  }, [books, bookToDelete])

  // Handle Changed Read State
  useEffect(() => {
    if (readState !== read && inLibrary) {
      books.find(book => book.id === id).read = readState
      if (readState === true) {
        setReadPages(pages)
      }
      localStorage.setItem('books', JSON.stringify(books))
    }
  }, [readState, read])

  // Handle Read Pages
  useEffect(() => {
    if (readPages !== pagesRead && inLibrary) {
      books.find(book => book.id === id).pagesRead = readPages
      if (readPages === pages) {
        setReadState(true)
      }
      localStorage.setItem('books', JSON.stringify(books))
    }
  }, [readPages, pagesRead])

  // Handle Book Added (From Google Book API)
  const handleAdd = () => {
    var book = {
      title: title,
      author: author,
      cover: cover !== '' ? cover : defaultCover,
      pages: pages,
      published: moment(published).format('DD/MM/YYYY'),
      pagesRead: readPages,
      read: readState,
      id: id,
      insertion: moment(new Date()).format('DD/MM/YYYY-HH:mm:ss'),
    }
    setBooks(books => [...books, book])
    setAddNewBook(book)

    // Remove Just Added Book from results
    const newBooks = searchResultsBooks.filter(book => book.id !== id)
    setSearchResultsBooks(newBooks)
    setShowSuccessAlert(true)

    setTimeout(function () {
      setShowSuccessAlert(false)
    }, 2500)
  }

  //Save new book to localStorage
  useEffect(() => {
    console.log('saving book')
    if (addNewBook) {
      localStorage.setItem('books', JSON.stringify(books))
    }
  }, [addNewBook, books])
  return (
    // <div
    //   className={`Book ${open ? "open" : ""}`}
    //   onClick={() => handleOpenClick()}
    // >
    //   <img src={cover} alt="book-cover" className="cover" />
    //   <div className="details">
    //     <div className="title">{title}</div>
    //     <div className="author text">{author}</div>

    //     {open && (
    //       <>
    //         <div className="number-pages text">Number of pages: {pages}</div>
    //         <div className="published-date text">Published: {published}</div>
    //         <div
    //           className="read-state text"
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           <div className="title">Read:</div>
    //           <div className="pages-read text">
    //             <input
    //               type="number"
    //               value={readPages}
    //               onChange={(e) => setRedPages(e.target.value)}
    //               placeholder=""
    //               autoFocus
    //             />
    //             /{pages}
    //           </div>
    //           <div className="read-switch">
    //             <input
    //               type="checkbox"
    //               className="read-switch-checkbox"
    //               name={`readSwitch-${id}`}
    //               id={`readSwitch-${id}`}
    //               checked={readState}
    //               onChange={(e) => setReadState(e.target.checked)}
    //             />
    //             <label
    //               className="read-switch-label"
    //               htmlFor={`readSwitch-${id}`}
    //             >
    //               <span className="read-switch-inner"></span>
    //               <span className="read-switch-switch"></span>
    //             </label>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //     {deleteButton && (
    //       <button
    //         className="delete button"
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handleDelete();
    //         }}
    //       >
    //         <ImCross />
    //       </button>
    //     )}
    //     {addButton && (
    //       <button
    //         className="add button"
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handleAdd();
    //         }}
    //       >
    //         <BiBookmarkPlus />
    //       </button>
    //     )}
    //   </div>
    // </div>
    <Tr>
      <Td>
        <Center>
          <Image
            boxSize='100px'
            objectFit='cover'
            src={cover}
            alt='book-cover'
            fallbackSrc={defaultCover}
          />
        </Center>
      </Td>
      <Td>
        <Center>{title}</Center>
      </Td>
      <Td>
        <Center>{author}</Center>
      </Td>
      <Td>
        <Center>{published}</Center>
      </Td>
      {inLibrary && (
        <Td>
          <Center>{insertion.slice(0, 10)}</Center>
        </Td>
      )}

      <Td>
        <Center>{pages}</Center>
      </Td>
      <Td>
        <Center>
          <NumberInput
            value={readPages}
            max={pages}
            onChange={e => setReadPages(e)}
          >
            <NumberInputField
              w='4em'
              variant='no-stepper-padding'
              paddingInlineEnd='0'
            />
          </NumberInput>
        </Center>
      </Td>
      <Td>
        <IconButton
          onClick={() => setReadState(!readState)}
          isRound='true'
          bg='transparent'
        >
          <Center>
            {readState ? (
              <CheckIcon color='green.500' mr={1} />
            ) : (
              <CloseIcon color='red.500' mr={1} />
            )}
          </Center>
        </IconButton>
      </Td>
      <Td>
        {/*Delete Button*/}
        {inLibrary && (
          <IconButton
            onClick={() => handleDelete()}
            isRound='true'
            bg='transparent'
          >
            <Center>
              <DeleteIcon boxSize='0.8em' />
            </Center>
          </IconButton>
        )}

        {/*Add Button*/}
        {!inLibrary && (
          <Center>
            <IconButton
              onClick={() => handleAdd()}
              as={MdLibraryAdd}
              bg='transparent'
              color='teal.500'
              boxSize='2em'
            ></IconButton>
          </Center>
        )}
      </Td>
    </Tr>
  )
}

export default Book
