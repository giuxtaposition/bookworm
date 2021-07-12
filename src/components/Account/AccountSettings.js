import React, { useRef, useState } from 'react'
import {
  VStack,
  Heading,
  Divider,
  Text,
  FormControl,
  FormLabel,
  useColorModeValue,
  InputGroup,
  Input,
  Textarea,
  FormHelperText,
  Button,
  Icon,
  Avatar,
  Stack,
  Flex,
  chakra,
  VisuallyHidden,
  useToast,
  useColorMode,
} from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { BiCloudUpload } from 'react-icons/bi'
import {
  EDIT_USER,
  EDIT_USER_COVER_PHOTO,
  EDIT_USER_PROFILE_PHOTO,
} from '../../graphql/mutations'
import { useMutation } from '@apollo/client'
import UpdateCacheWith from '../../graphql/updateCache'

const FormSection = ({ sectionTitle, children }) => {
  return (
    <Stack
      direction={['column', 'row']}
      w='100%'
      justifyContent='space-between'
      px={50}
      py={10}
    >
      <Text alignSelf='flex-start' fontWeight='bold'>
        {sectionTitle}
      </Text>
      {children}
    </Stack>
  )
}

const Settings = () => {
  // STATES
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [draggedFile, setDraggedFile] = useState(false)

  const userProfileInput = useRef(null)
  const userCoverInput = useRef(null)

  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  const [editUser] = useMutation(EDIT_USER, {
    onError: error => {
      toast({
        title: 'Error',
        description: error.graphQLErrors[0].message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    },
    update: (store, response) => {
      //
    },
    onCompleted: () => {
      setName('')
      setBio('')
      setEmail('')
      setFavoriteGenre('')
      toast({
        title: 'Success',
        description: 'Your changes have been saved',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    },
  })

  const handleEdit = () => {
    editUser({
      variables: {
        name,
        email,
        bio,
        favoriteGenre,
      },
    })
  }

  const [editUserProfilePhoto] = useMutation(EDIT_USER_PROFILE_PHOTO, {
    onError: error => {
      if (error.graphQLErrors) {
        toast({
          title: 'Error',
          description: error.graphQLErrors[0].message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      } else {
        console.log(error)
      }
    },
    update: (store, response) => {
      //
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

  const [editUserCoverPhoto, { loading }] = useMutation(EDIT_USER_COVER_PHOTO, {
    onError: error => {
      if (error.graphQLErrors) {
        toast({
          title: 'Error',
          description: error.graphQLErrors[0].message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      } else {
        console.log(error)
      }
    },
    update: (store, response) => {
      //
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

  const handleUserProfilePhoto = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid &&
    editUserProfilePhoto({ variables: { profilePhoto: file } })

  const handleDrop = event => {
    event.preventDefault()
    setDraggedFile(false)

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      editUserCoverPhoto({
        variables: { coverPhoto: event.dataTransfer.files[0] },
      })
    }
  }

  const handleUserCoverPhoto = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid && editUserCoverPhoto({ variables: { coverPhoto: file } })

  return (
    <VStack py={50}>
      <VStack spacing={4} w={['90%', '90%', '80%', '50%', '50%']}>
        <Heading>Account Settings</Heading>

        <Divider />

        <FormSection sectionTitle='Personal Info' childrenDirection='column'>
          <VStack spacing={4}>
            {/* Name */}
            <FormControl>
              <FormLabel
                fontSize='sm'
                fontWeight='md'
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Name
              </FormLabel>
              <InputGroup size='sm'>
                <Input
                  type='text'
                  placeholder='Katniss  Evergreen'
                  focusBorderColor='teal.400'
                  rounded='md'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </InputGroup>
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel
                fontSize='sm'
                fontWeight='md'
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Email
              </FormLabel>
              <InputGroup size='sm'>
                <Input
                  type='email'
                  placeholder='kat.evergreen@district12.com'
                  focusBorderColor='teal.400'
                  rounded='md'
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </InputGroup>
            </FormControl>

            {/* About */}
            <FormControl>
              <FormLabel
                fontSize='sm'
                fontWeight='md'
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                About
              </FormLabel>
              <Textarea
                placeholder='I like to overthrow dictatorships for breakfast'
                mt={1}
                rows={3}
                shadow='sm'
                focusBorderColor='teal.400'
                fontSize={{ sm: 'sm' }}
                value={bio}
                onChange={({ target }) => setBio(target.value)}
              />
              <FormHelperText>
                Brief description for your profile. URLs are hyperlinked.
              </FormHelperText>
            </FormControl>

            {/* Favorite Genre */}
            <FormControl>
              <FormLabel
                fontSize='sm'
                fontWeight='md'
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Favorite Genre
              </FormLabel>
              <InputGroup size='sm'>
                <Input
                  type='text'
                  placeholder='Fantasy'
                  focusBorderColor='teal.400'
                  rounded='md'
                  value={favoriteGenre}
                  onChange={({ target }) => setFavoriteGenre(target.value)}
                />
              </InputGroup>
            </FormControl>
          </VStack>
        </FormSection>

        <Divider />

        {/* User Profile */}
        <FormSection sectionTitle='Profile Photo'>
          <Stack direction={['column', 'row']} spacing={4}>
            <Avatar
              size='xl'
              bg={useColorModeValue('gray.300', 'gray.700')}
              icon={
                <Icon
                  as={FaUser}
                  color={useColorModeValue('teal.400', 'teal.600')}
                />
              }
            />

            <VStack>
              <Stack direction={['column', 'row']}>
                <chakra.label htmlFor='user-profile'>
                  <Button
                    leftIcon={<BiCloudUpload />}
                    type='button'
                    variant='solid'
                    size='md'
                    fontWeight='medium'
                    onClick={() => {
                      userProfileInput.current.click()
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
                      onChange={handleUserProfilePhoto}
                    />
                  </VisuallyHidden>
                </chakra.label>
                <Button
                  type='button'
                  variant='ghost'
                  size='md'
                  colorScheme='red'
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

        {/* User Cover Photo */}
        <FormSection sectionTitle='Cover Photo'>
          <VStack>
            <Flex
              ref={userCoverInput}
              w={{ base: 'xs', lg: 'sm' }}
              mt={1}
              justify='center'
              px={6}
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
                    color={useColorModeValue('teal.600', 'teal.200')}
                    pos='relative'
                    _hover={{
                      color: useColorModeValue('teal.400', 'teal.300'),
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

        <Stack direction={['column', 'row']}>
          <Button
            type='submit'
            colorScheme='teal'
            fontWeight='bold'
            onClick={handleEdit}
          >
            Save Changes
          </Button>
          <Button type='button' variant='outline' fontWeight='bold'>
            Cancel
          </Button>
        </Stack>
      </VStack>
    </VStack>
  )
}

export default Settings
