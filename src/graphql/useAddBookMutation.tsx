import { useMutation } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { ADD_BOOK } from './mutations'
import { ALL_BOOKS } from './queries'

const useAddBookMutation = (): ((request: AddBookRequest) => void) => {
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

    return async (request: AddBookRequest) =>
        await addBook({
            variables: {
                readState: 'unread',
                title: request.title,
                id: request.id,
                published: request.published,
                author: request.author,
                genres: request.genres,
                cover: request.cover,
                pages: request.pages,
            },
        })
}
export default useAddBookMutation

export interface AddBookRequest {
    title: string
    id: string
    published: string
    author: string
    genres: string[]
    cover?: string
    pages: number
}
