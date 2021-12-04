import {
  GitHubActivity,
  GitHubActivityIssueCommentPayload,
} from '@/models/github/GitHubActivity'
import { Box } from '@chakra-ui/react'
import React from 'react'
import MypageActivityContainer from './MypageActivityContainer'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
}

export default function MypageIssueCommentActivity(props: Props) {
  const payload = props.activity.payload as GitHubActivityIssueCommentPayload

  return (
    <MypageActivityContainer
      activity={props.activity}
      message={
        <>
          comment {payload.action} on
          <MypageActivityMessageLink href={payload.comment.html_url}>
            {payload.issue.title}
          </MypageActivityMessageLink>
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
