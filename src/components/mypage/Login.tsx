import { Button, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { mypageHeaderHeight } from './header/MypageHeader'
import { FaGithub } from 'react-icons/fa'
import { useAuthentication } from '@/hooks/useAuthentication'

export default function Login() {
  const { isInitialized, signInWithGithub } = useAuthentication({
    shouldInitialize: false,
  })

  return (
    <>
      <Flex
        height={`calc(100vh - ${mypageHeaderHeight})`}
        alignItems="center"
        justifyContent="center"
      >
        {isInitialized ? (
          <Button
            leftIcon={<FaGithub />}
            background="#24292F"
            color="white"
            onClick={signInWithGithub}
          >
            Sign in with GitHub
          </Button>
        ) : (
          <Spinner />
        )}
      </Flex>
    </>
  )
}
