import { useQuery } from '@apollo/client'
import { useColorModeValue, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { SEARCH_BOOK } from '../../graphql/queries'
import useAddBookMutation from '../../graphql/useAddBookMutation'
import { User } from '../../types/User'
import { LocationState } from '../Account/LoginForm'
import LoadingSpinner from '../LoadingSpinner'
import BookLowerBox from './BookLowerBox'
import BookUpperBox from './BookUpperBox'

interface Props {
    user?: User
}

const Book: React.FC<Props> = ({ user }) => {
    const upperBoxBackground = useColorModeValue('#44aca0', '#065151')
    const lowerBoxBackground = useColorModeValue('white', 'gray.800')
    const location = useLocation<LocationState>()
    const addBook = useAddBookMutation()

    const match = useRouteMatch<{ id: string }>('/book/:id')

    const { data, loading } = useQuery(SEARCH_BOOK, {
        variables: {
            id: match?.params.id,
        },
    })

    useEffect(() => {
        const handleAdd = async () => {
            if (location.state) {
                const bookToAdd = location.state.bookToAdd
                await addBook({ ...bookToAdd })
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
                    />
                </VStack>
            )}
        </VStack>
    )
}

export default Book
