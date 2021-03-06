import * as bip39 from 'bip39'

/**
 * Get entropy in bits
 * @param {number} numWords number of words in seed phrase
 * @returns {number} number of bits
 */
export function getEntropy(numWords: number): number {
  // 3 words = 32 bits
  return (numWords / 3) * 32
}

/**
 * Get a mnemonic phrase given bits of entropy
 * @param {number} entropy bits of entropy
 * @returns {string} mnemonic phrase
 */
export function getMnemonic(entropy: number): string {
  // Uses crypto.randomBytes
  const mnemonicPhrase = bip39.generateMnemonic(entropy)
  return mnemonicPhrase
}

/**
 * Get a mnemonic seed from mnemonic and password (optional)
 * @param {string} mnemonic a space separated mnemonic phrase
 * @param {string} password an optional password
 * @returns {string} a mnemonic seed in hex without 0x prefix
 */
export default function getSeed(mnemonic: string, password?: string): string {
  const mnemonicSeed = bip39.mnemonicToSeedSync(mnemonic, password)
  return mnemonicSeed.toString('hex')
}
