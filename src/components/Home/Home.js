import {
  Heading,
  VStack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useColorModeValue,
  Stack,
  useDisclosure,
  useMediaQuery,
  chakra,
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
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

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
    <VStack spacing={4} w='100vw'>
      <VStack
        my={12}
        p={12}
        w={['90vw', '80vw', '80vw']}
        boxShadow='xl'
        bgColor={useColorModeValue('white', 'gray.700')}
        spacing={4}
        justifyContent='center'
        textAlign='center'
      >
        <Stack alignItems='center' justifyContent='center'>
          <Heading fontWeight='bold' size={`${isLargerThan600 ? 'xl' : 'md'}`}>
            Welcome to{' '}
            <chakra.span
              bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
              bgClip='text'
            >
              Bookworm
            </chakra.span>
          </Heading>
        </Stack>
        <Text>Search for your favourite book</Text>

        <InputGroup maxWidth={500} minWidth={150}>
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
