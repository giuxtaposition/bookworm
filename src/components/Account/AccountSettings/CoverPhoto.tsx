import { useMutation } from '@apollo/client'
import {
    chakra,
    Flex,
    Icon,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useToast,
    VisuallyHidden,
    VStack,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { EDIT_USER_COVER_PHOTO } from '../../../graphql/mutations'
import { CURRENT_USER } from '../../../graphql/queries'
import FormSection from './FormSection'

const CoverPhoto: React.FC = () => {
    const [draggedFile, setDraggedFile] = useState(false)
    const userCoverInput = useRef(null)
    const toast = useToast()
    const { colorMode } = useColorMode()

    const [editUserCoverPhoto] = useMutation(EDIT_USER_COVER_PHOTO, {
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
                    me: data.editUserCoverPhoto,
                },
            })
        },
        onCompleted: () => {
            toast({
                title: 'Success',
                description: 'Cover photo changed successfully!',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        },
    })

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setDraggedFile(false)

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            editUserCoverPhoto({
                variables: { coverPhoto: event.dataTransfer.files[0] },
            })
        }
    }

    const handleUserCoverPhoto = (event: React.ChangeEvent<HTMLInputElement>) =>
        event.target.validity.valid &&
        editUserCoverPhoto({
            variables: { coverPhoto: event.target.files?.[0] },
        })

    return (
        <FormSection sectionTitle='Cover Photo'>
            <VStack>
                <Flex
                    ref={userCoverInput}
                    w={{ base: '2xs', md: 'xs', lg: 'sm' }}
                    mt={1}
                    justify='center'
                    px={{ base: 0, md: 6 }}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={`${
                        draggedFile && colorMode === 'light'
                            ? 'teal.300'
                            : draggedFile && colorMode === 'dark'
                            ? 'teal.500'
                            : !draggedFile && colorMode === 'light'
                            ? 'gray.300'
                            : 'gray.500'
                    }`}
                    borderStyle='dashed'
                    rounded='md'
                    _hover={{
                        borderColor: useColorModeValue('teal.300', 'teal.500'),
                    }}
                    onDrop={event => handleDrop(event)}
                    onDragEnter={e => {
                        e.preventDefault()
                        setDraggedFile(true)
                    }}
                    onDragLeave={e => {
                        e.preventDefault()
                        setDraggedFile(false)
                    }}
                    onDragOver={e => {
                        e.preventDefault()
                        setDraggedFile(true)
                    }}
                >
                    <Stack spacing={1} textAlign='center'>
                        <Icon
                            mx='auto'
                            boxSize={12}
                            color={useColorModeValue('gray.400', 'gray.500')}
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                        >
                            <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </Icon>
                        <Flex
                            fontSize='sm'
                            color={useColorModeValue('gray.600', 'gray.400')}
                            alignItems='baseline'
                        >
                            <chakra.label
                                htmlFor='user-cover'
                                cursor='pointer'
                                rounded='md'
                                fontSize='md'
                                color={useColorModeValue(
                                    'teal.600',
                                    'teal.200'
                                )}
                                pos='relative'
                                _hover={{
                                    color: useColorModeValue(
                                        'teal.400',
                                        'teal.300'
                                    ),
                                }}
                            >
                                <span>Upload a file</span>
                                <VisuallyHidden>
                                    <input
                                        id='user-cover'
                                        name='user-cover'
                                        type='file'
                                        onChange={handleUserCoverPhoto}
                                    />
                                </VisuallyHidden>
                            </chakra.label>
                            <Text pl={1}>or drag and drop</Text>
                        </Flex>
                        <Text
                            fontSize='xs'
                            color={useColorModeValue('gray.500', 'gray.50')}
                        >
                            PNG, JPG, GIF up to 10MB
                        </Text>
                    </Stack>
                </Flex>
            </VStack>
        </FormSection>
    )
}
export default CoverPhoto
