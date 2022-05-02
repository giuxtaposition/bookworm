import { MockedProvider } from '@apollo/client/testing'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import BookLowerBox from '../../../components/Book/BookLowerBox'
import { User } from '../../../types/User'
import { searchedBookResult } from '../../utils/bookUtils'
import { user } from '../../utils/userUtils'

const mockHistoryPush = jest.fn()
const mockLocationState = {
    pathname: '/pathname',
    search: 'search',
}

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        __esModule: true,
        useLocation: () => mockLocationState,
        useHistory: () => ({
            push: mockHistoryPush,
        }),
    }
})

const mockAddBook = jest.fn()
jest.mock('../../../graphql/useAddBookMutation', () => ({
    __esModule: true,
    default: () => mockAddBook,
}))

describe('BookLowerBox component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test('renders book info correctly', async () => {
        renderBookLowerBox()

        expect(
            screen.getByText(searchedBookResult.description)
        ).toBeInTheDocument()
    })

    describe('if book is in library', () => {
        test('renders filled bookmark icon', async () => {
            renderBookLowerBox(true)

            expect(
                screen.getByLabelText('book already in library')
            ).toBeInTheDocument()
        })

        test('clicking bookmark does nothing', async () => {
            renderBookLowerBox(true)

            const bookmarkComponent = screen.getByLabelText(
                'book already in library'
            )

            fireEvent.click(bookmarkComponent)

            expect(mockAddBook).not.toHaveBeenCalled()
            expect(mockHistoryPush).not.toHaveBeenCalled()
        })
    })

    describe('if book is not in library', () => {
        test('renders outlined bookmark icon', async () => {
            renderBookLowerBox(false)

            expect(
                screen.getByLabelText('add book to library')
            ).toBeInTheDocument()
        })

        test('if user signed in, clicking bookmark adds book to library', async () => {
            const book = renderBookLowerBox(false, user)

            const bookmarkComponent = screen.getByLabelText(
                'add book to library'
            )

            fireEvent.click(bookmarkComponent)

            expect(mockAddBook).toHaveBeenCalledWith(book)
            expect(mockHistoryPush).not.toHaveBeenCalled()
        })

        test('if user not signed in, clicking bookmark brings user to signin page', async () => {
            const book = renderBookLowerBox(false)

            const bookmarkComponent = screen.getByLabelText(
                'add book to library'
            )

            fireEvent.click(bookmarkComponent)

            expect(mockAddBook).not.toHaveBeenCalled()
            expect(mockHistoryPush).toHaveBeenCalledWith({
                pathname: '/signin',
                state: {
                    from: {
                        bookToAdd: {
                            ...book,
                        },
                        ...mockLocationState,
                    },
                },
            })
        })
    })

    function renderBookLowerBox(inLibrary?: boolean, user?: User) {
        const book = { ...searchedBookResult, ...(inLibrary && { inLibrary }) }

        render(
            <MockedProvider addTypename={false}>
                <BookLowerBox book={book} user={user} />
            </MockedProvider>
        )

        return book
    }
})
