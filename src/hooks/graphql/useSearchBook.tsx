import { useQuery } from '@apollo/client'
import { useRouteMatch } from 'react-router-dom'
import { SEARCH_BOOK } from '../../graphql/queries'

const useSearchBook = () => {
    const match = useRouteMatch<{ id: string }>('/book/:id')

    const { data, loading } = useQuery(SEARCH_BOOK, {
        variables: {
            id: match?.params.id,
        },
    })

    return {
        searchBookResult: data,
        loading,
    }
}
export default useSearchBook
