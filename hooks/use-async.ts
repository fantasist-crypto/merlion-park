import { useCallback, useState } from 'react'

export const useAsync = <
  T extends (...args: any[]) => Promise<any>,
  E = string,
>(
  fn: T,
) => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    (...args: Parameters<T>) => {
      setStatus('pending')
      setValue(null)
      setError(null)
      return fn(...args)
        .then((response: any) => {
          setValue(response)
          setStatus('success')
        })
        .catch((error: any) => {
          setError(error)
          setStatus('error')
        })
    },
    [fn],
  )

  return { execute, status, value, error }
}
