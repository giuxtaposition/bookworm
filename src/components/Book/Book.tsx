import { useMutation, useQuery } from '@apollo/client'
import { useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { ADD_BOOK } from '../../graphql/mutations'
import { ALL_BOOKS, SEARCH_BOOK } from '../../graphql/queries'
import { LocationState } from '../Account/LoginForm'
import LoadingSpinner from '../LoadingSpinner'
import BookLowerBox from './BookLowerBox'
import BookUpperBox from './BookUpperBox'

interface Props {
    user: any
}

const Book: React.FC<Props> = user => {
    const upperBoxBackground = useColorModeValue('#44aca0', '#065151')
    const lowerBoxBackground = useColorModeValue('white', 'gray.800')
    const toast = useToast()
    const location = useLocation<LocationState>()

    const [addBook] = useMutation(ADD_BOOK, {
        onError: error => {
            console.log(error)
            toast({
                title: 'Error',
                description: error.graphQLErrors[0].message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
        update(cache, { data: { addBook } }) {
            cache.modify({
                fields: {
                    allBooks(existingBooks = []) {
                        const newBookRef = cache.writeQuery({
                            data: addBook,
                            query: ALL_BOOKS,
                        })
                        return [...existingBooks, newBookRef]
                    },
                },
            })
        },
        onCompleted: () => {
            toast({
                title: 'Book Added.',
                description: 'Book added with success!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
    })

    const match = useRouteMatch<{ id: string }>('/book/:id')

    const { data, loading } = useQuery(SEARCH_BOOK, {
        variables: {
            id: match?.params.id!,
        },
    })

    useEffect(() => {
        const handleAdd = async () => {
            if (location.state) {
                const bookToAdd = location.state.bookToAdd
                await addBook({
                    variables: {
                        readState: 'unread',
                        title: bookToAdd.title,
                        id: bookToAdd.id,
                        published: bookToAdd.published,
                        author: bookToAdd.author,
                        genres: bookToAdd.genres,
                        cover: bookToAdd.cover,
                        pages: bookToAdd.pages,
                    },
                })
            }
        }

        handleAdd()
    }, [addBook, location.state])

    return (
        <VStack
            py={{ base: 0, md: 10 }}
            w='full'
            flexGrow={1}
            alignItems='center'
            spacing={4}
        >
            {loading && <LoadingSpinner />}
            {data && (
                <VStack mx='auto' shadow='lg' maxW='2xl'>
                    <BookUpperBox
                        upperBoxBackground={upperBoxBackground}
                        book={data.searchBook}
                    />
                    <BookLowerBox
                        lowerBoxBackground={lowerBoxBackground}
                        book={data.searchBook}
                        user={user}
                        addBook={addBook}
                    />
                </VStack>
            )}
        </VStack>
    )
}

export default Book
