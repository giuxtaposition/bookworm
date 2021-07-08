import React, { useState, useMemo, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Icon,
  Button,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import Book from './Book'
import { ALL_BOOKS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import moment from 'moment'

const LibraryTable = props => {
  //STATES
  const [publicationSorting, setPublicationSorting] = useState('asc')
  const [insertionSorting, setInsertionSorting] = useState('asc')
  const [sortByFilter, setSortByFilter] = useState({
    sort: '',
    order: '',
  })

  const [books, setBooks] = useState([])

  const { data, loading, error } = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  //Search Books
  const searchedBooks = useMemo(() => {
    //Check if search filter is in author or title
    const checkAuthorOrTitle = book => {
      if (book.title.toLowerCase().includes(props.searchFilter.toLowerCase())) {
        return book
      } else if (
        book.author.name
          .toLowerCase()
          .includes(props.searchFilter.toLowerCase())
      ) {
        return book
      }
    }

    const checkAuthor = book => {
      if (
        book.author.name
          .toLowerCase()
          .includes(props.searchFilter.toLowerCase())
      ) {
        return book
      }
    }

    const checkTitle = book => {
      if (book.title.toLowerCase().includes(props.searchFilter.toLowerCase())) {
        return book
      }
    }

    if (props.searchFilter === '') {
      return books
    } else {
      if (props.searchFilterType === 'title') {
        return books.filter(book => checkTitle(book))
      } else if (props.searchFilterType === 'author') {
        return books.filter(book => checkAuthor(book))
      } else {
        return books.filter(book => checkAuthorOrTitle(book))
      }
    }
  }, [books, props.searchFilter, props.searchFilterType])

  //Sort Books
  const sortedBooks = useMemo(() => {
    let booksToSort = searchedBooks.slice()
    if (sortByFilter.sort === 'insertion') {
      if (sortByFilter.order === 'asc') {
        return booksToSort.sort((a, b) =>
          moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
            moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
          )
            ? -1
            : 1
        )
      } else {
        return booksToSort.sort((a, b) =>
          moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
            moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
          )
            ? 1
            : -1
        )
      }
    } else if (sortByFilter.sort === 'publication') {
      if (sortByFilter.order === 'asc') {
        return booksToSort.sort((a, b) =>
          moment(a.published, 'DD/MM/YYYY').isBefore(
            moment(b.published, 'DD/MM/YYYY')
          )
            ? -1
            : 1
        )
      } else {
        return booksToSort.sort((a, b) =>
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

  return (
    <>
      {loading ? (
        <Center>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.300'
            color='teal.500'
            size='xl'
          />
        </Center>
      ) : (
        <Table variant='simple' mt={6} colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Cover</Th>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>
                <Button
                  onClick={() => handlePublicationSorting()}
                  bg='transparent'
                >
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
                <Button
                  onClick={() => handleInsertionSorting()}
                  bg='transparent'
                >
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
              <Th>Read</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedBooks &&
              sortedBooks.map(book => (
                <Book
                  title={book.title}
                  author={book.author.name}
                  cover={book.cover}
                  pages={book.pages}
                  published={book.published}
                  insertion={book.insertion}
                  read={book.readState}
                  key={book.id}
                  id={book.id}
                  updateCacheWith={props.updateCacheWith}
                />
              ))}
          </Tbody>
        </Table>
      )}
    </>
  )
}
export default LibraryTable
