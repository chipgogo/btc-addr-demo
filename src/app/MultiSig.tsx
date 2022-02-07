import { ButtonPrimary } from 'components/Button'
import { LinedInput } from 'components/Input'
import { Header2, Header4, Text, TextArea } from 'components/Text'
import { InlineWrapper, Section, Wrapper } from 'components/Wrapper'
import React, { useCallback, useEffect, useState } from 'react'
import { CornerDownRight } from 'react-feather'
import getMultiSigAddress from 'utils/getMultiSigAddress'

export default function MultiSig() {
  const [m, setM] = useState<number>()
  const [n, setN] = useState<number>()
  const [pubKeys, setPubKeys] = useState<string[]>([])
  const [pubKeyInputs, setPubKeyInputs] = useState<React.ReactNode[]>([])
  const [errMsg, setErrMsg] = useState<string>()
  const [address, setAddress] = useState<string>()

  const handleNChange = useCallback(
    (index: number, key: string) => {
      const newPubKeys = [...pubKeys]
      newPubKeys[index] = key
      setPubKeys(newPubKeys)
    },
    [pubKeys]
  )

  const handleClick = useCallback((m?: number, n?: number, publicKeys?: string[]) => {
    setErrMsg(undefined)
    if (!m || !n || !publicKeys) {
      setErrMsg('All fields must be filled')
      // for typechecking
      return undefined
    }
    if (m < 1) setErrMsg('m needs to be at least 1')
    if (n < 2) setErrMsg('n needs to be at least 2')
    if (m >= n) setErrMsg('m needs to be less than n')
    if (publicKeys.length !== n) setErrMsg(`Missing ${n - publicKeys.length} public keys`)
    setAddress(getMultiSigAddress(m, n, publicKeys))
  }, [])

  useEffect(() => {
    if (!n) return
    const inputElements: React.ReactNode[] = []
    for (let i = 0; i < n; i++) {
      inputElements.push(
        <Wrapper key={i} padding="0 0 0.75rem 0">
          <InlineWrapper>
            <CornerDownRight size="12px" color="#a8a8a8" />
            <Wrapper margin="0 0 0 0.25rem" padding="0" width="100%">
              <Text fontWeight="400" fontSize="11px" color="#828a92">
                n<sub>{i + 1}</sub> public key
              </Text>
              <LinedInput
                placeholder="e.g. 02e1...729c"
                textAlign="left"
                width="100%"
                onBlur={(e) => handleNChange(i, e.target.value)}
              />
            </Wrapper>
          </InlineWrapper>
        </Wrapper>
      )
    }
    setPubKeyInputs(inputElements)
  }, [handleNChange, n])

  return (
    <Section>
      <Header2>Multi-sig Addresses</Header2>
      <Wrapper background="#f8f8f8">
        <Header4 padding="0">Get address for an m-of-n bitcoin wallet</Header4>
        <Text padding="0 0 1rem 0">
          Specify m number of required signatures out of n total signatures. You can copy public keys from the HD Wallet section by clicking the key icon.
        </Text>
        <Wrapper padding="0 0 0.75rem 0">
          <Text fontWeight="400" fontSize="11px" color="#828a92">
            m (required signatures)
          </Text>
          <LinedInput placeholder="e.g. 2" textAlign="left" onChange={(e) => setM(parseInt(e.target.value))} />
        </Wrapper>
        <Wrapper padding="0 0 1rem 0">
          <Text fontWeight="400" fontSize="11px" color="#828a92">
            n (total signatures)
          </Text>
          <LinedInput placeholder="e.g. 3" textAlign="left" onChange={(e) => setN(parseInt(e.target.value))} />
        </Wrapper>
        {pubKeyInputs.length > 0 && (
          <>
            {pubKeyInputs.map((ele) => ele)}
            <InlineWrapper justifyContent="space-between">
              <>
                <div>{errMsg && <Text color="#F82D3A">Error: {errMsg}</Text>}</div>
                <ButtonPrimary padding="0.5rem 1rem" onClick={() => handleClick(m, n, pubKeys)}>
                  Get Address
                </ButtonPrimary>
              </>
            </InlineWrapper>
          </>
        )}
        {address && (
          <>
            <Text fontSize="11px" color="#828a92">
              Address
            </Text>
            <TextArea value={address} defaultValue={`Click Generate for your Mnemonic`} margin="0" />
          </>
        )}
      </Wrapper>
    </Section>
  )
}
