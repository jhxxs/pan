import { useState } from "react"
import "./App.css"
import { EditIcon } from "@chakra-ui/icons"
import { Button, ChakraProvider, Code, Icon, Stack } from "@chakra-ui/react"
import { ImGithub } from "react-icons/im"
import Pan from "./components/Pan"
import ThemeToggle from "./components/ThemeToggle"
import { formatExample } from "./utils/constants"
import theme from "./utils/theme"

const geItem = () => ({ id: crypto.randomUUID() })

function App() {
  // console.log("render")
  const [list, setList] = useState(Array.from({ length: 3 }, () => geItem()))

  function add() {
    setList((s) => {
      // console.log("add", s)
      return [...s, geItem()]
    })
  }

  function viewSource() {
    open("https://github.com/jhxxs/pan", "_blank")
  }

  function handleDelete(id: string) {
    setList((s) => s.filter((v) => v.id !== id))
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="px-24px pb-24px">
        <div className="flex justify-between items-center h-60px mb-16px">
          <h1 className="font-bold">Pan Decoder</h1>
          <div>
            <Button variant="ghost" onClick={viewSource}>
              <Icon as={ImGithub} />
            </Button>
            <ThemeToggle ml=".5rem" />
          </div>
        </div>

        <ul>
          <li className="text-sm mb-16px break-all">
            1. 输入格式为 <Code>{formatExample}</Code> , 或点击输入框右侧的{" "}
            <Code className="!inline-flex items-center h-20px justify-center ">
              <EditIcon fontSize="12px" marginX=".1rem" />
            </Code>{" "}
            直接进行粘贴。
          </li>
          <li className="text-sm mb-16px">
            2. 点击解析后生成的🔗会自动复制密码并跳转到分享页
          </li>
        </ul>

        <Stack mb="2rem" spacing="1rem">
          {list.map(({ id }, index) => (
            <Pan
              key={id}
              onDelete={() => handleDelete(id)}
              isDeleteDisabled={list.length <= 1 && index == 0}
            />
          ))}
        </Stack>

        {list.length < 8 && (
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
