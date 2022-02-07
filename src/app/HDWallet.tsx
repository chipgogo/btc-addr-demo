import { ButtonPrimary } from 'components/Button'
import Copy from 'components/Copy'
import { LinedInput } from 'components/Input'
import { Header2, Header4, Text, TextArea } from 'components/Text'
import { Divider, InlineWrapper, Section, Wrapper } from 'components/Wrapper'
import { useState } from 'react'
import { Key } from 'react-feather'
import styled from 'styled-components'
import getAddresses from 'utils/getAddress'

const TabContainer = styled.div`
  display: flex;
  align-items: center;
`

const TabItem = styled.div<{ active?: boolean }>`
  background: ${({ theme, active }) => (active ? `${theme.colors.secondary1}` : '#fff')};
  padding: 0.5rem;
  border: ${({ theme }) => `1px solid ${theme.colors.secondary1}`};
  cursor: pointer;
`

type PathType = 'select' | 'write'
type SegWitType = 'P2SH' | 'Native'

interface PathInfo {
  pathType: PathType
  segWitType?: SegWitType
  path?: string
}

/**
 * HD Wallet Section. Generate Bitcoin HD Segwit Addresses.
 * Can manually enter a path and add additional wallets
 */
export default function HDWallet() {
  const [pathInfo, setPathInfo] = useState<PathInfo>({
    pathType: 'select',
    segWitType: 'P2SH',
    path: `m/49'/0'/0'/0/0`,
  })
  const [extra, setExtra] = useState<number>(0)
  const [addresses, setAddresses] = useState<string[][]>()
  const [seed, setSeed] = useState<string>()
  const [errMsg, setErrMsg] = useState<string>()

  const _getAddresses = () => {
    const result = getAddresses(seed, pathInfo.path, extra)
    if (!result) {
      setErrMsg(
        `Invalid Path: Must be a valid Nested SegWit (m/49'/0'/0'/0/0) or Native SegWit (m/84'/0'/0'/0/0) address`
      )
    } else {
      setAddresses(result)
      setErrMsg(undefined)
    }
  }

  const onGenClick = () => {
    _getAddresses()
    setExtra((prev) => prev + 1)
  }

  const onPathChange = (pathType: PathType, segWitType?: SegWitType, inputPath?: string) => {
    setPathInfo({
      pathType,
      segWitType: segWitType && segWitType,
      path: inputPath ? inputPath : segWitType === 'P2SH' ? `m/49'/0'/0'/0/0` : `m/84'/0'/0'/0/0`,
    })
    setExtra(0)
  }

  return (
    <Section>
      <Header2>Bitcoin HD Wallet</Header2>
      <Wrapper background="#f8f8f8">
        <Header4>Derivation</Header4>
        <Text padding="0 0 1rem 0">
          Enter a mnemonic seed and path by either selecting an address type or manual path input
        </Text>
        <Text fontSize="11px" color="#828a92">
          Mnemonic seed
        </Text>
        <TextArea placeholder={`Enter a mnemonic seed`} onChange={(e) => setSeed(e.target.value)} margin="0 0 1rem 0" />
        <InlineWrapper padding="0 0 1rem 0" justifyContent="left" alignItems="left">
          <InlineWrapper padding="0" justifyContent="left" alignItems="center">
            <input
              type="radio"
              value="select"
              name="path"
              checked={pathInfo.pathType === 'select'}
              onChange={() => onPathChange('select', pathInfo.segWitType)}
            />
            <Text padding="0 0 0 0.25rem">Address Type</Text>
          </InlineWrapper>
          <InlineWrapper padding="0 0 0 1rem" justifyContent="left" alignItems="center">
            <input
              type="radio"
              value="write"
              name="path"
              checked={pathInfo.pathType === 'write'}
              onChange={() => onPathChange('write', pathInfo.segWitType, pathInfo.path)}
            />
            <Text padding="0 0 0 0.25rem">Specify Path</Text>
          </InlineWrapper>
        </InlineWrapper>
        <InlineWrapper justifyContent="space-between" padding="0 0 1rem 0">
          {pathInfo.pathType === 'select' && (
            <TabContainer>
              <TabItem onClick={() => onPathChange('select', 'P2SH')} active={pathInfo?.segWitType === 'P2SH'}>
                <Text fontWeight="500" color={pathInfo?.segWitType === 'P2SH' ? '#FFF' : '#262A41'}>
                  Nested SegWit (P2SH)
                </Text>
              </TabItem>
              <TabItem onClick={() => onPathChange('select', 'Native')} active={pathInfo?.segWitType === 'Native'}>
                <Text fontWeight="500" color={pathInfo?.segWitType === 'Native' ? '#FFF' : '#262A41'}>
                  Native SegWit (bech32)
                </Text>
              </TabItem>
            </TabContainer>
          )}
          {pathInfo.pathType === 'write' && (
            <div>
              <Text fontSize="11px" color="#828a92">
                Derivation Path
              </Text>
              <LinedInput
                defaultValue={pathInfo.path}
                textAlign="left"
                onChange={(e) => onPathChange('write', pathInfo.segWitType, e.target.value)}
              />
            </div>
          )}
          <ButtonPrimary padding="0.5rem 2rem" onClick={onGenClick}>
            +
          </ButtonPrimary>
        </InlineWrapper>
        {errMsg ? (
          <Text color="#F82D3A">{errMsg}</Text>
        ) : (
          <>
            <Divider borderColor="#ccc" margin="0 0 0.5rem 0" />
            {addresses &&
              addresses.map(([thisPath, thisAddress, key], i) => (
                <InlineWrapper key={i} justifyContent="space-between" padding="0 0 0.5rem 0">
                  <Text>{thisPath}</Text>
                  <InlineWrapper margin="0">
                    <Text padding="0 1rem 0 0">{thisAddress}</Text>
                    <Copy toCopy={key}>
                      <InlineWrapper
                        background="#262A41"
                        margin="0"
                        padding="0.25rem"
                        borderRadius="6px"
                        alignItems="center"
                      >
                        <Key size="16" color="#FFF" />
                      </InlineWrapper>
                    </Copy>
                  </InlineWrapper>
                </InlineWrapper>
              ))}
          </>
        )}
      </Wrapper>
    </Section>
  )
}
