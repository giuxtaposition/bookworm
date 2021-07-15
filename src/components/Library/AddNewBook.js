import React, { useState, useEffect } from 'react'
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Spinner,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_BOOKS } from '../../graphql/queries'

const AddNewBook = ({ onClose, isOpen, oldSearch = '', oldResults = [] }) => {
  const [search, SetSearch] = useState(oldSearch)
  const [checkedFilter, setCheckedFilter] = useState('all')
  const [results, setResults] = useState(oldResults)

  const [getBooks, { loading, error, data }] = useLazyQuery(SEARCH_BOOKS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setResults(data.searchBooks)
    },
  })

  const submitSearch = () => {
    if (checkedFilter !== 'all') {
      getBooks({
        variables: {
          searchParameter: search,
          filter: checkedFilter,
        },
      })
    } else {
      getBooks({
        variables: {
          searchParameter: search,
        },
      })
    }
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
                  <Radio value='isbn'>ISBN</Radio>
                </Stack>
              </RadioGroup>

              {/*Search Results*/}
              {loading ? (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.300'
                  color='teal.500'
                  size='xl'
                />
              ) : (
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
                        genres={book.genres}
                        key={book.id}
                        id={book.id}
                        inLibrary={false}
                        searchResultsBooks={results}
                        setSearchResultsBooks={setResults}
                      />
                    ))}
                  </Tbody>
                </Table>
              )}
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
