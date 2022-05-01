export interface Book {
    readState: 'read' | 'unread'
    id: string
    googleId: string
    cover: string
    title: string
    description: string
    author: Author
    pages: number
    genres: string[]
    published: string
    insertion: string
    language: string
    inLibrary: boolean
}

export interface Author {
    name: string
}

export type SearchedBookResult = {
    author: string
} & Book
