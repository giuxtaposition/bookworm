import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import NavLink from './NavLink'
import NavItem from './NavItem'

const UserDropdown = ({ user, logout }) => {
  const dropdownBackground = useColorModeValue('white', 'gray.900')

  if (!user) {
    return null
  }
  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Avatar
          cursor='pointer'
          size='md'
          name={user.username}
          src={user.profilePhoto ? user.profilePhoto.location : ''}
          _hover={{
            filter: 'brightness(80%)',
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        border={0}
        boxShadow={'xl'}
        rounded={'xl'}
        w={'2xs'}
        bgColor={dropdownBackground}
      >
        <NavLink path='/profile' fontSize='lg'>
          Profile
        </NavLink>
        <NavLink path='/settings' fontSize='lg'>
          Settings
        </NavLink>
        <Divider />
        <NavItem
          fontSize='lg'
          onClick={() => {
            logout()
          }}
        >
          Logout
        </NavItem>
      </PopoverContent>
    </Popover>
  )
}

export default UserDropdown
