import { VStack, Flex } from '@chakra-ui/react'
import UserProfileCard from './UserProfileCard'
import UserProfileHeader from './UserProfileHeader'

const UserProfile = ({ user }) => {
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
      </Flex>
    </VStack>
  )
}
export default UserProfile
