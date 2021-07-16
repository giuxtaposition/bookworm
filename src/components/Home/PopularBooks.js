import React, { useState } from 'react'
import { VStack, Heading, HStack, Text } from '@chakra-ui/react'
import { POPULAR_BOOKS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import BooksCarousel from '../BooksCarousel'
import BookCard from '../BookCard'

const PopularBooks = () => {
  const [books, setBooks] = useState([])

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
      <Heading>The New York Times</Heading>
      <Text>Best selling books of the week</Text>
      <HStack w='full'>
        <BooksCarousel>
          {books &&
            books.map(book => (
              <BookCard
                key={book.id}
                cover={book.cover}
                title={book.title}
                author={book.author}
                id={book.id}
              />
            ))}
        </BooksCarousel>
      </HStack>
    </VStack>
  )
}

export default PopularBooks
