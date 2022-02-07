import * as bip32 from 'bip32'
import * as bitcoin from 'bitcoinjs-lib'

/**
 * Get a bIP49 or BIP84 address and public key
 * @param {string} seed mnemonic seed
 * @param {string} path a valid BIP49 or BIP84 derivation path
 * @returns {string[] | undefined} [address, publicKey] or undefined if purpose is not valid
 */
export function getAddrAndPubKey(seed: string, path: string): [string, string] | undefined {
  var seedBuffer = Buffer.from(seed, 'hex');
  const root = bip32.fromSeed(seedBuffer, bitcoin.networks.bitcoin)

  const pathArr = path.split('/')
  const purpose = pathArr[1]
  const child = root.derivePath(path)

  let address: string | undefined
  if (purpose === `49'`) {
    address = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({
        pubkey: child.publicKey,
      }),
    }).address
  } else if (purpose === `84'`) {
    address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey }).address
  }
  
  if (address) {
    return [address, child.publicKey.toString('hex')]
  }
}

/**
 * Get addresses and public keys from a seed and path. Derivation of indexes starts from path and increments to extra.
 * @param {string} seed mnemonic seed
 * @param {string} path a valid BIP49 or BIP84 derivation path
 * @param {string} extra a number of extra results to derive from the index in path
 * @returns {string[] | undefined} [path, address, publicKey] or undefined
 */
export default function getAddresses(seed?: string, path?: string, extra: number = 0): string[][] | undefined {
  if (!seed || !path || path.length < 15) return
  const addrs: string[][] = []
  
  // To handle any additional wallets created by the + button
  for (let i = 0; i < extra + 1; i++) {
    const pathArr = path.split('/')
    const prevIndex = parseInt(pathArr[pathArr.length - 1])
    const newPathArr = pathArr.slice(0, pathArr.length - 1)
    newPathArr.push('' + (prevIndex + i))
    const newPath = newPathArr.join('/')
    const result = getAddrAndPubKey(seed, newPath)
    if (result) {
      const [address, publicKey] = result
      addrs.push([newPath, address, publicKey])
    }
  }
  return addrs
}