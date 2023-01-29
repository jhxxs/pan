import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon
} from "@chakra-ui/icons"
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useClipboard,
  useToast
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { formatExample, panHost } from "../utils/constants"
import { useCopyToClipboard } from "react-use"

const Pan: React.FC<{
  isDeleteDisabled?: boolean
  onDelete?: () => void
}> = (props) => {
  const toast = useToast()
  const [, copy] = useCopyToClipboard()

  const [value, setValue] = useState("")

  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")

  const url = useMemo(
    () => `${panHost}${code || ""}#${password}`,
    [code, password]
  )

  async function readText() {
    return new Promise<string>(async (resolve, reject) => {
      let text = ""
      try {
        await navigator.permissions.query({
          // @ts-expect-error
          name: "clipboard-read"
        })

        const clipboardContents = await navigator.clipboard.read()

        for (const item of clipboardContents) {
          if (item.types.includes("text/plain")) {
            const blob = await item.getType("text/plain")
            text = await blob.text()
            // console.log("get copied text:", text)
            return resolve(text)
          }
        }

        reject()
      } catch (error) {
        toast({
          title: "粘贴失败，手动输入吧🤡",
          status: "error",
          position: "top",
          isClosable: true
        })
        reject()
      }
    })
  }

  function pasteText() {
    readText().then((s) => setValue(s))
  }

  useEffect(() => {
    if (value) {
      if (value.match(/^[a-zA-Z0-9_-]+-[a-zA-Z0-9]{4}$/g)) {
        const index = value.lastIndexOf("-")

        setCode(value.slice(0, index))
        setPassword(value.slice(index + 1))
      } else {
        toast.closeAll()
        toast({
          title: `格式不对，请输入${formatExample}这样格式的字符串`,
          status: "info",
          position: "top",
          isClosable: true
        })

        setCode("")
        setPassword("")
      }
    } else {
      setCode("")
      setPassword("")
    }
  }, [value])

  return (
    <>
      <div className="flex gap-8px items-center">
        <InputGroup size="md">
          <Input
            placeholder="分享代码"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
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
          isDisabled={props.isDeleteDisabled}
          variant="ghost"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </Button>
      </div>
      {code && password && (
        <Alert status="success">
          <AlertIcon />
          <Link
            className="break-all"
            isExternal
            href={url}
            onClick={(e) => {
              e.preventDefault()
              const toastId = toast({
                title: "密码已粘贴",
                status: "success",
                position: "top"
              })
              copy(password)
              setTimeout(() => {
                window.open(url, "_blank")
                toast.close(toastId)
              }, 250)
            }}
          >
            <span>{`${panHost}${code}#${password}`}</span>
            <ExternalLinkIcon mx=".5rem" />
          </Link>
        </Alert>
      )}
    </>
  )
}

export default Pan
