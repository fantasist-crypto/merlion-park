import { FC, useEffect, useState } from 'react'
import type { Any } from '@merlion/proto/google/protobuf/any'
import { decodePubKey, PubKey } from '@merlion/sdk'
import { FiKey, FiLink, FiUser } from 'react-icons/fi'
import { ExternalLinkIcon, DuplicateIcon } from '@heroicons/react/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { validatorToDelegatorAddress } from '@/utils'

export interface AddressProps {
  validatorAddr: string
  validatorPubKey?: Any
}

export const Address: FC<AddressProps> = ({
  validatorAddr,
  validatorPubKey,
}) => {
  const [pubKey, setPubKey] = useState<PubKey>(null)

  useEffect(() => {
    decodePubKey(validatorPubKey).then((pubKey) => {
      setPubKey(pubKey)
    })
  }, [validatorPubKey])

  return (
    <div className="rounded-md bg-white px-6 dark:bg-neutral-800">
      <h3 className="border-b py-4 text-lg font-medium dark:border-b-slate-600">
        Address
      </h3>
      <ul className="space-y-3 py-6">
        <li className="flex space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300 dark:bg-cyan-700">
            <FiUser className="text-xl text-slate-50 dark:text-slate-200" />
          </div>
          <div>
            <div className="text-sm font-medium">Account Address</div>
            <a
              href="@/features/validator/components/address#"
              className="flex items-center text-xs text-cyan-600"
            >
              {validatorAddr && validatorToDelegatorAddress(validatorAddr)}
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </li>
        <li className="flex space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300 dark:bg-cyan-700">
            <FiLink className="text-xl text-slate-50 dark:text-slate-200" />
          </div>
          <div>
            <div className="text-sm font-medium">Operator Address</div>
            <CopyToClipboard text={validatorAddr}>
              <div className="flex cursor-pointer items-center text-xs text-slate-600 dark:text-slate-400">
                {`${validatorAddr}`}
                &nbsp;
                <DuplicateIcon className="h-4 w-4 hover:text-cyan-600" />
              </div>
            </CopyToClipboard>
          </div>
        </li>
        <li className="flex space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300 dark:bg-cyan-700">
            <FiKey className="text-xl text-slate-50 dark:text-slate-200" />
          </div>
          <div>
            <div className="text-sm font-medium">
              Consensus Public Key
              <span className="text-xs">({pubKey?.type})</span>
            </div>
            <CopyToClipboard text={pubKey?.value ?? ''}>
              <div className="flex cursor-pointer items-center text-xs text-slate-600 dark:text-slate-400">
                {pubKey?.value as string}
                &nbsp;
                <DuplicateIcon className="h-4 w-4 hover:text-cyan-600" />
              </div>
            </CopyToClipboard>
          </div>
        </li>
      </ul>
    </div>
  )
}
