import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

export const BOOK_EDITED = gql`
  subscription {
    bookEdited {
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

export const BOOK_DELETED = gql`
  subscription {
    bookDeleted {
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

export const USER_PROFILE_EDITED = gql`
  subscription {
    userProfileUpdated {
      username
      favoriteGenre
      name
      email
      bio
      profilePhoto
      coverPhoto
      id
    }
  }
`
