import { useAuthentication } from '@/hooks/useAuthentication'
import { IconButton } from '@chakra-ui/button'
import { Menu, MenuButton, MenuDivider, MenuList } from '@chakra-ui/menu'
import { Image, Link, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import MypageHeaderMenuItem from './MypageHeaderMenuItem'

export default function MypageHeaderUser() {
  const { signOut, user } = useAuthentication({ shouldInitialize: false })

  const onSignOut = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      signOut()
    },
    []
  )

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        colorScheme="black"
        icon={
          <Image
            src={user.photoURL}
            alt=""
            width="20px"
            height="20px"
            borderRadius="50%"
          />
        }
        variant="outline"
        border="none"
      />
      <MenuList>
        <MypageHeaderMenuItem>
          <>
            Signed in as{' '}
            <Text ml={1} fontWeight="bold">
              {user.screenName}
            </Text>
          </>
        </MypageHeaderMenuItem>
        <MenuDivider />
        <MypageHeaderMenuItem>
          <Link href={`https://github.com/${user.screenName}`}>
            Your profile
          </Link>
        </MypageHeaderMenuItem>
        <MypageHeaderMenuItem>
          <Link href={`https://github.com/${user.screenName}?tab=repositories`}>
            Your repositories
          </Link>
        </MypageHeaderMenuItem>
        <MypageHeaderMenuItem>
          <Link href={`https://github.com/${user.screenName}?tab=stars`}>
            Your stars
          </Link>
        </MypageHeaderMenuItem>
        <MypageHeaderMenuItem>
          <Link href={`https://gist.github.com/${user.screenName}`}>
            Your gists
          </Link>
        </MypageHeaderMenuItem>
        <MenuDivider />
        <MypageHeaderMenuItem>
          <Link href="https://github.com/settings/profile">Settings</Link>
        </MypageHeaderMenuItem>
        <MenuDivider />
        <MypageHeaderMenuItem>
          <Link onClick={onSignOut}>Sign out</Link>
        </MypageHeaderMenuItem>
      </MenuList>
    </Menu>
  )
}
