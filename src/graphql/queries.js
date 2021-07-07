import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
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
  query {
    bookCount
  }
`

export const BOOK_COUNT_BY_READSTATE = gql`
  query bookCountByReadState($readState: String!) {
    bookCountByReadState(readState: $readState)
  }
`