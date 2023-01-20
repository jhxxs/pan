import { useCallback, useState } from "react"
import "./App.css"

import {
  ChakraProvider,
  Button,
  useToast,
  Alert,
  AlertIcon,
  Code
} from "@chakra-ui/react"
import theme from "./utils/theme"
import ThemeToggle from "./components/ThemeToggle"
import Pan from "./components/Pan"
import { Icon } from "@chakra-ui/react"
import { ImGithub } from "react-icons/im"
import { EditIcon } from "@chakra-ui/icons"

function geItem() {
  return {
    id: crypto.randomUUID()
  }
}

function App() {
  console.log("render")
  const [list, setList] = useState(Array.from({ length: 3 }, () => geItem()))

  function add() {
    setList((s) => {
      console.log("add", s)
      return [...s, geItem()]
    })
  }

  function viewSource() {
    open("https://github.com/jhxxs/pan", "_blank")
  }

  const handleDelete = useCallback((index: number) => {
    // console.log("onDelete", index)

    setList((s) => {
      console.log("de", s)
      const next = s.slice(index + 1)
      if (index <= 0) return next
      const prev = s.slice(0, index)
      return [...prev, ...next]
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <div className="px-24px pb-24px">
        <div className="flex justify-between items-center h-60px mb-16px">
          <h1>Pan Decoder</h1>
          <div>
            <Button variant="ghost" onClick={viewSource}>
              <Icon as={ImGithub} />
            </Button>
            <ThemeToggle ml=".5rem" />
          </div>
        </div>

        <p className="text-sm mb-16px">
          输入分享地址，格式为 <Code>abcdefg-xyzm</Code> , 或点击输入框右侧的{" "}
          <Code className="!inline-flex items-center h-20px justify-center ">
            <EditIcon fontSize="12px" />
          </Code>{" "}
          直接进行粘贴。
        </p>

        {list.map(({ id }, index) => (
          <Pan key={id} onDelete={() => handleDelete(index)} />
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
