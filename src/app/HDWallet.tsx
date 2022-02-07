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

/**
 * Component for generating Bitcoin HD Segwit Addresses
 * Can manually enter a path and add additional wallets
 */
export default function HDWallet() {
  const [segwitType, setSegwitType] = useState<'P2SH' | 'Native'>('P2SH')
  const [extra, setExtra] = useState<number>(0)
  const [path, setPath] = useState<string>()
  // state for if user wants to enter path manually
  const [pathType, setPathType] = useState<'select' | 'write'>('select')
  const [addresses, setAddresses] = useState<string[][]>()
  const [seed, setSeed] = useState<string>()

  const _getAddresses = () => {
    let result: string[][] | undefined
    if (pathType === 'select') {
      if (segwitType === 'P2SH') {
        result = getAddresses(seed, `m/49'/0'/0'/0/0`, extra)
      } else {
        result = getAddresses(seed, `m/84'/0'/0'/0/0`, extra)
      }
    } else {
      result = getAddresses(seed, path, extra)
    }
    setAddresses(result)
  }

  const handleHDClick = () => {
    _getAddresses()
    setExtra((prev) => prev + 1)
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
              checked={pathType === 'select'}
              onChange={() => setPathType('select')}
            />
            <Text padding="0 0 0 0.25rem">Address Type</Text>
          </InlineWrapper>
          <InlineWrapper padding="0 0 0 1rem" justifyContent="left" alignItems="center">
            <input
              type="radio"
              value="write"
              name="path"
              checked={pathType === 'write'}
              onChange={() => setPathType('write')}
            />
            <Text padding="0 0 0 0.25rem">Specify Path</Text>
          </InlineWrapper>
        </InlineWrapper>
        <InlineWrapper justifyContent="space-between" padding="0 0 1rem 0">
          {pathType === 'select' && (
            <TabContainer>
              <TabItem onClick={() => setSegwitType('P2SH')} active={segwitType === 'P2SH'}>
                <Text fontWeight="500" color={segwitType === 'P2SH' ? '#FFF' : '#262A41'}>
                  SegWit (P2SH)
                </Text>
              </TabItem>
              <TabItem onClick={() => setSegwitType('Native')} active={segwitType === 'Native'}>
                <Text fontWeight="500" color={segwitType === 'Native' ? '#FFF' : '#262A41'}>
                  Native SegWit (bech32)
                </Text>
              </TabItem>
            </TabContainer>
          )}
          {pathType === 'write' && (
            <LinedInput placeholder="m/49'/0'/0'/0/0" textAlign="right" onChange={(e) => setPath(e.target.value)} />
          )}
          <ButtonPrimary padding="0.5rem 2rem" onClick={handleHDClick}>
            +
          </ButtonPrimary>
        </InlineWrapper>
        {addresses?.length !== 0 && <Divider borderColor="#ccc" margin="0 0 0.5rem 0" />}
        {addresses?.map(([thisPath, thisAddress, key]) => (
          <InlineWrapper justifyContent="space-between" padding="0 0 0.5rem 0">
            <Text>{thisPath}</Text>
            <InlineWrapper margin="0">
              <Text padding="0 1rem 0 0">{thisAddress}</Text>
              <Copy toCopy={key}>
                <InlineWrapper background="#262A41" margin="0" padding="0.25rem" borderRadius="6px" alignItems="center">
                  <Key size="16" color="#FFF" />
                </InlineWrapper>
              </Copy>
            </InlineWrapper>
          </InlineWrapper>
        ))}
      </Wrapper>
    </Section>
  )
}
