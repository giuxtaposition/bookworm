import {
    Avatar,
    Box,
    Flex,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { FiBook } from 'react-icons/fi'
import { User } from '../../../types/User'

interface Props {
    user: User
}

const UserProfileCard: React.FC<Props> = ({ user }) => {
    const { colorMode } = useColorMode()

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
                {user.profilePhoto ? (
                    <Image
                        w='3xs'
                        src={
                            user.profilePhoto ? user.profilePhoto.location : ''
                        }
                        alt={user.username}
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
                                color={
                                    colorMode === 'light'
                                        ? 'teal.400'
                                        : 'teal.600'
                                }
                            />
                        }
                    />
                )}
            </Flex>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={2}>
                    <Heading
                        fontSize={'2xl'}
                        fontWeight={500}
                        fontFamily={'body'}
                    >
                        {user.username}
                    </Heading>
                    {user.name && <Text color={'gray.500'}>{user.name}</Text>}
                </Stack>

                {user.bio && (
                    <Stack textAlign='center' py={4}>
                        <Text fontSize='lg'>{user.bio}</Text>
                    </Stack>
                )}

                <Stack direction={'column'} justify={'flex-start'} spacing={2}>
                    {user.email && (
                        <Stack spacing={2} align={'center'} direction={'row'}>
                            <Icon
                                boxSize={6}
                                color='gray.500'
                                as={AiOutlineMail}
                            />
                            <Text fontSize={'sm'}>{user.email}</Text>
                        </Stack>
                    )}
                    {user.favoriteGenre && (
                        <Stack spacing={2} align={'center'} direction={'row'}>
                            <Icon boxSize={6} color='gray.500' as={FiBook} />
                            <Text fontSize={'sm'}>{user.favoriteGenre}</Text>
                        </Stack>
                    )}
                </Stack>
            </Box>
        </Box>
    )
}

export default UserProfileCard
