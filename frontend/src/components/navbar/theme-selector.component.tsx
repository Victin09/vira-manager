import React, { useEffect } from 'react'
import { HiColorSwatch } from 'react-icons/hi'
import { themeChange } from 'theme-change'
import { themes } from '@vira/common/data/themes'

export const ThemeSelector = () => {
  useEffect(() => {
    themeChange(false)
  })

  return (
    <div className='dropdown-end dropdown'>
      <label tabIndex={0} className='btn btn-ghost m-1'>
        <HiColorSwatch size={24} />
      </label>
      <div className='dropdown-content rounded-box mt-3 h-56 w-56 overflow-y-auto bg-base-200 shadow-sm'>
        <div className='grid grid-cols-1 gap-3 p-3' tabIndex={0}>
          {themes.map((theme, index) => (
            <div
              className='overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content'
              data-set-theme={theme.id}
              data-act-class='outline'
              key={index}
            >
              <div
                data-theme={theme.id}
                className='w-full cursor-pointer bg-base-100 font-sans text-base-content'
              >
                <div className='grid grid-cols-5 grid-rows-3'>
                  <div className='col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4'>
                    <div className='flex-grow text-sm font-bold'>{theme.name}</div>
                    <div className='flex flex-shrink-0 flex-wrap gap-1'>
                      <div className='w-2 rounded bg-primary' />
                      <div className='w-2 rounded bg-secondary' />
                      <div className='w-2 rounded bg-accent' />
                      <div className='w-2 rounded bg-neutral' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
