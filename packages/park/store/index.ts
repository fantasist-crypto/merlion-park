import create from 'zustand'

import { KeplrSlice, createKeplrSlice } from './keplr'

export const useStore = create<KeplrSlice>()((...args) => ({
  ...createKeplrSlice(...args),
}))
