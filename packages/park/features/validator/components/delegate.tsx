import { FC, Fragment, useCallback, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import BigNumber from 'bignumber.js'

import { useAsync, useKeplr, useMerlionClient } from '@/hooks'
import { classNames, formatCoin, getErrorMessage, parseCoin } from '@/utils'
import { useBalance } from '@/hooks'

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
      const res = await merlionClient?.tx.staking.delegate({
        delegatorAddress: address,
        validatorAddress: validatorAddr,
        amount: parseCoin({ amount, denom: 'lion' }),
      })
      console.log(res)
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
    setTimeout(() => reset({ amount: '0' }), 0)
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-700">
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
                    <div className="relative flex items-center rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-600">
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
                        'mt-5 block w-full rounded-full bg-cyan-600 py-3 font-medium text-slate-50',
                        status === 'pending' && 'cursor-progress',
                      )}
                      disabled={status === 'pending'}
                    >
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
