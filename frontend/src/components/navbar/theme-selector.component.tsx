/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'

export const ThemeSelector = () => {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  const handleClick = () => {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      console.log('in local storage')
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        setTheme('dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        setTheme('light')
      }

      // if NOT set via local storage previously
    } else {
      console.log('not in local storage')
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        setTheme('light')
      } else {
        console.log('setting dark')
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        setTheme('dark')
      }
    }
  }

  return (
    <button
      id='theme-toggle'
      type='button'
      className='text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm'
      onClick={() => handleClick()}
    >
      {theme === 'light' ? (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          ></path>
        </svg>
      ) : (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          ></path>
        </svg>
      )}
    </button>
  )
}
