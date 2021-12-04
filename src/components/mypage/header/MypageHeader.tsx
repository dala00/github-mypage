import { useColor } from '@/hooks/useColor'
import { Box, Flex, Link } from '@chakra-ui/layout'
import React from 'react'
import NextLink from 'next/link'
import { IconContext } from 'react-icons'
import { FaGithub } from 'react-icons/fa'
import { useAuthentication } from '@/hooks/useAuthentication'
import MypageHeaderUser from './MypageHeaderUser'

export const mypageHeaderHeight = '64px'

export default function MypageHeader() {
  const { user } = useAuthentication({ shouldInitialize: false })
  const { primaryColor, primaryForegroundColor } = useColor()

  return (
    <Flex
      background={primaryColor}
      color={primaryForegroundColor}
      px={8}
      py={4}
      justifyContent="space-between"
      height={mypageHeaderHeight}
    >
      <Flex alignItems="center">
        <Box mr={4}>
          <NextLink href="/">
            <Link>
              <IconContext.Provider value={{ size: '32px' }}>
                <FaGithub />
              </IconContext.Provider>
            </Link>
          </NextLink>
        </Box>
        <NextLink href="/commits">
          <Link>Commits</Link>
        </NextLink>
      </Flex>
      <Box>{user && <MypageHeaderUser />}</Box>
    </Flex>
  )
}
