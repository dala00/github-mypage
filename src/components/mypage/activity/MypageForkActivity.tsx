import { GitHubActivity } from '@/models/github/GitHubActivity'
import { Link } from '@chakra-ui/layout'
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
          <MypageActivityMessageLink href={props.activity.repo.url}>
            {props.activity.repo.name}
          </MypageActivityMessageLink>
        </>
      }
    />
  )
}
