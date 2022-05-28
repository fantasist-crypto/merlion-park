import { useState } from 'react'

export const useCopyToClipboard = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedValue(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      return false
    }
  }

  return { copiedValue, copy }
}
