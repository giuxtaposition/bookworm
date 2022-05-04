export interface Book {
    readState: 'read' | 'unread'
    id: string
    googleId: string
    cover: string
    title: string
    description: string
    author?: Author
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
    readState: 'read' | 'unread'
    id: string
    googleId: string
    cover?: string
    title: string
    description: string
    author: string
    pages: number
    genres: string[]
    published: string
    insertion: string
    language: string
    inLibrary: boolean
}
