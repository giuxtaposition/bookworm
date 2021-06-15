import React, { useContext, useMemo, useState } from 'react'
import { LibraryContext } from '../../context'
import { Table, Thead, Tbody, Tr, Th, Icon, Button } from '@chakra-ui/react'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import Book from './Book'
import moment from 'moment'

const LibraryTable = () => {
  //CONTEXT
  const { books, searchFilter, searchFilterType } = useContext(LibraryContext)

  //STATES
  const [publicationSorting, setPublicationSorting] = useState('asc')
  const [insertionSorting, setInsertionSorting] = useState('asc')
  const [sortByFilter, setSortByFilter] = useState({
    sort: '',
    order: '',
  })

  //Sort By Publication Date
  const handlePublicationSorting = () => {
    if (publicationSorting === 'asc') {
      setPublicationSorting('desc')
      setSortByFilter({
        sort: 'publication',
        order: 'desc',
      })
    } else {
      setPublicationSorting('asc')
      setSortByFilter({
        sort: 'publication',
        order: 'asc',
      })
    }
  }

  //Sort By Insertion Date
  const handleInsertionSorting = () => {
    if (insertionSorting === 'asc') {
      setInsertionSorting('desc')
      setSortByFilter({
        sort: 'insertion',
        order: 'desc',
      })
    } else {
      setInsertionSorting('asc')
      setSortByFilter({
        sort: 'insertion',
        order: 'asc',
      })
    }
  }

  //Search Books
  const searchedBooks = useMemo(() => {
    //Check if search filter is in author or title
    const checkAuthorOrTitle = book => {
      if (book.title.toLowerCase().includes(searchFilter.toLowerCase())) {
        return book
      }
      if (Array.isArray(book.author)) {
        for (const author of book.author) {
          if (author.toLowerCase().includes(searchFilter.toLowerCase())) {
            return book
          }
        }
      } else {
        if (book.author.toLowerCase().includes(searchFilter.toLowerCase())) {
          return book
        }
      }
    }
    const checkAuthor = book => {
      if (Array.isArray(book.author)) {
        for (const author of book.author) {
          if (author.toLowerCase().includes(searchFilter.toLowerCase())) {
            return book
          }
        }
      } else {
        if (book.author.toLowerCase().includes(searchFilter.toLowerCase())) {
          return book
        }
      }
    }
    const checkTitle = book => {
      if (book.title.toLowerCase().includes(searchFilter.toLowerCase())) {
        return book
      }
    }

    if (searchFilter === '') {
      return books
    } else {
      if (searchFilterType === 'all') {
        return books.filter(book => checkAuthorOrTitle(book))
      } else if (searchFilterType === 'title') {
        return books.filter(book => checkTitle(book))
      } else if (searchFilterType === 'author') {
        return books.filter(book => checkAuthor(book))
      }
    }
  }, [books, searchFilter, searchFilterType])

  // Sort Books
  const sortedBooks = useMemo(() => {
    if (sortByFilter.sort === 'insertion') {
      if (sortByFilter.order === 'asc') {
        return searchedBooks.sort((a, b) =>
          moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
            moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
          )
            ? -1
            : 1
        )
      } else {
        return searchedBooks.sort((a, b) =>
          moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
            moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
          )
            ? 1
            : -1
        )
      }
    } else if (sortByFilter.sort === 'publication') {
      if (sortByFilter.order === 'asc') {
        return searchedBooks.sort((a, b) =>
          moment(a.published, 'DD/MM/YYYY').isBefore(
            moment(b.published, 'DD/MM/YYYY')
          )
            ? -1
            : 1
        )
      } else {
        return searchedBooks.sort((a, b) =>
          moment(a.published, 'DD/MM/YYYY').isBefore(
            moment(b.published, 'DD/MM/YYYY')
          )
            ? 1
            : -1
        )
      }
    } else {
      return searchedBooks
    }
  }, [sortByFilter, searchedBooks])

  return (
    <Table variant='simple' mt={6} colorScheme='teal'>
      <Thead>
        <Tr>
          <Th>Cover</Th>
          <Th>Title</Th>
          <Th>Author</Th>
          <Th>
            <Button onClick={() => handlePublicationSorting()} bg='transparent'>
              Publication Date
              {publicationSorting === 'asc' ? (
                <Icon
                  w={6}
                  h={6}
                  bg='transparent'
                  as={AiOutlineSortAscending}
                />
              ) : (
                <Icon
                  w={6}
                  h={6}
                  bg='transparent'
                  as={AiOutlineSortDescending}
                />
              )}
            </Button>
          </Th>
          <Th>
            <Button onClick={() => handleInsertionSorting()} bg='transparent'>
              Date Added
              {insertionSorting === 'asc' ? (
                <Icon
                  w={6}
                  h={6}
                  bg='transparent'
                  as={AiOutlineSortAscending}
                />
              ) : (
                <Icon
                  w={6}
                  h={6}
                  bg='transparent'
                  as={AiOutlineSortDescending}
                />
              )}
            </Button>
          </Th>
          <Th>Total Pages</Th>
          <Th>Pages Read</Th>
          <Th>Read</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedBooks.map(book => (
          <Book
            title={book.title}
            author={book.author}
            cover={book.cover}
            pages={book.pages}
            published={book.published}
            insertion={book.insertion}
            pagesRead={book.pagesRead}
            read={book.read}
            key={book.id}
            id={book.id}
          />
        ))}
      </Tbody>
    </Table>
  )
}
export default LibraryTable
