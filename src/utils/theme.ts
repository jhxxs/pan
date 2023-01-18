import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config = {
  initialColorMode: "system",
  useSystemColorMode: true
} satisfies ThemeConfig

const theme = extendTheme({ config })

export default theme
