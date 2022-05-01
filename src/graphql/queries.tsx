import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query allBooks($readState: String) {
        allBooks(readState: $readState) {
            title
            published
            author {
                name
            }
            genres
            insertion
            cover
            readState
            id
            googleId
        }
    }
`

export const SEARCH_BOOKS = gql`
    query searchBooks($filter: String, $searchParameter: String!) {
        searchBooks(filter: $filter, searchParameter: $searchParameter) {
            title
            published
            author
            genres
            pages
            cover
            id
            inLibrary
        }
    }
`

export const SEARCH_BOOK = gql`
    query searchBook($id: ID!) {
        searchBook(id: $id) {
            title
            description
            published
            language
            author
            genres
            pages
            cover
            id
            inLibrary
        }
    }
`

export const BOOK_COUNT = gql`
    query bookCount {
        bookCount
    }
`

export const BOOK_COUNT_BY_READSTATE = gql`
    query bookCountByReadState($readState: String!) {
        bookCountByReadState(readState: $readState)
    }
`

export const POPULAR_BOOKS = gql`
    query popularBooks {
        popularBooks {
            title
            published
            author
            genres
            cover
            id
        }
    }
`

export const CURRENT_USER = gql`
    query me {
        me {
            username
            favoriteGenre
            name
            email
            bio
            profilePhoto {
                location
            }
            coverPhoto {
                location
            }
            id
        }
    }
`
