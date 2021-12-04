import { useMypage } from '@/hooks/useMypage'
import { Divider } from '@chakra-ui/layout'
import React from 'react'
import MypageCreateActivity from './MypageCreateActivity'
import MypageDeleteActivity from './MypageDeleteActivity'
import MypageForkActivity from './MypageForkActivity'
import MypageIssueCommentActivity from './MypageIssueCommentActivity'
import MypagePullRequestActivity from './MypagePullRequestActivity'
import MypageWatchActivity from './MypageWatchActivity'

export default function MypageActivities() {
  const { activities } = useMypage()

  return (
    <>
      {activities
        .map((activity) => {
          if (activity.type === 'ForkEvent') {
            return <MypageForkActivity key={activity.id} activity={activity} />
          } else if (activity.type === 'CreateEvent') {
            return (
              <MypageCreateActivity key={activity.id} activity={activity} />
            )
          } else if (activity.type === 'DeleteEvent') {
            return (
              <MypageDeleteActivity key={activity.id} activity={activity} />
            )
          } else if (activity.type === 'IssueCommentEvent') {
            return (
              <MypageIssueCommentActivity
                key={activity.id}
                activity={activity}
              />
            )
          } else if (activity.type === 'PullRequestEvent') {
            return (
              <MypagePullRequestActivity
                key={activity.id}
                activity={activity}
              />
            )
          } else if (activity.type === 'WatchEvent') {
            return <MypageWatchActivity key={activity.id} activity={activity} />
          }
          return <>{activity.type}</>
        })
        .map((element, index) => (
          <>
            {element}
            <Divider key={index} my={4} />
          </>
        ))}
    </>
  )
}
