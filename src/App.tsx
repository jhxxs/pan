import { useState } from "react"
import "./App.css"

import { ChakraProvider, Button, useToast } from "@chakra-ui/react"
import theme from "./utils/theme"
import ThemeToggle from "./components/ThemeToggle"
import Pan from "./components/Pan"
import { Icon } from "@chakra-ui/react"
import { ImGithub } from "react-icons/im"

function geItem() {
  return {
    id: crypto.randomUUID()
  }
}

function App() {
  const [list, setList] = useState(Array.from({ length: 3 }, () => geItem()))

  function add() {
    setList((s) => [...s, geItem()])
  }

  function viewSource() {
    open("https://github.com/jhxxs/pan", "_blank")
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="px-24px pb-24px">
        <div className="flex justify-between items-center h-60px mb-16px">
          <h1>百度云盘</h1>
          <div>
            <Button variant="ghost" onClick={viewSource}>
              <Icon as={ImGithub} />
            </Button>
            <ThemeToggle ml=".5rem" />
          </div>
        </div>

        {list.map(({ id }) => (
          <Pan key={id} />
        ))}

        {list.length < 5 && (
          <Button
            width="full"
            variant="outline"
            borderStyle="dashed"
            onClick={add}
            fontSize="smaller"
          >
            追加一项
          </Button>
        )}
      </div>
    </ChakraProvider>
  )
}

export default App
