import { useStore } from '@/store'

export const useKeplr = () =>
  useStore((state) => ({
    isActive: state.isActive,
    address: state.address,
    signer: state.signer,
    connect: state.connect,
  }))
