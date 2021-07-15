import {
  Box,
  Flex,
  Avatar,
  Stack,
  Heading,
  Text,
  Icon,
  useColorModeValue,
  Image,
  useColorMode,
} from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiBook } from 'react-icons/fi'
import { FaUserAlt } from 'react-icons/fa'

const UserProfileCard = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      mt={'-20'}
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      py={'4'}
      zIndex='200'
    >
      <Flex justify={'center'}>
        {user.me.profilePhoto ? (
          <Image
            w='3xs'
            src={user.me.profilePhoto ? user.me.profilePhoto.location : ''}
            alt={user.me.username}
            rounded='full'
            borderStyle='solid'
            borderWidth={2}
            borderColor='teal.500'
          />
        ) : (
          <Avatar
            size='2xl'
            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            icon={
              <Icon
                as={FaUserAlt}
                color={colorMode === 'light' ? 'teal.400' : 'teal.600'}
              />
            }
          />
        )}
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={2}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {user.me.username}
          </Heading>
          {user.me.name && <Text color={'gray.500'}>{user.me.name}</Text>}
        </Stack>

        {user.me.bio && (
          <Stack textAlign='center' py={4}>
            <Text fontSize='lg'>{user.me.bio}</Text>
          </Stack>
        )}

        <Stack direction={'column'} justify={'flex-start'} spacing={2}>
          {user.me.email && (
            <Stack spacing={2} align={'center'} direction={'row'}>
              <Icon boxSize={6} color='gray.500' as={AiOutlineMail} />
              <Text fontSize={'sm'}>{user.me.email}</Text>
            </Stack>
          )}
          {user.me.favoriteGenre && (
            <Stack spacing={2} align={'center'} direction={'row'}>
              <Icon boxSize={6} color='gray.500' as={FiBook} />
              <Text fontSize={'sm'}>{user.me.favoriteGenre}</Text>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default UserProfileCard
