import { useQuery } from '@apollo/client'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { POPULAR_BOOKS } from '../../graphql/queries'
import { Book } from '../../types/Book'
import BookCard from '../BookCard'
import BooksCarousel from '../BooksCarousel'

const PopularBooks: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])

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
