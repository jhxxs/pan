import { EditIcon } from "@chakra-ui/icons"
import {
  Button,
  Input,
  InputAddon,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react"

const Pan: React.FC<{}> = (props) => {
  return (
    <>
      <InputGroup size="md" mb="1.5rem">
        <Input
          pr="4.5rem"
          placeholder="请输入云盘分享地址，形如123abcdefg-mxht"
        />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem">
            <EditIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default Pan
