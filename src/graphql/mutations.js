import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      title
      id
    }
  }
`

export const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $readState: String!) {
    editBook(id: $id, readState: $readState) {
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

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Date
    $author: String!
    $genres: [String!]
    $pages: Int
    $cover: String
    $readState: String!
    $id: ID!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
      pages: $pages
      cover: $cover
      readState: $readState
      id: $id
    ) {
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

export const EDIT_USER = gql`
  mutation editUser(
    $name: String
    $email: String
    $bio: String
    $favoriteGenre: String
  ) {
    editUser(
      name: $name
      email: $email
      bio: $bio
      favoriteGenre: $favoriteGenre
    ) {
      username
      favoriteGenre
      name
      email
      bio
    }
  }
`
