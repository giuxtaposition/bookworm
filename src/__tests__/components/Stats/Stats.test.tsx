import { MockedProvider } from '@apollo/client/testing'
import { cleanup, render, screen } from '@testing-library/react'
import Stats from '../../../components/Stats/Stats'
import * as useBookCount from '../../../hooks/graphql/useBookCount'

describe('Stats component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test('render stats correctly', () => {
        renderStats(12, 5, 7, false, false, false)

        expect(screen.getByText('Total Books').nextSibling).toHaveTextContent(
            '12'
        )
        expect(screen.getByText('Read').nextSibling).toHaveTextContent('5')
        expect(screen.getByText('Not Read').nextSibling).toHaveTextContent('7')
    })

    test('if loading,', () => {
        renderStats(undefined, undefined, undefined, true, true, true)

        expect(
            screen.getByRole('progressbar').querySelector('.loading-spinner')
        ).toBeInTheDocument()
    })

    function renderStats(
        totalBooksCount: number | undefined,
        totalReadCount: number | undefined,
        totalUnreadCount: number | undefined,
        totalBooksLoading: boolean,
        totalReadLoading: boolean,
        totalUnreadLoading: boolean
    ) {
        jest.spyOn(useBookCount, 'default').mockImplementation(() => {
            return {
                totalBooks: {
                    bookCount: totalBooksCount,
                    loading: totalBooksLoading,
                },
                totalRead: {
                    bookCount: totalReadCount,
                    loading: totalReadLoading,
                },
                totalUnread: {
                    bookCount: totalUnreadCount,
                    loading: totalUnreadLoading,
                },
            }
        })

        render(
            <MockedProvider addTypename={false}>
                <Stats />
            </MockedProvider>
        )
    }
})
