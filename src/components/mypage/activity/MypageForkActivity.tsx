import { GitHubActivity } from '@/models/github/GitHubActivity'
import React from 'react'
import MypageActivityContainer from './MypageActivityContainer'
import MypageActivityMessageLink from './MypageActivityMessageLink'

type Props = {
  activity: GitHubActivity
}

export default function MypageForkActivity(props: Props) {
  return (
    <MypageActivityContainer
      activity={props.activity}
      message={
        <>
          forked{' '}
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
