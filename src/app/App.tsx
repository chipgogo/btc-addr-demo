import { Header1, Text } from 'components/Text'
import { BodyWrapper, PageWrapper } from 'components/Wrapper'
import HDWallet from './HDWallet'
import Mnemonic from './Mnemonic'
import MultiSig from './MultiSig'

export default function App() {
  return (
    <>
      <BodyWrapper>
        <PageWrapper>
          <Header1>Bitcoin Address Demo</Header1>
          <Text>
            A demo to test bitcoin SegWit HD and multi-sig addresses. You can use outputs from one section to the next
            for a smoother experience.
          </Text>
          <Mnemonic />
          <HDWallet />
          <MultiSig />
        </PageWrapper>
      </BodyWrapper>
    </>
  )
}
