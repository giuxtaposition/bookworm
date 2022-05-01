import { Flex, Stack, useColorMode } from '@chakra-ui/react'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import LibraryTableBody from './LibraryTableBody'
import LibraryTableHeader from './LibraryTableHeader'

interface Props {
    searchFilter: string
    searchFilterType: string
    books: any[]
}

const LibraryTable: React.FC<Props> = ({
    searchFilter,
    searchFilterType,
    books,
}) => {
    const [publicationSorting, setPublicationSorting] = useState<
        'asc' | 'desc'
    >('asc')
    const [insertionSorting, setInsertionSorting] = useState<'asc' | 'desc'>(
        'asc'
    )
    const [sortByFilter, setSortByFilter] = useState({
        sort: '',
        order: '',
    })

    const { colorMode } = useColorMode()

    //Search Books
    const searchedBooks = useMemo(() => {
        const checkAuthorOrTitle = (book: any) => {
            if (book.title.toLowerCase().includes(searchFilter.toLowerCase())) {
                return book
            } else if (
                book.author.name
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
            ) {
                return book
            }
        }

        const checkAuthor = (book: any) => {
            if (
                book.author.name
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
            ) {
                return book
            }
        }

        const checkTitle = (book: any) => {
            if (book.title.toLowerCase().includes(searchFilter.toLowerCase())) {
                return book
            }
        }

        if (searchFilter === '') {
            return books
        } else {
            if (searchFilterType === 'title') {
                return books.filter(book => checkTitle(book))
            } else if (searchFilterType === 'author') {
                return books.filter(book => checkAuthor(book))
            } else {
                return books.filter(book => checkAuthorOrTitle(book))
            }
        }
    }, [books, searchFilter, searchFilterType])

    //Sort Books
    const sortedBooks = useMemo(() => {
        let booksToSort = searchedBooks.slice()
        if (sortByFilter.sort === 'insertion') {
            if (sortByFilter.order === 'asc') {
                return booksToSort.sort((a, b) =>
                    moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
                        moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
                    )
                        ? -1
                        : 1
                )
            } else {
                return booksToSort.sort((a, b) =>
                    moment(a.insertion, 'DD/MM/YYYY-HH:mm:ss').isBefore(
                        moment(b.insertion, 'DD/MM/YYYY-HH:mm:ss')
                    )
                        ? 1
                        : -1
                )
            }
        } else if (sortByFilter.sort === 'publication') {
            if (sortByFilter.order === 'asc') {
                return booksToSort.sort((a, b) =>
                    moment(a.published, 'DD/MM/YYYY').isBefore(
                        moment(b.published, 'DD/MM/YYYY')
                    )
                        ? -1
                        : 1
                )
            } else {
                return booksToSort.sort((a, b) =>
                    moment(a.published, 'DD/MM/YYYY').isBefore(
                        moment(b.published, 'DD/MM/YYYY')
                    )
                        ? 1
                        : -1
                )
            }
        } else {
            return searchedBooks
        }
    }, [sortByFilter, searchedBooks])

    //Sort By Publication Date
    const handlePublicationSorting = () => {
        if (publicationSorting === 'asc') {
            setPublicationSorting('desc')
            setSortByFilter({
                sort: 'publication',
                order: 'desc',
            })
        } else {
            setPublicationSorting('asc')
            setSortByFilter({
                sort: 'publication',
                order: 'asc',
            })
        }
    }

    //Sort By Insertion Date
    const handleInsertionSorting = () => {
        if (insertionSorting === 'asc') {
            setInsertionSorting('desc')
            setSortByFilter({
                sort: 'insertion',
                order: 'desc',
            })
        } else {
            setInsertionSorting('asc')
            setSortByFilter({
                sort: 'insertion',
                order: 'asc',
            })
        }
    }

    return (
        <Flex
            w='full'
            px={['0', '15', '50']}
            py={50}
            alignItems='center'
            justifyContent='center'
        >
            <Stack
                direction={{ base: 'column' }}
                w='full'
                bg={{ md: colorMode === 'light' ? 'white' : '#19191d' }}
                shadow='lg'
            >
                {sortedBooks.map((book, index) => {
                    return (
                        <Flex
                            direction={{ base: 'row', md: 'column' }}
                            bg={`${
                                colorMode === 'light' ? 'gray.200' : '#25252b'
                            }`}
                            _hover={{
                                bg:
                                    colorMode === 'light'
                                        ? 'gray.200'
                                        : '#2e2e36',
                            }}
                            key={book.id}
                        >
                            <LibraryTableHeader
                                elementIndex={index}
                                showSortingButtons={true}
                                handlePublicationSorting={
                                    handlePublicationSorting
                                }
                                publicationSorting={publicationSorting}
                                handleInsertionSorting={handleInsertionSorting}
                                insertionSorting={insertionSorting}
                            />
                            <LibraryTableBody book={book} />
                        </Flex>
                    )
                })}
            </Stack>
        </Flex>
    )
}
export default LibraryTable
