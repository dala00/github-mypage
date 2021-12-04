import {
  GitHubActivity,
  GitHubActivityPullRequestPayload,
} from '@/models/github/GitHubActivity'
import { Box } from '@chakra-ui/react'
import React from 'react'
import MypageActivityContainer from './MypageActivityContainer'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
}

export default function MypageWatchActivity(props: Props) {
  const payload = props.activity.payload as GitHubActivityPullRequestPayload

  return (
    <MypageActivityContainer
      activity={props.activity}
      message={
        <>
          pull request{' '}
          <MypageActivityMessageLink href={payload.pull_request.html_url}>
            {payload.pull_request.title}
          </MypageActivityMessageLink>
          <Box>{payload.action}</Box>
          <MypageActivityMessageLink
            href={`https://github.com/${props.activity.repo.name}`}
          >
            {props.activity.repo.name}
          </MypageActivityMessageLink>
        </>
      }
    />
  )
}
