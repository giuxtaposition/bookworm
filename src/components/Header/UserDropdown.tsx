import {
    Avatar,
    Divider,
    Popover,
    PopoverContent,
    PopoverTrigger as OrigPopoverTrigger,
    useColorModeValue,
} from '@chakra-ui/react'
import NavItem from './NavItem'
import NavLink from './NavLink'

//TEMP FIX
const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
    OrigPopoverTrigger

interface Props {
    user: any
    logout: () => void
}

const UserDropdown: React.FC<Props> = ({ user, logout }) => {
    const dropdownBackground = useColorModeValue('white', 'gray.800')

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
                <NavLink path='/profile' fontSize='lg' rounded='xl'>
                    Profile
                </NavLink>
                <NavLink path='/settings' fontSize='lg'>
                    Settings
                </NavLink>
                <Divider />
                <NavItem
                    rounded='xl'
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
