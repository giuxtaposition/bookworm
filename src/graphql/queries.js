import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
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
      author {
        name
      }
      genres
      insertion
      cover
      googleId
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
