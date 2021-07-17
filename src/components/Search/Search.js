import {
  VStack,
  Heading,
  SimpleGrid,
  useMediaQuery,
  Skeleton,
} from '@chakra-ui/react'
import BookCardList from './BookCardList'
import { useLocation } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_BOOKS } from '../../graphql/queries'
import SearchBar from './SearchBar'
import EmptySearchResults from './EmptySearchResults'
import { useEffect } from 'react'

function useQueryParams() {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const queryParams = useQueryParams()
  const search = queryParams.get('q')
  const filter = queryParams.get('filter')

  const [getBooks, { loading, data }] = useLazyQuery(SEARCH_BOOKS, {
    variables: {
      searchParameter: search,
      filter: filter,
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (search) {
      getBooks()
    }
  }, [search, getBooks])

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
      {loading && (
        <SimpleGrid columns={`${isLargerThan1280 ? 2 : 1}`} spacing={8} py={8}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              bg='#2a2d37'
              w='xl'
              h='2xs'
              spacing={8}
              py={4}
              px={8}
              shadow='lg'
              rounded='lg'
            ></Skeleton>
          ))}
        </SimpleGrid>
      )}

      {data && (
        <SimpleGrid columns={`${isLargerThan1280 ? 2 : 1}`} spacing={8} py={8}>
          {data.searchBooks.map((result, index) => (
            <BookCardList
              key={result.id + index}
              id={result.id}
              cover={result.cover}
              title={result.title}
              author={result.author}
              pages={result.pages}
              genres={result.genres}
              published={result.published}
            />
          ))}
        </SimpleGrid>
      )}
      {!loading && !data && <EmptySearchResults />}
    </VStack>
  )
}
export default Search
