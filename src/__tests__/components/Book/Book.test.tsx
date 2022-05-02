import { MockedProvider } from '@apollo/client/testing'
import { cleanup, render, screen } from '@testing-library/react'
import Book from '../../../components/Book/Book'
import * as useSearchBookQuery from '../../../hooks/graphql/useSearchBook'
import { searchedBookResult } from '../../utils/bookUtils'

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        __esModule: true,
        useLocation: jest.fn(() => Promise.resolve()),
    }
})

describe('Book component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test('renders component', () => {
        renderBook()
    })

    test('if loading, show loading spinner', () => {
        renderBook(true)

        expect(
            screen.getByRole('progressbar').querySelector('.loading-spinner')
        ).toBeInTheDocument()
    })

    test('if not loading, show book data', () => {
        renderBook(false)

        expect(screen.getByText(searchedBookResult.title)).toBeInTheDocument()
    })

    function renderBook(loading: boolean = false) {
        const mockData = {
            searchBook: searchedBookResult,
        }

        jest.spyOn(useSearchBookQuery, 'default').mockImplementation(() => {
            return {
                searchBookResult: mockData,
                loading: loading,
            }
        })

        render(
            <MockedProvider addTypename={false}>
                <Book />
            </MockedProvider>
        )
    }
})
