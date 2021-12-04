import {
  GitHubActivity,
  GitHubActivityWatchPayload,
} from '@/models/github/GitHubActivity'
import React from 'react'
import MypageActivityContainer from './MypageActivityContainer'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
}

export default function MypageWatchActivity(props: Props) {
  const payload = props.activity.payload as GitHubActivityWatchPayload

  return (
    <MypageActivityContainer
      activity={props.activity}
      message={
        <>
          {payload.action} watched{' '}
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
