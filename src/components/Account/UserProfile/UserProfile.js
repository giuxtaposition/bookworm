import { VStack, Flex, Skeleton } from '@chakra-ui/react'
import BooksSection from './BooksSection'
import UserProfileCard from './UserProfileCard'
import UserProfileHeader from './UserProfileHeader'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../../../graphql/queries'

const UserProfile = ({ user }) => {
  const allBooksRead = useQuery(ALL_BOOKS, {
    variables: {
      readState: 'read',
    },
  })

  const allBooksUnread = useQuery(ALL_BOOKS, {
    variables: {
      readState: 'unread',
    },
  })

  if (!user) {
    return null
  }

  return (
    <VStack>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        w='full'
        mx='auto'
      >
        <UserProfileHeader user={user} />

        <UserProfileCard user={user} />

        {allBooksUnread.data && (
          <BooksSection
            sectionTitle='To read'
            sectionDescription='Books on your reading list'
            books={allBooksUnread.data.allBooks}
          />
        )}

        {allBooksRead.data && (
          <BooksSection
            sectionTitle='finished'
            sectionDescription="Books you've already read"
            books={allBooksRead.data.allBooks}
          />
        )}
      </Flex>
    </VStack>
  )
}
export default UserProfile
