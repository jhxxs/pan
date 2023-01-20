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

const Pan: React.FC<{
  isDeleteDisabled?: boolean
  onDelete?: () => void
}> = (props) => {
  const toast = useToast()

  const [value, setValue] = useState("")

  async function readText() {
    let text = ""
    try {
      // const permission =
      await navigator.permissions.query({
        // @ts-expect-error
        name: "clipboard-read"
      })
      // if (permission.state === "denied") {
      //   toast({
      //     title: "浏览器不让读取粘贴板🥲",
      //     status: "warning",
      //     isClosable: true,
      //     position: "top"
      //   })
      // }
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
      <div className="flex gap-8px items-center mb-1.5rem">
        <InputGroup size="md">
          <Input
            placeholder="分享代码"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            pr="5rem"
            py="1.4rem"
          />

          <InputRightElement height="full" w="auto" right="0.5rem">
            <ButtonGroup gap={0}>
              {value && (
                <Button
                  className="!p-0"
                  size="sm"
                  onClick={() => setValue("")}
                  variant="ghost"
                >
                  <CloseIcon fontSize="10px" />
                </Button>
              )}
              <Button
                className="!ml-0"
                ml={0}
                padding={0}
                size="sm"
                onClick={pasteText}
                variant="ghost"
              >
                <EditIcon />
              </Button>
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
        <Button
          disabled={props.isDeleteDisabled}
          variant="ghost"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </Button>
      </div>
    </>
  )
}

export default Pan
