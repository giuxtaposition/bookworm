import { useMutation } from '@apollo/client'
import {
    Avatar,
    Button,
    chakra,
    Icon,
    Input,
    Stack,
    Text,
    useColorMode,
    useToast,
    VisuallyHidden,
    VStack,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import {
    DELETE_USER_PROFILE_PHOTO,
    EDIT_USER_PROFILE_PHOTO,
} from '../../../graphql/mutations'
import { CURRENT_USER } from '../../../graphql/queries'
import { User } from '../../../types/User'
import FormSection from './FormSection'

interface Props {
    user: User
}

const ProfilePhoto: React.FC<Props> = ({ user }) => {
    const { colorMode } = useColorMode()
    const toast = useToast()
    const userProfileInput = useRef<HTMLInputElement>(null)

    const [editUserProfilePhoto] = useMutation(EDIT_USER_PROFILE_PHOTO, {
        onError: ({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                toast({
                    title: 'Error',
                    description: graphQLErrors[0].message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
            } else {
                toast({
                    title: 'Error',
                    description: JSON.stringify(networkError),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
            }
        },
        update: (store, { data }) => {
            store.writeQuery({
                query: CURRENT_USER,
                data: {
                    me: data.editUserProfilePhoto,
                },
            })
        },
        onCompleted: () => {
            toast({
                title: 'Success',
                description: 'Profile Photo changed successfully!',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        },
    })

    const handleUserProfilePhoto = (
        event: React.ChangeEvent<HTMLInputElement>
    ) =>
        event.target.validity.valid &&
        editUserProfilePhoto({
            variables: { profilePhoto: event.target.files?.[0] },
        })

    const [deleteUserProfilePhoto] = useMutation(DELETE_USER_PROFILE_PHOTO, {
        onError: ({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                toast({
                    title: 'Error',
                    description: graphQLErrors[0].message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
            } else {
                toast({
                    title: 'Error',
                    description: JSON.stringify(networkError),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
            }
        },
        update: (store, { data }) => {
            store.writeQuery({
                query: CURRENT_USER,
                data: {
                    me: data.deleteUserProfilePhoto,
                },
            })
        },
        onCompleted: () => {
            toast({
                title: 'Success',
                description: 'Profile Photo deleted successfully!',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        },
    })

    return (
        <FormSection sectionTitle='Profile Photo'>
            <Stack direction={['column', 'row']} spacing={4}>
                {user && (
                    <Avatar
                        size='xl'
                        name={user.username}
                        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                        src={
                            user.profilePhoto ? user.profilePhoto.location : ''
                        }
                    />
                )}
                {!user && (
                    <Avatar
                        size='xl'
                        bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
                        icon={
                            <Icon
                                as={FaUser}
                                color={
                                    colorMode === 'light'
                                        ? 'teal.400'
                                        : 'teal.600'
                                }
                            />
                        }
                    />
                )}

                <VStack>
                    <Stack direction='row'>
                        <chakra.label htmlFor='user-profile'>
                            <Button
                                leftIcon={<BiCloudUpload />}
                                type='button'
                                variant='solid'
                                size='md'
                                fontWeight='medium'
                                onClick={() => {
                                    userProfileInput.current?.click()
                                }}
                            >
                                Change Photo
                            </Button>
                            <VisuallyHidden>
                                <Input
                                    ref={userProfileInput}
                                    id='user-profile'
                                    name='user-profile'
                                    type='file'
                                    onChange={e => handleUserProfilePhoto(e)}
                                />
                            </VisuallyHidden>
                        </chakra.label>
                        <Button
                            type='button'
                            variant='ghost'
                            size='md'
                            colorScheme='red'
                            onClick={() => deleteUserProfilePhoto()}
                        >
                            Delete
                        </Button>
                    </Stack>
                    <Text fontSize='sm' color='gray.500'>
                        .jpg, or .png. Max file size 700K.
                    </Text>
                </VStack>
            </Stack>
        </FormSection>
    )
}
export default ProfilePhoto
