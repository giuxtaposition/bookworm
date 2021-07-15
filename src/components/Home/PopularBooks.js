import React, { useState } from 'react'
import {
  VStack,
  Heading,
  HStack,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { POPULAR_BOOKS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import BooksCarousel from '../BooksCarousel'
import BookCard from '../BookCard'

const PopularBooks = () => {
  const [books, setBooks] = useState([])
  const { colorMode, toggleColorMode } = useColorMode()

  useQuery(POPULAR_BOOKS, {
    onCompleted: data => {
      setBooks(data.popularBooks)
    },
  })

  if (!books.length) {
    return null
  }

  return (
    <VStack w='full'>
      <Heading>Popular Books</Heading>
      <Text>Check out some of our popular books below</Text>
      <HStack w='full'>
        <BooksCarousel>
          {books &&
            books.map(book => (
              <div key={book.id}>
                <BookCard
                  cover={book.cover}
                  title={book.title}
                  author={book.author.name}
                />
              </div>
            ))}
        </BooksCarousel>
      </HStack>
    </VStack>
  )
}

export default PopularBooks
