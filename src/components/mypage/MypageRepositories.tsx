import { useMypage } from '@/hooks/useMypage'
import { Flex, Link, List, ListItem } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'

export default function MypageRepositories() {
  const { repositories } = useMypage()

  return (
    <>
      <List spacing={3}>
        {repositories.map((repository) => (
          <ListItem key={repository.id} fontSize={14}>
            <Flex alignItems="center">
              <Image
                src={repository.owner.avatar_url}
                width="16px"
                height="16px"
                alt=""
                display="inline-block"
                borderRadius="50%"
                mr={2}
              />
              <Link href={repository.html_url}>{repository.full_name}</Link>
            </Flex>
          </ListItem>
        ))}
      </List>
    </>
  )
}
