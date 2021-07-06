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
