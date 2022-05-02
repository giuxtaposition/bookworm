import { VStack } from '@chakra-ui/react'
import useSearchBookQuery from '../../graphql/useSearchBookQuery'
import { User } from '../../types/User'
import LoadingSpinner from '../LoadingSpinner'
import BookLowerBox from './BookLowerBox'
import BookUpperBox from './BookUpperBox'

interface Props {
    user?: User
}

const Book: React.FC<Props> = ({ user }) => {
    const { searchBookResult, loading } = useSearchBookQuery()

    return (
        <VStack
            py={{ base: 0, md: 10 }}
            w='full'
            flexGrow={1}
            alignItems='center'
            spacing={4}
        >
            {loading && <LoadingSpinner />}
            {searchBookResult && (
                <VStack
                    mx='auto'
                    shadow='lg'
                    maxW='2xl'
                    aria-live='polite'
                    aria-busy='false'
                >
                    <BookUpperBox book={searchBookResult.searchBook} />
                    <BookLowerBox
                        book={searchBookResult.searchBook}
                        user={user}
                    />
                </VStack>
            )}
        </VStack>
    )
}

export default Book
