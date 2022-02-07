import getSeed, { getEntropy, getMnemonic } from './getSeed'

describe('getEntropy utility function', () => {
  it('Should be divisible by 32', () => {
    expect(getEntropy(18) % 32).toStrictEqual(0)
  })

  it('Should return 128 for 12 words', () => {
    expect(getEntropy(12)).toStrictEqual(128)
  })
})

describe('getMnemonic utility function', () => {
  it('Should return return the right number of words', () => {
    expect(getMnemonic((24 / 3) * 32).split(' ').length).toStrictEqual(24)
  })

  it('Should fail if invalid entropy', () => {
    expect(() => getMnemonic(177)).toThrowError(TypeError)
    expect(() => getMnemonic(177)).toThrow('Invalid entropy')
  })
})

describe('getSeed utility function', () => {
  const mnemonic =
    'whale cattle fee wide damage wonder method they crouch west recycle evidence figure key butter chair virus violin tray horse flat juice genre movie'
  const password = 'helloworld'
  const expectedSeedNoPw =
    '35480e29e635e3afccbf5e4d6ad53de69a7b9939606c4b9339c92411d00425116c3a98758aea8601a2eb085fd35a14725578b86f31247c7c44d044a89ed14fa7'
  const expectedSeedWithPw =
    '7419c2333c56644254ac8ed944779b4d406ee31020ca00b87be5d04edad72ce2325f9e892da0d41bca8d53d96fa9dc98aa05889679c3bf593b5ce4b5923e43ce'
  it('Should return the correct seed', () => {
    expect(getSeed(mnemonic)).toStrictEqual(expectedSeedNoPw)
  })

  it('Should return the correct seed with an empty string password', () => {
    expect(getSeed(mnemonic, '')).toStrictEqual(expectedSeedNoPw)
  })

  it('Should return the correct seed with password', () => {
    expect(getSeed(mnemonic, password)).toStrictEqual(expectedSeedWithPw)
  })
})
