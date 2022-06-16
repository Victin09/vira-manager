import { useAuth } from '@vira/common/providers/auth.provider'
import { getDateName } from '@vira/common/utils/date.util'
import React from 'react'

const Home = () => {
  const { getUser } = useAuth()

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div>
        <span className='font-thin text-gray-700'>{getDateName('es')}</span>
      </div>
      <h2 className='text-2xl'>
        Hola de nuevo,{' '}
        <span className='font-semibold text-xl'>{getUser()!.fullname.toUpperCase()}</span>
      </h2>
      <p>
        Tu gestor de proyectos, aquí encontrarás un tablero Kanban, un espacio de colaboración en
        equipo y un chat.
      </p>
    </div>
  )
}

export default Home
