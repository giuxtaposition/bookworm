import React, { useState } from 'react'

import axios from 'axios'
import Book from './Book'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
  CloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const AddNewBook = ({ onClose, isOpen }) => {
  const [search, SetSearch] = useState('')
  const apiKey = 'AIzaSyDi5VwAtZHab0ufcOB8xeHWESepbyjdvbs'
  const [results, setResults] = useState([])
  const [checkedFilter, setCheckedFilter] = useState('all')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const submitSearch = () => {
    console.log(checkedFilter)
    let filter = ''

    if (checkedFilter === 'title') {
      filter = '+intitle:'
    } else if (checkedFilter === 'author') {
      filter = '+inauthor:'
    } else if (checkedFilter === 'ISBN') {
      filter = '+isbn:'
    }

    let url =
      'https://www.googleapis.com/books/v1/volumes?q=' +
      filter +
      search +
      '&key=' +
      apiKey +
      '&maxResults=5'

    axios.get(url).then(data => {
      const books = data.data.items.map(book => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          cover:
            book.volumeInfo.imageLinks === undefined
              ? ''
              : book.volumeInfo.imageLinks.thumbnail,
          pages: book.volumeInfo.pageCount,
          published: book.volumeInfo.publishedDate,
          pagesRead: 0,
          read: false,
        }
      })
      setResults(books)
    })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      submitSearch()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='fit-content'>
          <ModalHeader>Add New Book</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              {/*Search Bar*/}
              <InputGroup minW={150}>
                <Input
                  type='search'
                  placeholder='Search..'
                  value={search}
                  onChange={e => SetSearch(e.target.value)}
                  onKeyDown={e => handleKeyDown(e)}
                />
                <InputRightElement
                  children={
                    <Button bg='transparent'>
                      <Search2Icon
                        color={useColorModeValue('gray.700', 'gray.500')}
                        onClick={() => submitSearch()}
                      />
                    </Button>
                  }
                />
              </InputGroup>

              {/*Radio Buttons*/}
              <RadioGroup
                onChange={e => setCheckedFilter(e)}
                value={checkedFilter}
              >
                <Stack direction='row'>
                  <Radio value='all'>All</Radio>
                  <Radio value='title'>Title</Radio>
                  <Radio value='author'>Author</Radio>
                  <Radio value='ISBN'>ISBN</Radio>
                </Stack>
              </RadioGroup>

              {/*Book Added Successfully Alert*/}
              {showSuccessAlert && (
                <Alert status='success'>
                  <AlertIcon />
                  Book Added Successfully!
                  <CloseButton
                    position='absolute'
                    right='8px'
                    top='8px'
                    onClick={() => setShowSuccessAlert(false)}
                  />
                </Alert>
              )}

              {/*Search Results*/}
              <Table
                variant='simple'
                mt={6}
                colorScheme='teal'
                px={2}
                py={2}
                maxW='xl'
              >
                <Thead>
                  <Tr>
                    <Th>Cover</Th>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th>Publication Date</Th>
                    <Th>Total Pages</Th>
                    <Th>Pages Read</Th>
                    <Th>Read</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {results.map(book => (
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
                      inLibrary={false}
                      searchResultsBooks={results}
                      setSearchResultsBooks={setResults}
                      setShowSuccessAlert={setShowSuccessAlert}
                    />
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewBook
