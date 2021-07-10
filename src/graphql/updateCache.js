import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from './queries'

// Listen for new books and update cache when subscription data arrives
const UpdateCacheWith = (book, type) => {
  const client = useApolloClient()
  const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

  // Check that added book is not included in the current store
  const dataInStore = client.readQuery({ query: ALL_BOOKS })

  if (type === 'ADDED') {
    console.log('added type', book)
    if (!includedIn(dataInStore.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(book) },
      })
    }
  }

  if (type === 'DELETED') {
    if (includedIn(dataInStore.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.filter(
            bookInStore => bookInStore.id !== book.id
          ),
        },
      })
    }
  }

  if (type === 'EDITED') {
    if (!includedIn(dataInStore.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks
            .filter(bookInStore => bookInStore.id !== book.id)
            .concat(book),
        },
      })
    }
  }
}
export default UpdateCacheWith
