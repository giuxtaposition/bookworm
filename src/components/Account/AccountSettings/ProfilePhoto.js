import FormSection from './FormSection'
import {
  VStack,
  Text,
  Input,
  Button,
  Icon,
  Avatar,
  Stack,
  chakra,
  VisuallyHidden,
  useToast,
  useColorMode,
} from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { BiCloudUpload } from 'react-icons/bi'
import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'
import { CURRENT_USER } from '../../../graphql/queries'
import {
  DELETE_USER_PROFILE_PHOTO,
  EDIT_USER_PROFILE_PHOTO,
} from '../../../graphql/mutations'

const ProfilePhoto = ({ user }) => {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const userProfileInput = useRef(null)

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
          description: networkError,
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

  const handleUserProfilePhoto = ({
    target: {
      validity,
      files: [file],
    },
  }) =>
    validity.valid &&
    editUserProfilePhoto({ variables: { profilePhoto: file } })

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
          description: networkError,
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
            name={user.me.username}
            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            src={user.me.profilePhoto ? user.me.profilePhoto.location : ''}
          />
        )}
        {!user && (
          <Avatar
            size='xl'
            bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            icon={
              <Icon
                as={FaUser}
                color={colorMode === 'light' ? 'teal.400' : 'teal.600'}
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
              onClick={deleteUserProfilePhoto}
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
