import {
  GitHubActivity,
  GitHubActivityDeletePayload,
} from '@/models/github/GitHubActivity'
import React from 'react'
import MypageActivityContainer from './MypageActivityContainer'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
}

export default function MypageDeleteActivity(props: Props) {
  const payload = props.activity.payload as GitHubActivityDeletePayload

  return (
    <MypageActivityContainer
      activity={props.activity}
      message={
        <>
          deleted {payload.ref_type} {payload.ref}{' '}
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
