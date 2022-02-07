import { ButtonPrimary } from 'components/Button'
import { LinedInput } from 'components/Input'
import { Header2, Header4, Text, TextArea } from 'components/Text'
import { InlineWrapper, Section, Wrapper } from 'components/Wrapper'
import React, { useCallback, useEffect, useState } from 'react'
import { CornerDownRight } from 'react-feather'
import getMultiSigAddress from 'utils/getMultiSigAddress'

interface MultiSigInfo {
  m: number
  n: number
  pubKeys: string[]
}

/**
 * MultiSig section of the app. With m, n and pubkeys, generates an address
 */
export default function MultiSig() {
  const [multiSigInfo, setMultiSigInfo] = useState<MultiSigInfo>({ m: 0, n: 0, pubKeys: [] })
  const [pubKeyInputs, setPubKeyInputs] = useState<React.ReactNode[]>([])
  const [address, setAddress] = useState<string>()

  const onMNChange = (m: number, n: number) => {
    setMultiSigInfo((prev) => {
      if (isNaN(n) || isNaN(m)) return { ...prev }
      const toRemove = prev.n - n
      // if n changes then we need to remove prev - n keys
      if (toRemove > 0) {
        const start = prev.n - 1
        for (let i = start; i > start - toRemove; i--) {
          prev.pubKeys[i] = ''
        }
      }
      return { m, n, pubKeys: prev.pubKeys }
    })
  }

  const onPubKeyChange = (index: number, pubKey: string) => {
    setMultiSigInfo((prev) => {
      const newPubKeys = [...prev.pubKeys]
      newPubKeys[index] = pubKey
      return { ...prev, pubKeys: newPubKeys }
    })
  }

  const onClick = useCallback((m?: number, n?: number, publicKeys?: string[]) => {
    if (!m || !n || !publicKeys) return
    setAddress(getMultiSigAddress(m, n, publicKeys))
  }, [])

  // Renders the public key fields based on the number of n keys
  useEffect(() => {
    if (!multiSigInfo.n) return
    const inputElements: React.ReactNode[] = []
    for (let i = 0; i < multiSigInfo.n; i++) {
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
                onBlur={(e) => onPubKeyChange(i, e.target.value)}
              />
            </Wrapper>
          </InlineWrapper>
        </Wrapper>
      )
    }
    setPubKeyInputs(inputElements)
  }, [multiSigInfo.n])

  return (
    <Section>
      <Header2>Multi-sig Addresses</Header2>
      <Wrapper background="#f8f8f8">
        <Header4 padding="0">Get address for an m-of-n bitcoin wallet</Header4>
        <Text padding="0 0 1rem 0">
          Specify m number of required signatures out of n total signatures. You can copy public keys from the HD Wallet
          section by clicking the key icon.
        </Text>
        <Wrapper padding="0 0 0.75rem 0">
          <Text fontWeight="400" fontSize="11px" color="#828a92">
            m (required signatures)
          </Text>
          <LinedInput
            placeholder="e.g. 2"
            textAlign="left"
            onChange={(e) => onMNChange(parseInt(e.target.value), multiSigInfo.n)}
          />
        </Wrapper>
        <Wrapper padding="0 0 1rem 0">
          <Text fontWeight="400" fontSize="11px" color="#828a92">
            n (total signatures)
          </Text>
          <LinedInput
            placeholder="e.g. 3"
            textAlign="left"
            onChange={(e) => onMNChange(multiSigInfo.m, parseInt(e.target.value))}
          />
        </Wrapper>
        {pubKeyInputs.length > 0 && (
          <>
            {pubKeyInputs.map((ele) => ele)}
            <InlineWrapper justifyContent="space-between">
              <>
                <div />
                <ButtonPrimary
                  padding="0.5rem 1rem"
                  onClick={() => onClick(multiSigInfo.m, multiSigInfo.n, multiSigInfo.pubKeys)}
                >
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
            <TextArea value={address} readOnly placeholder={`Click Generate for your Mnemonic`} margin="0" />
          </>
        )}
      </Wrapper>
    </Section>
  )
}
