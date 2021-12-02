import { Link } from '@chakra-ui/layout'
import { ComponentProps } from 'react'

type Props = Omit<ComponentProps<typeof Link>, 'fontSize' | 'fontWeight'>

export default function MypageActivityMessageLink(props: Props) {
  return (
    <Link {...props} fontSize="14px" fontWeight="600">
      {props.children}
    </Link>
  )
}
