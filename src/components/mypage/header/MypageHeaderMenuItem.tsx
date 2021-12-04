import { MenuItem } from '@chakra-ui/menu'
import React, { ComponentProps } from 'react'

type Props = {
  children: JSX.Element | string
} & Omit<ComponentProps<typeof MenuItem>, 'color'>

export default function MypageHeaderMenuItem(props: Props) {
  const { children, ...menuItemProps } = props
  return (
    <MenuItem color="gray.700" fontSize="sm" {...menuItemProps}>
      {children}
    </MenuItem>
  )
}
