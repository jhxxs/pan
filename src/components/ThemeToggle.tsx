import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { Button, useColorMode } from "@chakra-ui/react"

const ThemeToggle: React.FC<{
  className?: string
}> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button onClick={toggleColorMode} className={props.className}>
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  )
}

export default ThemeToggle
