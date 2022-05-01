import { useLazyQuery, useMutation } from '@apollo/client'
import {
    Heading,
    SimpleGrid,
    useMediaQuery,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ADD_BOOK } from '../../graphql/mutations'
import { ALL_BOOKS, SEARCH_BOOKS } from '../../graphql/queries'
import { Book } from '../../types/Book'
import { LocationState } from '../Account/LoginForm'
import BookCardList from './BookCardList'
import EmptySearchResults from './EmptySearchResults'
import SearchBar from './SearchBar'
import SearchLoadingSkeleton from './SearchLoadingSkeleton'

function useQueryParams() {
    return new URLSearchParams(useLocation().search)
}

interface Props {
    user: any
}

const Search: React.FC<Props> = ({ user }) => {
    const location = useLocation<LocationState>()
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const queryParams = useQueryParams()
    const search = queryParams.get('q')
    const filter = queryParams.get('filter')
    const toast = useToast()

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

            cache.modify({
                id: `searchedBook:${addBook.googleId}`,
                fields: {
                    inLibrary() {
                        return true
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

    const [searchBooks, { loading, data }] = useLazyQuery(SEARCH_BOOKS, {
        variables: {
            searchParameter: search,
            filter: filter,
        },
        fetchPolicy: 'network-only',
    })

    useEffect(() => {
        if (search) {
            searchBooks()
        }
    }, [search, searchBooks])

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

    if (!search) {
        return (
            <VStack p={10} spacing={4} flexGrow={1}>
                <SearchBar />
            </VStack>
        )
    }

    return (
        <VStack p={['5', '5', '10']} spacing={4} flexGrow={1}>
            <SearchBar />
            <Heading fontSize='3xl' alignSelf='flex-start'>
                Search Results for "{search}"
            </Heading>

            {loading && <SearchLoadingSkeleton />}

            {data && (
                <SimpleGrid
                    column={`${isLargerThan1280 ? 2 : 1}`}
                    spacing={8}
                    py={8}
                >
                    {data.searchBooks.map((result: Book, index: number) => (
                        <BookCardList
                            key={result.id + index}
                            id={result.id}
                            cover={result.cover}
                            title={result.title}
                            author={result.author}
                            pages={result.pages}
                            genres={result.genres}
                            published={result.published}
                            inLibrary={result.inLibrary}
                            user={user}
                            addBook={addBook}
                        />
                    ))}
                </SimpleGrid>
            )}
            {!loading && !data && <EmptySearchResults />}
        </VStack>
    )
}
export default Search
