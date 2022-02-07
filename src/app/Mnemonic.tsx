import { ButtonPrimary } from 'components/Button'
import Dropdown from 'components/Dropdown'
import { LinedInput } from 'components/Input'
import { Header2, Header4, Text, TextArea } from 'components/Text'
import { InlineWrapper, Section, Wrapper } from 'components/Wrapper'
import { useState } from 'react'
import getSeed, { getMnemonic, getEntropy } from 'utils/getSeed'

/*
 * Generate mnemonic, can choose from 12, 15, 18, 21, 24 words
 */
export default function Mnemonic() {
  const [mnemonic, setMnemonic] = useState<string>()
  const [seed, setSeed] = useState<string>()
  const [entropy, setEntropy] = useState<number>(128)
  const [password, setPassword] = useState<string>()

  // handles error
  const handleMnemonic = (phrase: string) => {
    setMnemonic(phrase)
  }

  const onDropdownSelect = (words: string) => {
    // words is formatted as "{num} words"
    const numWords: number = parseInt(words.split(' ')[0])
    const entropy = getEntropy(numWords)
    setEntropy(entropy)
  }

  const onGetMnemonic = (entropy: number) => {
    const mnemonicPhrase = getMnemonic(entropy)
    setMnemonic(mnemonicPhrase)
  }

  const onGetSeed = (mnemonicPhrase: string) => {
    const mnemonicSeed = getSeed(mnemonicPhrase, password)
    setSeed(mnemonicSeed)
  }

  return (
    <Section>
      <Header2>Mnemonic</Header2>
      <Wrapper background="#f8f8f8">
        <Header4 margin="0 0 1rem 0">Generate Mnemonic</Header4>
        <InlineWrapper justifyContent="space-between">
          <Dropdown items={['12 words', '15 words', '18 words', '21 words', '24 words']} callback={(selected) => onDropdownSelect(selected)} />
          <ButtonPrimary onClick={() => onGetMnemonic(entropy)} padding="0.5rem 2rem">
            Get Mnemonic
          </ButtonPrimary>
        </InlineWrapper>
        <Wrapper padding="1rem 0 0 0">
          <Text fontSize="11px" color="#828a92">
            Mnemonic
          </Text>
          <TextArea
            onBlur={(e) => handleMnemonic(e.target.value)}
            defaultValue={mnemonic}
            placeholder={`Click Generate for your Mnemonic`}
            margin="0"
          />
        </Wrapper>
        {mnemonic && (
          <Wrapper padding="1rem 0 0 0">
            <Header4>Generate a seed from mnemonic and password (optional)</Header4>
            <InlineWrapper padding="0 0 1rem 0" justifyContent="space-between">
              <Wrapper margin="0" padding="1rem 0">
                <Text fontSize="11px" color="#828a92">
                  Password (optional)
                </Text>
                <LinedInput
                  placeholder="e.g. helloworld"
                  textAlign="left"
                  padding="0.5rem 0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Wrapper>
              <ButtonPrimary onClick={() => onGetSeed(mnemonic)} padding="0.5rem 2rem">
                Get Seed
              </ButtonPrimary>
            </InlineWrapper>
          </Wrapper>
        )}
        {seed && (
          <>
            <Text fontSize="11px" color="#828a92">
              Mnemonic Seed
            </Text>
            <TextArea value={seed} readOnly margin="0 0 1rem 0" />
          </>
        )}
      </Wrapper>
    </Section>
  )
}
