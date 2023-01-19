import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { Button, ButtonProps, useColorMode } from "@chakra-ui/react"
import clsx from "clsx"

const ThemeToggle: React.FC<
  {
    className?: string
  } & ButtonProps
> = ({ className, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button
        variant="ghost"
        onClick={toggleColorMode}
        className={clsx(className)}
        {...rest}
      >
        {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  )
}

export default ThemeToggle
