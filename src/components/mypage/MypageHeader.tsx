import { useColor } from '@/hooks/useColor'
import { Box, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'
import { IconContext } from 'react-icons'
import { FaGithub } from 'react-icons/fa'
import { useAuthentication } from '@/hooks/useAuthentication'

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
      <Box>
        <IconContext.Provider value={{ size: '32px' }}>
          <FaGithub />
        </IconContext.Provider>
      </Box>
      <Box>
        {user && (
          <>
            <Image
              src={user.photoURL}
              alt=""
              width="20px"
              height="20px"
              borderRadius="50%"
            />
          </>
        )}
      </Box>
    </Flex>
  )
}
