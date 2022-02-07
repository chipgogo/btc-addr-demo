import * as bitcoin from 'bitcoinjs-lib'

/**
 * Get a m-of-n bitcoin address
 * @param {number} m required signatures
 * @param {number} n total signatures
 * @param {string[]} pubKeys public keys in strings
 * @returns {string | undefined} address
 */
export default function getMultiSigAddress(m: number, n: number, pubKeys: string[]): string | undefined {
  try {
    // Filter out empty strings from blank input fields
    const pubKeyBuffers: Buffer[] = pubKeys
      .filter((pubKey) => pubKey.length > 0)
      .map((pubKey) => Buffer.from(pubKey, 'hex'))
    const address = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({ m, n, pubkeys: pubKeyBuffers }),
    }).address
    return address
  } catch (e) {
    if (e instanceof Error) {
      return e.message
    }
  }
}
