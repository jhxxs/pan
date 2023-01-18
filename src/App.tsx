import { useState } from "react"
import "./App.css"

import { ChakraProvider, Button } from "@chakra-ui/react"
import theme from "./utils/theme"
import ThemeToggle from "./components/ThemeToggle"
import { css } from "@linaria/core"
import Pan from "./components/Pan"

function App() {
  const [count, setCount] = useState(0)

  const [list, setList] = useState(
    Array.from(
      {
        length: 3
      },
      () => ({
        id: crypto.randomUUID()
      })
    )
  )

  return (
    <ChakraProvider theme={theme}>
      <div
        className={css`
          padding: 0 24px;
        `}
      >
        <div
          className={css`
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            /* padding: 0 24px; */
          `}
        >
          <ThemeToggle />
        </div>

        {list.map(({ id }) => (
          <Pan key={id} />
        ))}
      </div>
    </ChakraProvider>
  )
}

export default App
