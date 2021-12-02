import { useMypage } from '@/hooks/useMypage'
import MypageForkActivity from './MypageForkActivity'

export default function MypageActivities() {
  const { activities } = useMypage()

  return (
    <>
      {activities.map((activity) => {
        if (activity.type === 'ForkEvent') {
          return <MypageForkActivity key={activity.id} activity={activity} />
        }
      })}
    </>
  )
}
