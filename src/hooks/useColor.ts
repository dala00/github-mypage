import { useColorModeValue } from '@chakra-ui/color-mode'

export function useColor() {
  return {
    primaryColor: useColorModeValue('#24292F', 'gray.500'),
    primaryForegroundColor: useColorModeValue('white', 'rgb(36,41,47)'),
  }
}
