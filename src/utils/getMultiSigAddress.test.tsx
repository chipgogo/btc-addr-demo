import getMultiSigAddress from './getMultiSigAddress'

describe('getMultiSigAddress utility function', () => {
  const publicKeys = [
    '0242e6843422e71abb819b92c09bb3954de167f37515cd20585870609da56e8785',
    '032a2bd7f8d5eef3e6f2e9873395c53950f6bc4e227958054cc998866a0ce4ee05',
    '0243b409880810c66b7ea0a3d3dabbde144fb2b637f30519a6092c49771f72f075',
  ]
  it('Should return the correct address', () => {
    expect(getMultiSigAddress(2, 3, publicKeys)).toStrictEqual('3CwDTAbxQ9vUEyv1eunfkH5JMDjL1jgNnV')
  })

  it('Should catch and return error message', () => {
    expect(getMultiSigAddress(4, 3, publicKeys)).toStrictEqual('Pubkey count cannot be less than m')
    expect(getMultiSigAddress(2, 3, [publicKeys[0], publicKeys[1]])).toStrictEqual('Pubkey count mismatch')
    expect(getMultiSigAddress(2, 3, [publicKeys[0], publicKeys[1]])).toStrictEqual('Pubkey count mismatch')
    expect(getMultiSigAddress(3, 3, [publicKeys[0], publicKeys[1]])).toStrictEqual('Pubkey count mismatch')
  })
})
