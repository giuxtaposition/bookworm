import { render, screen } from '@testing-library/react'
import StatBox from '../../../components/Stats/StatBox'

describe('StatBox component', () => {
    test('render stats correctly', () => {
        render(
            <StatBox
                label='Total Books'
                number={12}
                text='Total number of books in the library'
            />
        )

        expect(screen.getByText('Total Books').nextSibling).toHaveTextContent(
            '12'
        )
        expect(
            screen.getByText('Total number of books in the library')
        ).toBeInTheDocument()
    })
})
