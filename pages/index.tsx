import MypageActivities from '@/components/mypage/activity/MypageActivities'
import MypageHeader, {
  mypageHeaderHeight,
} from '@/components/mypage/header/MypageHeader'
import Login from '@/components/mypage/Login'
import MypageRepositories from '@/components/mypage/MypageRepositories'
import { useAuthentication } from '@/hooks/useAuthentication'
import { useMypage } from '@/hooks/useMypage'
import { Box } from '@chakra-ui/layout'
import Head from 'next/head'
import React, { useEffect } from 'react'

export default function Home() {
  const { isInitialized, user } = useAuthentication({
    shouldInitialize: true,
  })
  const { initialize } = useMypage()

  useEffect(() => {
    if (!user || !isInitialized) {
      return
    }
    initialize()
  }, [isInitialized, !!user])

  return (
    <Box background="#F6F8FA" height="100vh">
      <MypageHeader />

      {user ? (
        <Box as="main" display="flex">
          <Box
            background="white"
            width="310px"
            height={`calc(100vh - ${mypageHeaderHeight})`}
            overflowY="scroll"
            p={8}
          >
            <MypageRepositories />
          </Box>
          <Box p={8}>
            <MypageActivities />
          </Box>
        </Box>
      ) : (
        <Login />
      )}

      <footer></footer>
    </Box>
  )
}
