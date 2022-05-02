import { useQuery } from '@apollo/client'
import { BOOK_COUNT, BOOK_COUNT_BY_READSTATE } from '../../graphql/queries'

const useBookCount = () => {
    const totalBooks = useQuery(BOOK_COUNT)
    const totalRead = useQuery(BOOK_COUNT_BY_READSTATE, {
        variables: { readState: 'read' },
    })
    const totalUnread = useQuery(BOOK_COUNT_BY_READSTATE, {
        variables: { readState: 'unread' },
    })

    return {
        totalBooks: {
            bookCount: totalBooks.data?.bookCount,
            loading: totalBooks.loading,
        },
        totalRead: {
            bookCount: totalRead.data?.bookCountByReadState,
            loading: totalRead.loading,
        },
        totalUnread: {
            bookCount: totalUnread.data?.bookCountByReadState,
            loading: totalUnread.loading,
        },
    }
}
export default useBookCount
