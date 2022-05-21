import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  Ed25519Pubkey,
  encodeSecp256k1Pubkey,
  MultisigThresholdPubkey,
  SinglePubkey,
} from '@cosmjs/amino'
import type { Any } from '@merlion/proto/google/protobuf/any'
import { LegacyAminoPubKey } from '@merlion/proto/cosmos/crypto/multisig/keys'
import { PubKey as Secp256k1PubKey } from '@merlion/proto/cosmos/crypto/secp256k1/keys'
import { PubKey as EthSecp256k1PubKey } from '@merlion/proto/ethermint/crypto/v1/ethsecp256k1/keys'

export function encodeEd25519PubKey(pubKey: Uint8Array): Ed25519Pubkey {
  if (pubKey.length !== 32) {
    throw new Error("Public key must be compressed Ed25519")
  }
  return  {
    type: 'tendermint/PubKeyEd25519',
    value: toBase64(pubKey)
  }
}

export interface PubKey {
  type: string
  value: any
}

export function encodePubKey(pubKey: PubKey): Any {
  if (isSecp256k1PubKey(pubKey)) {
    const pubKeyProto: Secp256k1PubKey = {
      key: fromBase64(pubKey.value),
    }
    return {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: Uint8Array.from(Secp256k1PubKey.toBinary(pubKeyProto)),
    }
  } else if (isEthSecp256k1PubKey(pubKey)) {
    const pubKeyProto: EthSecp256k1PubKey = {
      key: fromBase64(pubKey.value),
    }
    return {
      typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
      value: EthSecp256k1PubKey.toBinary(pubKeyProto),
    }
  } else if (isMultisigThresholdPubKey(pubKey)) {
    const pubKeyProto: LegacyAminoPubKey = {
      threshold: Number(pubKey.value.threshold),
      publicKeys: pubKey.value.pubKeys.map(encodePubKey),
    }
    return {
      typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
      value: Uint8Array.from(LegacyAminoPubKey.toBinary(pubKeyProto)),
    }
  } else {
    throw new Error(`PubKey type ${pubKey.type} not recognized`)
  }
}

function decodeSinglePubKey(pubkey: Any): SinglePubkey {
  switch (pubkey.typeUrl) {
    case "/cosmos.crypto.secp256k1.PubKey": {
      const { key } = Secp256k1PubKey.fromBinary(pubkey.value);
      return encodeSecp256k1Pubkey(key);
    }
    case "/cosmos.crypto.ed25519.PubKey": {
      const { key } = EthSecp256k1PubKey.fromBinary(pubkey.value)
      return encodeEd25519PubKey(key)
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized as single public key type`);
  }
}

export function decodePubKey(pubkey?: Any | null): SinglePubkey | MultisigThresholdPubkey | null {
  if (!pubkey || !pubkey.value) {
    return null;
  }

  switch (pubkey.typeUrl) {
    case "/cosmos.crypto.secp256k1.PubKey":
    case "/cosmos.crypto.ed25519.PubKey": {
      return decodeSinglePubKey(pubkey);
    }
    case "/cosmos.crypto.multisig.LegacyAminoPubKey": {
      const { threshold, publicKeys } = LegacyAminoPubKey.fromBinary(pubkey.value);
      return {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: threshold.toString(),
          pubkeys: publicKeys.map(decodeSinglePubKey),
        },
      }
    }
    default:
      throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
  }
}

function isSecp256k1PubKey(pubKey: PubKey): boolean {
  return pubKey.type === 'tendermint/PubKeySecp256k1'
}

function isEthSecp256k1PubKey(pubKey: PubKey): boolean {
  return pubKey.type === 'ethermint/PubKeyEthSecp256k1'
}

function isMultisigThresholdPubKey(pubKey: PubKey): boolean {
  return pubKey.type === 'tendermint/PubKeyMultisigThreshold'
}
