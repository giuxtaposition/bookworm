import { useLazyQuery } from '@apollo/client'
import { Heading, SimpleGrid, useMediaQuery, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEARCH_BOOKS } from '../../graphql/queries'
import useAddBookMutation from '../../graphql/useAddBookMutation'
import { User } from '../../types/User'
import { LocationState } from '../Account/LoginForm'
import BookCardList from './BookCardList'
import EmptySearchResults from './EmptySearchResults'
import SearchBar from './SearchBar'
import SearchLoadingSkeleton from './SearchLoadingSkeleton'

function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

interface Props {
    user?: User
}

const Search: React.FC<Props> = ({ user }) => {
    const location = useLocation<LocationState>()
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const queryParams = useQuery()
    const search = queryParams.get('q')
    const filter = queryParams.get('filter')
    const addBook = useAddBookMutation()

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
                await addBook({ ...bookToAdd })
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
            {console.log(search, filter)}

            {data && (
                <SimpleGrid
                    column={`${isLargerThan1280 ? 2 : 1}`}
                    spacing={8}
                    py={8}
                >
                    {data.searchBooks.map(
                        (result: {
                            id: string
                            cover: string
                            title: string
                            author: string
                            pages: number
                            genres: string[]
                            published: string
                            inLibrary: boolean
                        }) => (
                            <BookCardList
                                key={result.id}
                                id={result.id}
                                cover={result.cover}
                                title={result.title}
                                author={result.author}
                                pages={result.pages}
                                genres={result.genres}
                                published={result.published}
                                inLibrary={result.inLibrary}
                                user={user}
                            />
                        )
                    )}
                </SimpleGrid>
            )}
            {!loading && !data && <EmptySearchResults />}
        </VStack>
    )
}
export default Search
