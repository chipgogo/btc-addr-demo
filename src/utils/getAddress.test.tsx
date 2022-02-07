import getAddress, { getAddrAndPubKey } from './getAddress'

describe('getAddrAndPubKey utility function', () => {
  const address =
    'c2b9c7a73871234a5dc39689ee33e7ef30621a41e39b8524c25f1b3e49c2e8c64099833602c2dcd4af253c60c7ac46be87861612ea7cc5b4c7c38062407b6721'
  const bip49Path = `m/49'/0'/0'/0/0`
  const bip84Path = `m/84'/0'/0'/0/0`

  it('With BIP49 path and seed, correct address is returned', () => {
    expect(getAddrAndPubKey(address, bip49Path)).toStrictEqual([
      `342163NEPv3qBprREGD9Pg2BjonFPEHy7W`,
      `0242e6843422e71abb819b92c09bb3954de167f37515cd20585870609da56e8785`,
    ])
  })

  it('With BIP84 path and seed, correct address is returned', () => {
    expect(getAddrAndPubKey(address, bip84Path)).toStrictEqual([
      `bc1qsqcarhnq2hmcpy4377hjvvp2kmg3p83nswjzlc`,
      `03fcb80a690ac9a30e887e851d981a7971c436643cfc5304ce3d27b8c2cb9980ba`,
    ])
  })
})

describe('getAddress utility function', () => {
  const address =
    'c2b9c7a73871234a5dc39689ee33e7ef30621a41e39b8524c25f1b3e49c2e8c64099833602c2dcd4af253c60c7ac46be87861612ea7cc5b4c7c38062407b6721'
  const bip49Path = `m/49'/0'/0'/0/0`
  it('should return [path, address, publicKey]', () => {
    expect(getAddress(address, bip49Path, 0)).toStrictEqual([
      [
        `m/49'/0'/0'/0/0`,
        `342163NEPv3qBprREGD9Pg2BjonFPEHy7W`,
        `0242e6843422e71abb819b92c09bb3954de167f37515cd20585870609da56e8785`,
      ],
    ])
  })

  it('should return the right number of results when incremented', () => {
    expect(getAddress(address, bip49Path, 3)).toHaveLength(1 + 3)
  })
})
