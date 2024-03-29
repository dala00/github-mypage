import MypageHeader from '@/components/mypage/header/MypageHeader'
import { useAuthentication } from '@/hooks/useAuthentication'
import { GitHubCommit } from '@/models/github/GitHubCommit'
import { IgnoreRepositoryForCommitRequestData } from '@/models/request/user_request'
import { GitHubCommitsResponseData } from '@/models/response/github_response'
import { Box, Container, Divider, Link } from '@chakra-ui/layout'
import { Button, Collapse, Flex, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import InfiniteScroll from 'react-infinite-scroller'

export default function CommitsPage() {
  const router = useRouter()
  const { apiHeaders, isInitialized, setUser, user } = useAuthentication({
    shouldInitialize: true,
  })
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchCommits = useCallback(
    async (page: number) => {
      const result = await axios.get<GitHubCommitsResponseData>(
        `/api/github/commits?page=${page}`,
        apiHeaders
      )
      if (result.data.commits.length === 0) {
        setHasMore(false)
        return
      }
      setCommits([...commits, ...result.data.commits])
    },
    [commits, user]
  )

  const initialize = useCallback(async () => {
    await fetchCommits(1)
    setIsLoaded(true)
  }, [commits, user])

  useEffect(() => {
    if (!user) {
      return
    }
    initialize()
  }, [!!user])

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/')
    }
  }, [user, isInitialized])

  const ignoreRepository = useCallback(
    async (repositoryId: number) => {
      const data: IgnoreRepositoryForCommitRequestData = { repositoryId }
      await axios.post(
        '/api/users/ignore-repository-for-commit',
        data,
        apiHeaders
      )

      setUser({
        ...user,
        ignoreCommitRepositoryIds: [
          ...user.ignoreCommitRepositoryIds,
          repositoryId,
        ],
      })
    },
    [commits, user]
  )

  const isIgnored = useCallback(
    (repositoryId: number) => {
      return user.ignoreCommitRepositoryIds.includes(repositoryId)
    },
    [user?.ignoreCommitRepositoryIds]
  )

  return (
    <Box minHeight="100vh">
      <MypageHeader />

      <Container>
        {isLoaded ? (
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchCommits}
            hasMore={hasMore}
            loader={
              <Box textAlign="center">
                <Spinner />
              </Box>
            }
          >
            {commits.map((commit) => (
              <Collapse
                key={commit.sha}
                in={!isIgnored(commit.repository.id)}
                animateOpacity
              >
                <Box>
                  <Divider />
                  <Flex justifyContent="space-between">
                    <Box my={6}>
                      <Box>
                        <Link
                          href={commit.repository.html_url}
                          fontSize={12}
                          display="block"
                        >
                          {commit.repository.full_name}
                        </Link>
                        <Link
                          href={commit.html_url}
                          fontSize={16}
                          display="block"
                          color="blue.500"
                        >
                          {commit.commit.message}
                        </Link>
                        <Box fontSize={12}>
                          <Link href={commit.committer.html_url}>
                            {commit.committer.login}
                          </Link>{' '}
                          commited
                          <Text
                            as="time"
                            dateTime={commit.commit.committer.date}
                            display="inline-block"
                            ml={1}
                            title={DateTime.fromISO(
                              commit.commit.committer.date
                            )
                              .toLocal()
                              .toFormat('yyyy/MM/dd HH:mm')}
                          >
                            {DateTime.fromISO(commit.commit.committer.date)
                              .toLocal()
                              .toRelative()}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box mt={2}>
                      <Button
                        leftIcon={<MdClose />}
                        variant="ghost"
                        fontSize={12}
                        onClick={() => ignoreRepository(commit.repository.id)}
                      >
                        Ignore this
                        <br />
                        repository
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Collapse>
            ))}
          </InfiniteScroll>
        ) : (
          <Box m={16} textAlign="center">
            <Spinner />
          </Box>
        )}
      </Container>

      <footer></footer>
    </Box>
  )
}
