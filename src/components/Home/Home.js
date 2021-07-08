import {
  Heading,
  VStack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useColorModeValue,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import { SEARCH_BOOKS } from '../../graphql/queries'
import { useLazyQuery } from '@apollo/client'
import Features from './Features'
import PopularBooks from './PopularBooks'
import AddNewBook from '../Library/AddNewBook'

const Home = props => {
  const [search, SetSearch] = useState('')
  const [results, setResults] = useState([])
  const [renderAddNewBook, setRenderAddNewBook] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [getBooks, { loading, error, data }] = useLazyQuery(SEARCH_BOOKS)

  useEffect(() => {
    if (data) {
      setResults(data.searchBooks)
      setRenderAddNewBook(true)
      onOpen()
    }
  }, [data, onOpen])

  useEffect(() => {
    if (!isOpen) {
      setRenderAddNewBook(false)
    }
  }, [isOpen])

  const submitSearch = () => {
    getBooks({
      variables: {
        searchParameter: search,
        filter: 'all',
      },
    })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      submitSearch()
    }
  }

  return (
    <VStack spacing={4} w='100%'>
      <VStack
        my={12}
        padding={12}
        boxShadow='xl'
        bgColor={useColorModeValue('white', 'gray.700')}
        spacing={4}
        w='5xl'
      >
        <HStack>
          <Heading>Welcome to</Heading>
          <Heading
            fontWeight='bold'
            bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
            bgClip='text'
          >
            Bookworm
          </Heading>
        </HStack>
        <Text>Search for your favourite book</Text>

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
        {renderAddNewBook && (
          <AddNewBook
            onClose={onClose}
            isOpen={isOpen}
            updateCacheWith={props.updateCacheWith}
            oldSearch={search}
            oldResults={results}
          />
        )}
      </VStack>

      <PopularBooks />

      <Features />
    </VStack>
  )
}

export default Home
