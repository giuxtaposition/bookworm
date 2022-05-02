import { render, screen } from '@testing-library/react'
import BookUpperBox from '../../../components/Book/BookUpperBox'
import defaultCover from '../../../images/default-cover.jpg'
import { SearchedBookResult } from '../../../types/Book'
import { searchedBookResult } from '../../utils/bookUtils'

describe('BookUpperBox component', () => {
    test('renders book info correctly', async () => {
        render(<BookUpperBox book={searchedBookResult} />)

        expect(screen.getByText(searchedBookResult.title)).toBeInTheDocument()
        expect(
            screen.getByText(`By ${searchedBookResult.author}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(searchedBookResult.published)
        ).toBeInTheDocument()
        expect(screen.getByText(searchedBookResult.pages)).toBeInTheDocument()
        expect(
            screen.getByText(searchedBookResult.language)
        ).toBeInTheDocument()
        expect(screen.getByAltText('bookCover')).toHaveAttribute(
            'src',
            searchedBookResult.cover
        )
    })

    test('use default cover as fallback if book cover is not present', async () => {
        const bookWithoutCover: SearchedBookResult = {
            ...searchedBookResult,
            cover: undefined,
        }
        render(<BookUpperBox book={bookWithoutCover} />)

        expect(screen.getByAltText('bookCover')).toHaveAttribute(
            'src',
            defaultCover
        )
    })
})
