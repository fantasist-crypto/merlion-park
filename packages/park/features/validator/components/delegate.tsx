import { FC, Fragment, useCallback, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import BigNumber from 'bignumber.js'

import { useAsync, useKeplr, useMerlionClient } from '@/hooks'
import { classNames, formatCoin, getErrorMessage, parseCoin } from '@/utils'
import { useBalance } from '@/hooks'
import { EXPLORER_URL } from '@/constants'

export interface DelegateProps {
  validatorAddr?: string
}

interface Inputs {
  amount: string
}

export const Delegate: FC<DelegateProps> = ({ validatorAddr }) => {
  const { address } = useKeplr()
  const merlionClient = useMerlionClient()

  const { data } = useBalance(address, 'alion')
  const balance = useMemo(() => data && formatCoin(data), [data])

  // TODO
  const { execute, status } = useAsync(async ({ amount }: Inputs) => {
    try {
      const { transactionHash } = await merlionClient?.tx.staking.delegate({
        delegatorAddress: address,
        validatorAddress: validatorAddr,
        amount: parseCoin({ amount, denom: 'lion' }),
      })

      toast.success(
        <>
          <h5 className="font-medium">Delegate success</h5>
          <a
            href={`${EXPLORER_URL}/transactions/${transactionHash}`}
            className="flex items-center hover:text-cyan-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`TxHash: ${transactionHash.slice(0, 6)}...${transactionHash.slice(
              -6,
            )}`}
            <HiOutlineExternalLink className="ml-2" />
          </a>
        </>,
      )
    } catch (error) {
      toast.error(getErrorMessage(error).message)
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { amount: '' },
  })

  const handleDelegate = async (data: Inputs) => {
    await execute(data)
    setIsOpen(false)
  }

  const handleMax = () => {
    setValue('amount', balance.amount)
  }

  let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setTimeout(() => reset({ amount: '' }))
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const amountValidate = useCallback(
    (value: string) => {
      if (!value) return 'Amount is required'

      const amount = new BigNumber(value)

      if (amount.lte(0)) return 'Amount must be greater than 0'
      if (amount.gte(balance.amount)) return 'Insufficient balance'

      return true
    },
    [balance],
  )

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-10 rounded-full bg-cyan-600 text-slate-50"
      >
        Delegate
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-xl font-medium leading-6"
                  >
                    Delegate
                  </Dialog.Title>
                  <form
                    className="mt-2"
                    onSubmit={handleSubmit(handleDelegate)}
                  >
                    <label htmlFor="amount" className="mb-2 block font-medium">
                      Amount
                    </label>
                    <div className="relative flex items-center rounded-lg bg-slate-100 px-4 py-3 dark:bg-neutral-700">
                      <span className="pr-4 font-semibold">LION</span>
                      <input
                        id="amount"
                        type="number"
                        className="grow !appearance-none border-none bg-inherit p-0 hover:appearance-none focus:ring-0 active:appearance-none"
                        {...register('amount', { validate: amountValidate })}
                      />
                      <button
                        type="button"
                        className="absolute right-4 rounded-full bg-cyan-600 px-2 py-1 text-xs font-medium text-slate-50"
                        onClick={handleMax}
                      >
                        MAX
                      </button>
                    </div>
                    <div className="h-5 text-sm text-red-600">
                      {errors.amount?.message}
                    </div>
                    <button
                      className={classNames(
                        'mt-5 block inline-flex w-full justify-center rounded-full bg-cyan-600 py-3 font-medium text-slate-50',
                        status === 'pending' && 'cursor-not-allowed',
                      )}
                      disabled={status === 'pending'}
                    >
                      {status === 'pending' && (
                        <svg
                          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {status === 'pending' ? 'Pending' : 'Submit'}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
