import { useCallback, useState } from 'react'

export type Theme = null | 'dark' | 'light'

export const useTheme = () => {
  const [theme, set] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as Theme
    }
  })

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined')
      return document.documentElement.classList.contains('dark')
  })

  const setTheme = useCallback((theme: Theme) => {
    if (!window) return
    if (theme === null) {
      localStorage.removeItem('theme')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
      }
    } else {
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
      }
    }

    set(theme)
  }, [])

  return { theme, isDark, setTheme }
}
