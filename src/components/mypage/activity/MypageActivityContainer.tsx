import { GitHubActivity } from '@/models/github/GitHubActivity'
import { Box, HStack, Link } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'
import { DateTime } from 'luxon'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
  message: JSX.Element
  children?: JSX.Element
}

const iconSize = '32px'

export default function MypageActivityContainer(props: Props) {
  const { activity } = props

  return (
    <>
      <HStack>
        <Box mr={2}>
          <Link
            href={`https://github.com/${activity.actor.login}`}
            rel="nofollow"
          >
            <Image
              src={activity.actor.avatar_url}
              alt=""
              width={iconSize}
              height={iconSize}
            />
          </Link>
        </Box>
        <Box>
          <HStack fontSize="14px">
            <MypageActivityMessageLink
              href={`https://github.com/${activity.actor.login}`}
              display="inline-block"
              rel="nofollow"
              mr={1}
            >
              {activity.actor.login}
            </MypageActivityMessageLink>
            {props.message}
            <Box fontSize="12px">
              {DateTime.fromISO(activity.created_at).toLocal().toRelative()}
            </Box>
          </HStack>
        </Box>
      </HStack>
      {props.children ?? <></>}
    </>
  )
}
