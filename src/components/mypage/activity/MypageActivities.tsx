import { useMypage } from '@/hooks/useMypage'
import { Divider } from '@chakra-ui/layout'
import MypageForkActivity from './MypageForkActivity'
import MypageWatchActivity from './MypageWatchActivity'

export default function MypageActivities() {
  const { activities } = useMypage()

  return (
    <>
      {activities
        .map((activity) => {
          if (activity.type === 'ForkEvent') {
            return <MypageForkActivity key={activity.id} activity={activity} />
          } else if (activity.type === 'WatchEvent') {
            return <MypageWatchActivity key={activity.id} activity={activity} />
          }
          return <>{activity.type}</>
        })
        .map((element) => (
          <>
            {element}
            <Divider my={4} />
          </>
        ))}
    </>
  )
}
