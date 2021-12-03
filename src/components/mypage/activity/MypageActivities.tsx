import { useMypage } from '@/hooks/useMypage'
import { Divider } from '@chakra-ui/layout'
import MypageForkActivity from './MypageForkActivity'

export default function MypageActivities() {
  const { activities } = useMypage()

  return (
    <>
      {activities
        .map((activity) => {
          if (activity.type === 'ForkEvent') {
            return <MypageForkActivity key={activity.id} activity={activity} />
          }
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
