import { useEffect, useState } from 'react'
import { Wrapper } from 'components/Wrapper'
import { Text } from 'components/Text'

interface CopyHelperProps {
  toCopy: string
  children?: React.ReactNode
}

export default function Copy({ toCopy, children }: CopyHelperProps) {
  const [isCopied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(toCopy)
    setCopied(true)
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setCopied(false)
    }, 1250)

    return () => {
      clearTimeout(timeId)
    }
  }, [isCopied])

  return (
    <Wrapper onClick={handleCopy} margin="0" padding="0">
      {isCopied ? <Text fontSize="10px">Copied</Text> : <>{children}</>}
    </Wrapper>
  )
}
