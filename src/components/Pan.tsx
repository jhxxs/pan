import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Button,
  ButtonGroup,
  Input,
  InputAddon,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react"
import { useState } from "react"

const Pan: React.FC<{}> = (props) => {
  const toast = useToast()

  const [value, setValue] = useState("")

  async function readText() {
    let text = ""
    try {
      const permission = await navigator.permissions.query({
        // @ts-expect-error
        name: "clipboard-read"
      })
      if (permission.state === "denied") {
        toast({
          title: "浏览器不让读取粘贴板🥲",
          status: "warning",
          isClosable: true,
          position: "top"
        })
      }
      const clipboardContents = await navigator.clipboard.read()

      for (const item of clipboardContents) {
        if (item.types.includes("text/plain")) {
          const blob = await item.getType("text/plain")
          text = await blob.text()
          console.log("🚀 ~ file: Pan.tsx:39 ~ pasteText ~ text", text)
          break
        }
      }
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        isClosable: true,
        position: "top"
      })
    }

    return text
  }

  function pasteText() {
    readText().then((s) => setValue(s))
  }

  return (
    <>
      <InputGroup size="md" mb="1.5rem">
        <Input
          placeholder="请输入云盘分享地址，形如123abcdefg-mxht"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          pr="7.5rem"
        />

        <InputRightElement className="!w-auto !right-1rem">
          <ButtonGroup>
            <Button size="sm" onClick={() => setValue("")}>
              <CloseIcon />
            </Button>
            <Button size="sm" onClick={pasteText}>
              <EditIcon />
            </Button>
          </ButtonGroup>
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default Pan
